import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAccessDto } from './dto/create.access.dto';
import { AccessEntity } from '../entities/access.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorCodeEnum, getBizError } from 'src/errors';

@Injectable()
export class AccessService {
  constructor(
    @InjectRepository(AccessEntity)
    private readonly accessRepository: Repository<AccessEntity>,
  ) {}

  public async createAccessData(
    dto: CreateAccessDto,
  ): Promise<AccessEntity | never> {
    const { moduleName, actionName } = dto;
    if (moduleName) {
      const findByModuleName: Pick<AccessEntity, 'id'> | undefined =
        await this.accessRepository.findOne({
          where: { moduleName },
          select: ['id'],
        });

      if (findByModuleName)
        throw new HttpException(
          getBizError(
            ErrorCodeEnum.DATA_RECORD_CONFLICT,
            `Access Resource Module name [${moduleName}] has been exists,`,
          ),
          HttpStatus.CONFLICT,
        );
    }

    if (actionName) {
      const findByActionName: Pick<AccessEntity, 'id'> | undefined =
        await this.accessRepository.findOne({
          where: { actionName },
          select: ['id'],
        });

      if (findByActionName)
        throw new HttpException(
          getBizError(
            ErrorCodeEnum.DATA_RECORD_CONFLICT,
            `Access Resource Action name [${actionName}] has been exists,`,
          ),
          HttpStatus.CONFLICT,
        );
    }

    //Save
    const access: AccessEntity = this.accessRepository.create({
      ...dto,
      status: 1,
    });
    await this.accessRepository.save(access);
    return await access;
  }
}
