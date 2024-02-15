import jwt, { SignOptions } from 'jsonwebtoken';

import { AccountTokenType } from '../../typings/Account.types';
import { config } from '../../vzy-web-api/config';


const signingOptions: SignOptions = {
  expiresIn: config.credentials.jwt.expirationInterval,
};

export const issueToken = (payload: AccountTokenType): Promise<string> => {
  return new Promise((resolve, reject) =>
    jwt.sign(
      payload,
      config.credentials.jwt.secret,
      signingOptions,
      (error, decoded) => {
        if (error) return reject(error);
        // match decoded parameter argument conflict
        return resolve(decoded as string | Promise<string>);
      },
    ),
  );
};

export const verifyToken = (token: string): Promise<any> => {
  return new Promise((resolve, reject) =>
    jwt.verify(token, config.credentials.jwt.secret, (error: any, decoded: any) => {
      if (error) return reject(error);
      return resolve(decoded);
    }),
  );
};


