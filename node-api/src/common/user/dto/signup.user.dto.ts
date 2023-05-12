import { IsNotEmpty, Length } from 'class-validator';
import { UserDto } from './user.dto';

export class SignupUserDto extends UserDto {
  @IsNotEmpty({ message: 'Username requirement an string.' })
  @Length(3, 20, {
    message: 'Username require more than 3 and less than 20 character.',
  })
  readonly username: string;

  @IsNotEmpty({ message: 'password required' })
  @Length(3, 50, {
    message: 'Password requirement more than 3 and less than 50.',
  })
  readonly password: string;

  readonly repeat?: string;
}
