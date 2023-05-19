import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('resource')
export class ResourceEntity {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
    comment: 'Resource Id',
  })
  id: number;

  @Index()
  @Column({
    type: 'varchar',
    nullable: false,
    length: 150,
    name: 'resource_no',
    comment: 'Logic Unique Key',
  })
  resourceNo: string;

  @Column({
    type: 'varchar',
    length: 100,
    name: 'module_name',
    comment: 'Module name',
  })
  moduleName: string;

  @Column({
    type: 'varchar',
    length: 100,
    name: 'controller_name',
    comment: 'Controller name',
  })
  controllerName?: string;

  @Column({
    type: 'varchar',
    length: 100,
    name: 'controller_route',
    comment: 'Controller base url',
  })
  controllerRoute?: string;

  @Column({
    type: 'varchar',
    length: 100,
    name: 'method_name',
    comment: 'Method name',
  })
  methodName: string;

  @Column({
    type: 'varchar',
    length: 10,
    name: 'method',
    comment: 'Controller Function Request Method',
  })
  method: string;

  @Column({
    type: 'varchar',
    length: 200,
    name: 'url',
    comment: 'Url',
  })
  url: string;

  @Column({
    type: 'varchar',
    nullable: true,
    length: 200,
    name: 'method_desc',
    comment: 'Controller Function Description',
  })
  methodDesc?: string;

  @CreateDateColumn({
    type: 'timestamp',
    nullable: false,
    name: 'created_at',
    comment: 'Created Time',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    nullable: false,
    name: 'updated_at',
    comment: 'Update time',
  })
  updatedAt: Date;
}
