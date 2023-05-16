import SharedEntity from 'src/shared/entities/shared.entity';
import { Column, Entity, Unique } from 'typeorm';

@Entity('access')
@Unique('module_name_delete_at', ['moduleName', 'deletedAt'])
@Unique('action_name_delete_at', ['actionName', 'deletedAt'])
export class AccessEntity extends SharedEntity {
  @Column({
    type: 'varchar',
    nullable: true,
    length: 50,
    name: 'module_name',
    comment: 'Module name of system',
  })
  moduleName: string;

  @Column({
    type: 'tinyint',
    nullable: true,
    name: 'type',
    comment: 'Resource type,2-menu,3-api',
  })
  type: number;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: true,
    name: 'action_name',
    comment: 'access action name',
  })
  actionName: string;

  @Column({
    type: 'varchar',
    nullable: true,
    length: 100,
    name: 'api_name',
    comment: 'Api name',
  })
  apiName: string;

  @Column({
    type: 'varchar',
    nullable: true,
    length: 200,
    name: 'icon',
    comment: 'icon url',
  })
  icon: string;

  @Column({
    type: 'varchar',
    nullable: true,
    length: 100,
    name: 'url',
    comment: 'route URL ',
  })
  url: string;

  @Column({
    type: 'varchar',
    nullable: true,
    length: 10,
    name: 'method',
    comment: 'Request method',
  })
  method: string;

  @Column({
    type: 'int',
    nullable: false,
    default: 0,
    name: 'parent_id',
    comment: 'Parent Id',
  })
  parentId: number;

  @Column({
    type: 'int',
    nullable: false,
    default: 1,
    name: 'sortno',
    comment: 'sort number',
  })
  sortno: number;

  @Column({
    type: 'tinyint',
    nullable: false,
    default: 1,
    name: 'status',
    comment: 'Access status,0-unavailable,1-available',
  })
  status: number;

  @Column({
    type: 'varchar',
    nullable: true,
    length: 100,
    name: 'description',
    comment: 'description',
  })
  description: string;
}
