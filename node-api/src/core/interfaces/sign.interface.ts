import { IUserCommon } from './user.interface';

export type ISignBase = {
  readonly username: string;
  readonly password: string;
};

export type ISignup = {
  readonly username: string;
  readonly password: string;
  readonly repeat: string;
  readonly status?: number;
} & IUserCommon;

export type IModifyPassword = {
  readonly password: string;
  readonly newPassword: string;
  readonly confirmPassword: string;
};
