import httpStatus from "http-status";
import { Request, Response, NextFunction } from "express";

import { verifyToken } from "../plugins/token.plugin";
import { sendResponse } from "../../vzy-shared/response";
import { ITokenGeneratorFunc } from "./policies.service";

interface authTokenOptions {
  authPolicy: ITokenGeneratorFunc;
  allowExternalAccess: boolean;
}

export const authTokenService = (options: authTokenOptions) => {
  const { authPolicy, allowExternalAccess} = options;
  return async (request: Request, response: Response, next: NextFunction) => {
    const token: string = authPolicy(request) as unknown as string;
    if (allowExternalAccess && !token) {
      return next();
    } else if (token) {
      try {
        const verifiedToken = await verifyToken(token);
        (request as any).token = verifiedToken;

        return next();
      } catch (error: any) {
        if (allowExternalAccess) {
          return next();
        }
        console.error(error);
        return response.status(httpStatus.UNAUTHORIZED).json(
          sendResponse(
            httpStatus.UNAUTHORIZED,
            error.message || `Invalid Token`,
            null,
            {
              error: error.message || `Invalid Token`,
            }
          )
        );
      }
    }
    return response.status(httpStatus.UNAUTHORIZED).json(
      sendResponse(httpStatus.UNAUTHORIZED, "No Token found", null, {
        error: "No Authorization found",
      })
    );
  };
};
