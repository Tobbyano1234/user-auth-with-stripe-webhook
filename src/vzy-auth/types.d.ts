import { LocalSignInDTO } from './DTOs/signIn.DTO';
import { LocalSignUpUserDTO } from './DTOs/signUp.DTO';


export type SignUp = {
  DTO:
  | ["local", "user", LocalSignUpUserDTO];
  onSuccess: (...args: any[]) => any;
  onFailure?: (...args: any[]) => any;
};

export type SignIn = {
  DTO:
  | ['local', 'user', LocalSignInDTO];
  onSuccess: (...args: any[]) => any;
  onFailure?: (...args: any[]) => any;
};
