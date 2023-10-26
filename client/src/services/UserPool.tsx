import { CognitoUserPool } from 'amazon-cognito-identity-js';


const poolData = {
  UserPoolId: import.meta.env.VITE_AWS_USER_POOL_ID,
  ClientId: import.meta.env.VITE_AWS_CLIENT_ID,
};

export default new CognitoUserPool(poolData);