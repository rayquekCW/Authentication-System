import { createContext, ReactNode, useState } from 'react';
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import AWS from 'aws-sdk';
import Pool from './UserPool';
import { CognitoJwtVerifier } from "aws-jwt-verify";

// Define the type for the context value
type AccountContextValue = {
  authenticate: (Username: string, Password: string) => Promise<unknown>;
  getSession: () => Promise<any>;
  logout: () => void;
  deleteAccount: () => void;
};

// Create a new instance of the Cognito JWT Verifier
const verifier = CognitoJwtVerifier.create({
  userPoolId: Pool.getUserPoolId(),
  tokenUse: "access",
  clientId: Pool.getClientId(),
});

// Create a new instance of the Cognito Identity Service Provider
const cognito = new AWS.CognitoIdentityServiceProvider({
  region: "ap-southeast-1",
});

// Initialize the context
const AccountContext = createContext<AccountContextValue | undefined>(
  undefined
);

const Account: React.FC<{ children: ReactNode }> = (props) => {
  const [user, setUser] = useState<CognitoUser>(new CognitoUser({ Username: "", Pool }));
  /**
   * The `getSession` function retrieves the user session, verifies the access token, retrieves user
   * attributes, checks if MFA is enabled, and returns the necessary data for authentication.
   */
  const getSession = async () =>
    await new Promise<void>((resolve, reject) => {
      const user = Pool.getCurrentUser();

      if (user) {
        // Get the session from the user
        user.getSession(async (err: any, session: any) => {
          if (err) {
            reject();
          } else {
            /* Verifying the validity of the access token (JWT) obtained from the user's session. */
            const accessToken = session.accessToken.jwtToken;
            try {
              const payload = verifier.verify(
                accessToken // the JWT as string
              );
              console.log("Token is valid. Payload:", payload); //TODO - Remove this before moving to Production
            } catch {
              console.log("Token not valid!");
            }

            /*  It uses the `getUserAttributes` method of the `CognitoUser` object to get the attributes. */
            const attributes = await new Promise<Record<string, string>>(
              (resolve, reject) => {
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
              }
            );

            /* Checking whether Multi-Factor Authentication (MFA) is enabled for the user. */
            const mfaEnabled = await new Promise((resolve) => {
              cognito.getUser(
                {
                  AccessToken: accessToken,
                },
                (err, data) => {
                  if (err) resolve(false);
                  else
                    resolve(
                      data.UserMFASettingList &&
                        data.UserMFASettingList.includes("SOFTWARE_TOKEN_MFA")
                    );
                }
              );
            });

            /* Retrieving the JSON Web Token (JWT) from the session's ID token. */
            const token = session.getIdToken().getJwtToken();

            resolve({
              user,
              accessToken,
              mfaEnabled,
              headers: {
                "x-api-key": attributes["custom:apikey"],
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

  /**
   * The `authenticate` function is used to authenticate a user with a username and password, using AWS
   * Cognito, and handles scenarios such as new password requirement and multi-factor authentication.
   * @param {string} Username - The `Username` parameter is a string that represents the username of
   * the user trying to authenticate. It is used to create a new `CognitoUser` object.
   * @param {string} Password - The `Password` parameter is a string that represents the user's
   * password. It is used to authenticate the user's credentials when calling the `authenticateUser`
   * method of the `CognitoUser` object.
   */
  
  const authenticate = async (Username: string, Password: string) =>
    await new Promise((resolve, reject) => {
      const userState = new CognitoUser({ Username, Pool })
      setUser(userState);
      const authDetailState = new AuthenticationDetails({ Username, Password });

      userState.authenticateUser(authDetailState, {
        onSuccess: (data) => {
          console.log("onSuccess:", data);
          resolve(data);
        },

        onFailure: (err) => {
          console.error("onFailure:", err);
          reject(err);
        },

        // New Password Required Hook
        // TODO - To be implemented in the future to handle this edge case
        newPasswordRequired: (data) => {
          console.log("newPasswordRequired:", data);
          resolve(data);
        },

        // MFA Input Required Hook
        // TODO - To update the prompt to a modal in the future
        totpRequired: () => {
          const token = prompt("Please enter your 6-digit token");
          if (token) {
            user.sendMFACode(
              token,
              {
                onSuccess: (data) => {
                  resolve(data);
                },
                onFailure: () => alert("Incorrect code!"),
              },
              "SOFTWARE_TOKEN_MFA"
            );
          }
        },
      });
    });

  /**
   * The `logout` function signs out the current user if there is one.
   */
  const logout = () => {
    const user = Pool.getCurrentUser();
    if (user) {
      user.signOut();
    }
  };

  const deleteAccount = async () => {
    await new Promise((resolve, reject) => {
        const token = prompt('Please enter your 6-digit token')
        if (token) {
          user.sendMFACode(
            token,
            {
              onSuccess: () => {
                  user.deleteUser((err, data) => {
                    if (err) {
                      console.error('Error deleting user:', err.message || JSON.stringify(err));
                    } else {
                      console.log('User deleted successfully:', data);
                    }
                  });
                resolve(true)  
              },
              onFailure: () => alert('Incorrect code!'),
            },
            'SOFTWARE_TOKEN_MFA'
          )
        }
      },
    );
  }
  return (
    <AccountContext.Provider value={{
      authenticate,
      getSession,
      logout,
      deleteAccount,
    }}>
      {props.children}
    </AccountContext.Provider>
  );
};

export { Account, AccountContext };
