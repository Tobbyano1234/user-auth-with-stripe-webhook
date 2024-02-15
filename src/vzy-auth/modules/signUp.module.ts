import { match, P } from "ts-pattern";

import { SignUp } from "../types";
import { triggerSuccessFailureHooks } from "../../vzy-shared/triggerHooks";


import {LocalSignUpUserPipe} from "../pipes/local.signUp.user.pipe";

export const signUpModule = ({ DTO, onSuccess, onFailure }: SignUp) =>
  match(DTO)
    .with(["local", "user", P._], async ([, , LocalSignUpUserDTO]) => {
      const signUpPipe = await LocalSignUpUserPipe(LocalSignUpUserDTO);
      triggerSuccessFailureHooks(signUpPipe, onSuccess);
      return signUpPipe;
    })
    .exhaustive();
