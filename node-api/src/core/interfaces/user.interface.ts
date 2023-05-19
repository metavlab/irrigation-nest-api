import { PlatformEnum } from 'src/enums';
import { IBaseEntity } from './base.entity.interface';
import { IQueryOptions } from './query.options.interface';

export type IUserCommon = {
  username?: string;
  mobile?: string;
  email?: string;
  nickname?: string;
  avatar?: string;
  isSuper?: number;
  platform?: PlatformEnum;
};

export type ICurrentUser = {
  id: number;
  status?: number;
} & IUserCommon;

export type IUser = {
  wechat?: string;
  wechatUid?: string;
} & ICurrentUser &
  IBaseEntity;

export type IUserRequest = {
  status?: number;
  wechat?: string;
  wechatUid?: string;
} & IUserCommon &
  IQueryOptions;
