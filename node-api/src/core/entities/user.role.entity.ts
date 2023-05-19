import { Column, Entity, Unique } from 'typeorm';
import { BaseEntity } from '../models';

@Entity('user_role')
@Unique('user_role_deleted', ['userId', 'roleId', 'deletedAt'])
export class UserRoleEntity extends BaseEntity {
  @Column({ type: 'int', nullable: false, name: 'user_id', comment: 'User Id' })
  userId: number;

  @Column({ type: 'int', nullable: false, name: 'role_id', comment: 'Role Id' })
  roleId: number;
}
