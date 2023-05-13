import { Transform, TransformFnParams } from 'class-transformer';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

abstract class SharedEntity extends BaseEntity {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
    comment: 'Primary key ID',
  })
  id: number;

  @Column({
    type: 'tinyint',
    nullable: false,
    default: 0,
    name: 'is_deleted',
    comment: 'deleted,0-available,1-invalid or unavailable',
  })
  isDeleted: number;

  @Transform((row: TransformFnParams) => +new Date(row.value))
  @CreateDateColumn({
    type: 'timestamp',
    nullable: false,
    name: 'created_time',
    comment: 'record create time',
  })
  createdTime: Date;

  @Transform((row: TransformFnParams) => +new Date(row.value))
  @UpdateDateColumn({
    type: 'timestamp',
    nullable: false,
    name: 'updated_time',
    comment: 'record last update time',
  })
  updatedTime: Date;
}

export default SharedEntity;
