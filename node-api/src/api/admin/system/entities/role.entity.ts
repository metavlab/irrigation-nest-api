import { StatusEnum } from 'src/enums';
import SharedEntity from 'src/shared/entities/shared.entity';
import { Column, Entity, Index, Unique } from 'typeorm';

@Entity('role')
@Unique('name_deleted', ['name', 'deletedAt'])
export class RoleEntity extends SharedEntity {
  @Index({ unique: true })
  @Column({
    type: 'varchar',
    nullable: false,
    length: 50,
    name: 'name',
    comment: 'Role name',
  })
  name: string;

  @Column({
    type: 'varchar',
    nullable: true,
    length: 100,
    name: 'description',
    comment: 'Role Description',
  })
  description: string;

  @Column({
    type: 'tinyint',
    nullable: true,
    default: 1,
    name: 'status',
    comment: 'Role status:0-unavailable,1-available',
  })
  status: StatusEnum;

  @Column({
    type: 'tinyint',
    nullable: true,
    default: 0,
    name: 'is_default',
    comment: 'Is default role for registered,0-not,1-yes',
  })
  isDefault: number;
}
