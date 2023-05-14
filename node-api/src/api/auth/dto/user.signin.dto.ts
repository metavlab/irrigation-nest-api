import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Trim } from 'class-sanitizer';

export class UserSiginDto {
  @ApiProperty({
    required: false,
    description: 'Signin account entered your username,mobile or email',
  })
  @Trim()
  @IsString()
  @MinLength(3)
  @IsNotEmpty({ message: 'account required an username ,email or mobile' })
  username: string;

  @IsString()
  @IsNotEmpty({ message: 'Password required' })
  password: string;
}
