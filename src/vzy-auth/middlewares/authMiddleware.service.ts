import { accessControl } from './accessControl.service';
import { authTokenService } from './authToken.service';
import { headerBearerToken } from './policies.service';
import { AccountTokenType, AccountType } from '../../typings/Account.types';


export class AuthMiddleware {
	static IsUser = (token?: AccountTokenType) =>
		accessControl({ AccountTypes: [AccountType.USER], token });
	static IsUserMiddleware = AuthMiddleware.IsUser();

	static IsAccountHolder = (token?: AccountTokenType) =>
		accessControl({
			AccountTypes: [AccountType.USER],
			token,
		});
	static IsAccountHolderMiddleware = AuthMiddleware.IsAccountHolder();

	static baseAuthToken = authTokenService({
		authPolicy: headerBearerToken,
		allowExternalAccess: false,
	});
}
