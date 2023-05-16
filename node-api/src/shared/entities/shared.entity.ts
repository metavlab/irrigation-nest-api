import { Transform, TransformFnParams, Type } from 'class-transformer';
import {
  BaseEntity,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

abstract class SharedEntity extends BaseEntity {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
    comment: 'Primary key ID',
  })
  @Type(() => Number)
  @Transform(({ value }) => Number(value))
  id: number;

  @Transform((row: TransformFnParams) => +new Date(row.value))
  @CreateDateColumn({
    type: 'timestamp',
    nullable: false,
    name: 'created_at',
    comment: 'record create time',
  })
  createdAt: Date;

  @Transform((row: TransformFnParams) => +new Date(row.value))
  @UpdateDateColumn({
    type: 'timestamp',
    nullable: false,
    name: 'updated_at',
    comment: 'record last update time',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    type: 'timestamp',
    nullable: true,
    name: 'deleted_at',
    comment: 'Logic delete sign',
  })
  deletedAt?: Date;
}

export default SharedEntity;
