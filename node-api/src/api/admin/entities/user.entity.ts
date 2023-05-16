import { Exclude } from 'class-transformer';
import { PlatformEnum } from 'src/enums/platform.enum';
import SharedEntity from 'src/shared/entities/shared.entity';
import { Column, Entity, Index } from 'typeorm';

@Entity('user')
export class UserEntity extends SharedEntity {
  @Index()
  @Column({
    type: 'varchar',
    length: 50,
    name: 'username',
    comment: 'Username',
  })
  username: string;

  @Exclude()
  @Column({
    type: 'varchar',
    length: 256,
    select: false,
    name: 'password',
    comment: 'password',
  })
  password: string;

  @Column({
    type: 'varchar',
    length: 15,
    nullable: true,
    name: 'mobile',
    comment: 'phone number',
  })
  mobile: string;

  @Column({
    type: 'varchar',
    nullable: true,
    length: 128,
    name: 'email',
    comment: 'email address',
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
    name: 'nickname',
    comment: 'Nickname',
  })
  nickname: string;

  @Column({
    type: 'varchar',
    nullable: true,
    name: 'wechat',
    comment: 'wechat name',
  })
  wechat: string;

  @Column({
    type: 'varchar',
    nullable: true,
    name: 'wechat_uid',
    comment: 'Wechat UID',
  })
  wechatUid: string;

  @Column({
    type: 'varchar',
    length: 256,
    nullable: true,
    name: 'avatar',
    comment: 'user avatar image',
  })
  avatar: string;

  @Column({
    type: 'tinyint',
    nullable: true,
    default: 1,
    name: 'status',
    comment: 'status,0-unavailable,1-available',
  })
  status: number;

  @Column({
    type: 'tinyint',
    nullable: true,
    default: 0,
    name: 'platform',
    comment: 'platform,0-guest,1-administrator,2-merchant,3-farmer',
  })
  platform: PlatformEnum;

  @Column({
    type: 'tinyint',
    default: 0,
    name: 'is_super',
    comment: 'Is super adminstrator,0-not,1-yes',
  })
  isSuper: number;
}
