import { Request } from 'express';
import httpStatus from 'http-status';

import { BaseController } from '../../../vzy-shared/api';
import { LocalSignInDTO } from '../../DTOs/signIn.DTO';
import { signInModule, signUpModule } from '../../modules';
import {LocalSignInUserSuccessHook,LocalSignUpUserSuccessHook} from '../../hooks';
import {LocalSignUpUserDTO} from '../../DTOs';


export class AuthController {
	static signUpUser = BaseController(async (request: Request) => {
		const LocalSignUpDTO = request.body as LocalSignUpUserDTO;
		const { success, message, data } = (await signUpModule({
			DTO: ['local', 'user', LocalSignUpDTO],
			onSuccess: LocalSignUpUserSuccessHook,
		}))!;
		return { status: success ? httpStatus.CREATED : httpStatus.BAD_REQUEST, message, data };
	});

	static signInUser = BaseController(async (request: Request) => {
		const LocalSignInDTO = request.body as LocalSignInDTO;
		const { success, message, data, token } = (await signInModule({
			DTO: ['local', 'user', LocalSignInDTO],
			onSuccess: LocalSignInUserSuccessHook,
		}))!;
		return {
			status: success ? httpStatus.OK : httpStatus.BAD_REQUEST,
			message,
			data,
			token,
		};
	});
}
