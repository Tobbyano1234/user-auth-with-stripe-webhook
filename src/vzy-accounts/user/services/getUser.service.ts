import { GetUserDTO } from "../DTOs/GetUserDTO";
import { User, UserModel } from "../../../vzy-entities";

export const getUserService = async (
  { email, userID }: GetUserDTO,
  {
    onUserNotFound = ({ email, userID }: GetUserDTO): void => {
      throw new Error(`user with ${email || userID} not found`);
    },
    withPassword = false,
  }
) => {
  let user;
  if (withPassword) {
    if (userID) {
      user = (await UserModel.findById(userID)) as User;
    }
    if (email) {
      user = (await UserModel.findOne({ email })) as User;
    }
  } else {
    if (userID) {
      user = (await UserModel.findById(userID).select(
        "-password"
      )) as User;
    }
    if (email) {
      user = (await UserModel.findOne({ email }).select(
        "-password"
      )) as User;
    }
  }

  if (!user) onUserNotFound({ email, userID });
  return user;
};
