import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length, Matches } from 'class-validator';
import { IModifyPassword } from 'src/core/interfaces';
import { IsEqual, PASSWORD_CHECK_REGEX } from 'src/validators';

export class ModifyPasswordDto implements IModifyPassword {
  @ApiProperty({
    required: true,
    description: 'Entered original password',
  })
  @IsNotEmpty({ message: 'password required' })
  readonly password: string;

  @ApiProperty({
    required: true,
    description: 'password more 4 and less than 50 characters',
  })
  @IsNotEmpty({ message: 'password required' })
  @Length(4, 100, {
    message: 'Password is too short!',
  })
  @Matches(RegExp(PASSWORD_CHECK_REGEX), { message: 'Password is too week' })
  readonly newPassword: string;
  @ApiProperty({
    required: true,
    description: 'confirm password',
  })
  @IsNotEmpty({ message: 'confirm password required' })
  @IsEqual('newPassword', { message: 'Two passwords entered are incomsistent' })
  readonly confirmPassword: string;
}
