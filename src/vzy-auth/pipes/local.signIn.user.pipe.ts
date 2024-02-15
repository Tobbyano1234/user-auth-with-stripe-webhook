import bcrypt from 'bcrypt';

import { issueToken } from '../plugins';
import { LocalSignInDTO } from '../DTOs/signIn.DTO';
import { AccountMetaDataGeneral, AccountStatus, AccountType } from '../../typings/Account.types';
import { ModelNames, GeneralModel } from '../../vzy-entities';
import { getUserService } from '../../vzy-accounts/user/services';

export const LocalSignInUserPipe = async (DTO: LocalSignInDTO) => {
	const { email, password } = DTO;
	const user = await getUserService({ email }, { onUserNotFound: () => { }, withPassword: true });
	if (!user) return { success: false, message: `email or password incorrect`, data: null, hookData: null };

	const { _id, password: hashedPassword } = user;
	const userMetaData = (await GeneralModel.findOne({ collectionID: _id, collectionName: ModelNames.USER, 'associatedData.type': 'metaData' })) as AccountMetaDataGeneral;
	if (!userMetaData)
		return { success: false, message: `cannot authorize user`, data: null, hookData: null };

	if (userMetaData.associatedData.metaData.status == AccountStatus.SUSPENDED)
		return { success: false, message: `user currently suspended`, data: null, hookData: null };
	const passwordVerified = await bcrypt.compare(password, hashedPassword);
	if (!passwordVerified)
		return { success: false, message: `email or password incorrect`, data: null, hookData: null };

	const token = await issueToken({ accountType: AccountType.USER, _id, issuedAt: Date.now(), email });
	return { success: true, message: 'user signed in successfully', data: user, hookData: user, token };
};
