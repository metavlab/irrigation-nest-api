import { IsNotEmpty, Length, Matches } from 'class-validator';
import { UserDto } from './user.dto';
import { IsEqual, PASSWORD_CHECK_REGEX } from 'src/validators';
import { ApiProperty } from '@nestjs/swagger';

export class SignupUserDto extends UserDto {
  @ApiProperty({
    required: true,
    description:
      'Username only contains [a-zA-Z0-9] and @ or _ ,more than 3 characters',
  })
  @IsNotEmpty({ message: 'Username requirement an string.' })
  @Length(3, 20, {
    message: 'Username require more than 3 and less than 20 character.',
  })
  readonly username: string;

  @ApiProperty({
    required: true,
    description: 'password more 4 and less than 50 characters',
  })
  @IsNotEmpty({ message: 'password required' })
  @Length(4, 50, {
    message: 'Password is too week!',
  })
  @Matches(RegExp(PASSWORD_CHECK_REGEX))
  readonly password: string;

  @ApiProperty({
    required: true,
    description: 'confirm password',
  })
  @IsNotEmpty({ message: 'confirm password required' })
  @IsEqual('password', { message: 'Two passwords entered are incomsistent' })
  readonly repeat?: string;
}
