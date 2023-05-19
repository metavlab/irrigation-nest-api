import { UserListVo, UserVo } from '../models';
import { IModifyPassword, ISignup } from './sign.interface';
import { IUserRequest } from './user.interface';

export interface IUserService {
  createUser(userDto: ISignup): Promise<UserVo>;
  userById(id: number): Promise<UserVo | null>;
  updatePasswordById(
    id: number,
    updateDto: IModifyPassword,
  ): Promise<number | never>;

  /**
   *
   * @param user [username,mobile,email,nickname,...]
   * @returns Array<UserVo> pager
   */
  getCommonUser(user: IUserRequest): Promise<UserListVo | never>;
}
