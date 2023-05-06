import { env } from '../infrastructure/configuration/environment';

var jwt = require('jsonwebtoken');

export interface AuthToken {
  user_id: string;
  user_type: string;
  user_status: string;
}

export const authToken = (
  user_id: string,
  user_type: string,
  user_status: string
): Promise<string> => {
  return jwt.sign(
    {
      user_id: user_id,
      user_type: user_type,
      user_status: user_status
    },
    env.access_token,
    {
      expiresIn: '6h'
    }
  );
};

export const refreshToken = (auth_id: string): string => {
  return jwt.sign(
    {
      auth_id: auth_id
    },
    env.refresh_token,
    {
      expiresIn: '365d'
    }
  );
};

export const validateRefreshToken = (token: string): boolean => {
  return jwt.verify(token, env.refresh_token);
};

export const validateAccessToken = (token: string): boolean => {
  return jwt.verify(token, env.access_token);
};

export const decodeUserIdToken = (token: string, key: string): string => {
  return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString())[
    key
  ];
};

export const decodeToken = (token: string): AuthToken => {
  return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
};
