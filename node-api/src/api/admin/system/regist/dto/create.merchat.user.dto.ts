import { ApiProperty } from '@nestjs/swagger';
import { IsMobilePhone, IsNotEmpty, Length, Matches } from 'class-validator';
import { UserDto } from 'src/core/auth/dto/user.dto';
import { ISignup } from 'src/core/interfaces';
import { IsEqual, PASSWORD_CHECK_REGEX } from 'src/validators';

export class SignupMajorUserDto extends UserDto implements ISignup {
  @ApiProperty({
    required: true,
    description:
      'Username only contains [a-zA-Z0-9] and @ or _ ,more than 3 characters',
  })
  @IsNotEmpty({ message: 'Username requirement an string.' })
  @Length(3, 20, {
    message: 'Username require more than 3 and less than 20 character.',
  })
  username: string;
  @ApiProperty({
    required: true,
    description: 'password more 4 and less than 50 characters',
  })
  @IsNotEmpty({ message: 'password required' })
  @Length(4, 100, {
    message: 'Password is too short!',
  })
  @Matches(RegExp(PASSWORD_CHECK_REGEX), { message: 'Password is too week' })
  password: string;
  @ApiProperty({
    required: true,
    description: 'confirm password',
  })
  @IsNotEmpty({ message: 'confirm password required' })
  @IsEqual('password', { message: 'Two passwords entered are incomsistent' })
  repeat: string;
  avatar?: string;
  isSuper?: number;

  @ApiProperty({ required: true, description: 'phone number' })
  @IsMobilePhone('en-US', {}, { message: 'Phone number incorrect.' })
  @IsNotEmpty()
  readonly mobile: string;
}
