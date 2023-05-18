import SharedEntity from 'src/shared/entities/shared.entity';
import { Column, Entity, Unique } from 'typeorm';

@Entity('role_access')
@Unique('role_access_key', ['roleId', 'accessId'])
export class RoleAccessEntity extends SharedEntity {
  [x: string]: any;
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
    type: 'varchar',
    nullable: true,
    name: 'resource_no',
    comment: 'Resource no',
  })
  resourceNo?: string;
}
