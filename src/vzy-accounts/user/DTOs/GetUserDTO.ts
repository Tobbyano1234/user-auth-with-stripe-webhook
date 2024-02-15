import { ObjectId } from "mongodb";

export type GetUserDTO = {
  email?: string, 
  userID?: ObjectId,
};

export type GetUserOptions = {
  withPassword: boolean,
  onUserNotFound?: ({ email, userID }: GetUserDTO) => void | never,
};
