import { match, P } from 'ts-pattern';

import { SignIn } from '../types';
import { triggerSuccessFailureHooks } from '../../vzy-shared/triggerHooks';
import {LocalSignInUserPipe} from '../pipes';


export const signInModule = ({DTO, onSuccess, onFailure}: SignIn) => 
  match(DTO)
    .with(['local', 'user', P._], async ([,,LocalSignInDTO]) => {
      const signInPipe = await LocalSignInUserPipe(LocalSignInDTO);
      triggerSuccessFailureHooks(signInPipe, onSuccess, onFailure);
      return signInPipe;
    })
    .exhaustive();
