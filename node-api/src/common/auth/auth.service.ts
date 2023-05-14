import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from '../../api/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ToolsService } from 'src/shared/services/tools/tools.service';
import { UserSiginDto } from '../../api/auth/dto/user.signin.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly toolService: ToolsService,
  ) {}

  async authLogin(_signinDto: UserSiginDto): Promise<string> {
    return Promise.resolve('AA');
  }
}
