import { ObjectId } from "mongodb";
import { ModelNames } from "../vzy-entities";

export enum AccountType {
  USER = 'user'
}

export enum AccountSignType {
  TWITTER = 'twitter',
  GOOGLE = 'google',
  FACEBOOK = 'facebook',
  DIRECT = 'direct',
}

export interface AccountTokenType {
  _id: string;
  issuedAt: number;
  email?: string;
  accountType: AccountType;
}

export enum AccountStatus {
  BANNED = 'banned',
  SUSPENDED = 'suspended',
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  DEACTIVATED = 'deactivated',
}

export type AccountMetaDataGeneral = {
  _id: ObjectId;
  collectionName: ModelNames;
  collectionID: string;
  associatedData: {
    metaData: {
      signType: AccountSignType;
      status: AccountStatus;
      firstLoginDate: Date;
      lastLoginDate: Date;
      // other meta datas here
      // passwordChangedAt: Date[],
      // verifiedAt: Date,
    }
  };
};
