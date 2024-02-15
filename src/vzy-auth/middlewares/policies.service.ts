import { Request } from 'express';

export interface ITokenGeneratorFunc {
  (req: Request, Parameter?: string) : string | undefined;
}

export const headerBearerToken: ITokenGeneratorFunc = (request) => {
  const getTokenFromAuthHeader = (authorizationHeader: string) => {
    const tokenRegex = /Bearer (.+)/;
    const tokenMatch = tokenRegex.exec(authorizationHeader);
    return tokenMatch ? tokenMatch[1] : undefined;
  };
  return getTokenFromAuthHeader(request.header('Authorization')!);
};
