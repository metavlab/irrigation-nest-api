import SharedEntity from 'src/shared/entities/shared.entity';
import { Column, Entity } from 'typeorm';

@Entity('role_access')
export class RoleAccessEntity extends SharedEntity {
  @Column({
    type: 'bigint',
    nullable: false,
    name: 'role_id',
    comment: 'Role ID',
  })
  roleId: number;

  @Column({
    type: 'bigint',
    nullable: false,
    name: 'access_id',
    comment: 'Access ID',
  })
  accessId: number;

  @Column({
    type: 'tinyint',
    nullable: true,
    name: 'type',
    comment: 'Resource type,2-menu,3-api',
  })
  type: number;
}
