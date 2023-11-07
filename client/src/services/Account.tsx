import { createContext, ReactNode } from 'react';
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import AWS from 'aws-sdk';
import Pool from './UserPool';
import { CognitoJwtVerifier } from "aws-jwt-verify";

// Define the type for the context value
type AccountContextValue = {
  authenticate: (Username: string, Password: string) => Promise<unknown>;
  getSession: () => Promise<any>;
  logout: () => void;
};

const verifier = CognitoJwtVerifier.create({
    userPoolId: Pool.getUserPoolId(),
    tokenUse: "access",
    clientId: Pool.getClientId(),
  });

const cognito = new AWS.CognitoIdentityServiceProvider({ region: 'ap-southeast-1' })
const AccountContext = createContext<AccountContextValue | undefined>(undefined);

const Account: React.FC<{ children: ReactNode }> = (props) => {

  // 
  const getSession = async () =>
    await new Promise<void>((resolve, reject) => {
      const user = Pool.getCurrentUser();
      if (user) {
        user.getSession(async (err: any, session: any) => {
          if (err) {
            reject();
          } else {
            const accessToken = session.accessToken.jwtToken;              
            /*  It uses the `getUserAttributes` method of the `CognitoUser` object to get the attributes. */
            const attributes = await new Promise<Record<string, string>>((resolve, reject) => {
              user.getUserAttributes((err, attributes) => {
                if (err) {
                  reject(err);
                } else {
                  const results: Record<string, string> = {};

                  for (let attribute of attributes || []) {
                    const { Name, Value } = attribute;
                    results[Name] = Value;
                  }

                  resolve(results);
                }
              });
            });

            /* Checking whether Multi-Factor Authentication (MFA) is enabled for the user. */
            const mfaEnabled = await new Promise((resolve) => {
              cognito.getUser(
                {
                  AccessToken: accessToken,
                },
                (err, data) => {
                  if (err) resolve(false)
                  else
                    resolve(
                      data.UserMFASettingList &&
                      data.UserMFASettingList.includes('SOFTWARE_TOKEN_MFA')
                    )
                }
              )
            })

            const token = session.getIdToken().getJwtToken()

            resolve({
              user,
              accessToken,
              mfaEnabled,
              headers: {
                'x-api-key': attributes['custom:apikey'],
                Authorization: token,
              },
              ...session,
              ...attributes,
            });
          }
        });
      } else {
        reject();
      }
    });

  const authenticate = async (Username: string, Password: string) =>
    await new Promise((resolve, reject) => {
      const user = new CognitoUser({ Username, Pool });
      const authDetails = new AuthenticationDetails({ Username, Password });

      user.authenticateUser(authDetails, {
        onSuccess: (data) => {
          console.log('onSuccess:', data);
          verifier.verify(data.getAccessToken().getJwtToken()).then((payload) => {
            console.log("Token is valid");
          }).catch((err) => {
            console.log("Token is not valid - " + err)
          });
          sessionStorage.setItem("access_token", data.getAccessToken().getJwtToken())
          sessionStorage.setItem("refresh_token", data.getRefreshToken().getToken())
          resolve(data);
        },

        onFailure: (err) => {
          console.error('onFailure:', err);
          reject(err);
        },

        newPasswordRequired: (data) => {
          console.log('newPasswordRequired:', data);
          resolve(data);
        },

        totpRequired: () => {
          const token = prompt('Please enter your 6-digit token')
          if (token) {
            user.sendMFACode(
              token,
              {
                onSuccess: () => {resolve(true)},
                onFailure: () => alert('Incorrect code!'),
              },
              'SOFTWARE_TOKEN_MFA'
            )
          }
        },
      });
    });

  const logout = () => {
    const user = Pool.getCurrentUser();
    if (user) {
      user.signOut();
    }
  };

  return (
    <AccountContext.Provider value={{
      authenticate,
      getSession,
      logout,
    }}>
      {props.children}
    </AccountContext.Provider>
  );
};

export { Account, AccountContext };