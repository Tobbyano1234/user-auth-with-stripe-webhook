import bcrypt from "bcrypt";

import { User, UserModel } from "../../vzy-entities";
import { LocalSignUpUserDTO } from "../DTOs";
import { config } from "../../vzy-web-api/config";


export const LocalSignUpUserPipe = async (DTO: LocalSignUpUserDTO) => {
  const { email, password } = DTO;
  const userExists = (await UserModel.findOne({ email })) as User;
  if (userExists) return { success: false, message: `email already registered with an existing account`, data: null, hookData: null };
  const hashedPassword = await bcrypt.hash(password, +config.defaults.saltWorker);
  const data = await UserModel.create({ email, password: hashedPassword });
  return { success: true, message: `account created successfully`, data, hookData: data };
};
