import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAccessDto } from './dto/create.access.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorCodeEnum, getBizError } from 'src/errors';
import { AccessVo, AccessListVo } from '../vo/access.vo';
import { PageEnum } from 'src/enums';
import { ReqAccessDto } from './dto/req.access.dto';
import { AccessEntity } from '../../entities';

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

  /**
   * Get all access list for auhtencation to role
   * @returns
   */
  async getAllAccessList(): Promise<AccessVo[]> {
    const list: AccessVo[] = await this.accessRepository.find({
      where: [{ type: 1 }, { type: 2 }],
      select: ['id', 'moduleName', 'actionName', 'sortno'],
    });

    return list;
  }

  async accessList(reqDto: ReqAccessDto): Promise<AccessListVo> {
    const {
      pageSize = PageEnum.PAGE_SIZE,
      pageNumber = PageEnum.PAGE_NUMBER,
      parentId = 0,
    } = reqDto;

    const [data, total] = await this.accessRepository
      .createQueryBuilder('access')
      .where('access.parentId = :parentId', { parentId })
      .skip((pageNumber - 1) * pageSize)
      .take(pageSize)
      .orderBy({ 'access.sortno': 'ASC', 'access.createdAt': 'DESC' })
      .printSql()
      .getManyAndCount();

    return {
      pageNumber,
      pageSize,
      total,
      data,
    };
  }
}
