import { QueryListVo } from 'src/shared/vo/query.list.vo';
import { QueryVo } from 'src/shared/vo/query.vo';

export class UserVo extends QueryVo {
  username?: string;

  nickname?: string;

  mobile?: string;

  email?: string;

  status?: number;

  platform?: number;

  isSuper?: number;

  wechat?: string;

  wechatUid?: string;
}

export class UserListVo extends QueryListVo {
  data: UserVo[];
}
