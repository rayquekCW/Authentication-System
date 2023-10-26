import { createContext, ReactNode } from 'react';
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import Pool from './UserPool';
// Define the type for the context value
type AccountContextValue = {
  authenticate: (Username: string, Password: string) => Promise<void>;
  getSession: () => Promise<void>;
  logout: () => void;
};

const AccountContext = createContext<AccountContextValue | undefined>(undefined);

const Account: React.FC<{ children: ReactNode }> = (props) => {
  const getSession = async () =>
    await new Promise<void>((resolve, reject) => {
      const user = Pool.getCurrentUser();
      if (user) {
        user.getSession(async (err: any, session: any) => {
          if (err) {
            reject();
          } else {
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

            resolve({
              user,
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