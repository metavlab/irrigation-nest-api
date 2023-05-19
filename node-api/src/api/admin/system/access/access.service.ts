import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAccessDto } from './dto/create.access.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorCodeEnum, getBizError } from 'src/errors';
import { AccessVo, AccessListVo } from '../vo/access.vo';
import { PageEnum } from 'src/enums';
import { ReqAccessDto } from './dto/req.access.dto';
import { AccessEntity } from '../../../../core/entities';
import { ResourceEntity } from '../../../../core/entities/resource.entity';

@Injectable()
export class AccessService {
  constructor(
    @InjectRepository(AccessEntity)
    private readonly accessRepository: Repository<AccessEntity>,
    @InjectRepository(ResourceEntity)
    private readonly resourceRepository: Repository<ResourceEntity>,
  ) {}

  public async createAccessData(
    dto: CreateAccessDto,
  ): Promise<AccessEntity | never> {
    const {
      name,
      actionName,
      parentId = 0,
      resourceNo,
      description,
      url,
    } = dto;
    if (name) {
      const findByModuleName: Pick<AccessEntity, 'id'> | undefined =
        await this.accessRepository.findOne({
          where: { name, parentId },
          select: ['id'],
        });

      if (findByModuleName)
        throw new HttpException(
          getBizError(
            ErrorCodeEnum.DATA_RECORD_CONFLICT,
            `Access Resource Module name [${name}] has been exists,`,
          ),
          HttpStatus.CONFLICT,
        );
    }

    let saveEntity = {
      ...dto,
      status: 1,
    };

    //
    if (resourceNo) {
      const findResource: Pick<
        ResourceEntity,
        'moduleName' | 'url' | 'methodDesc' | 'methodName'
      > = await this.resourceRepository.findOneBy({ resourceNo: resourceNo });

      if (!findResource) {
        throw new HttpException(
          getBizError(
            ErrorCodeEnum.DATA_RECORD_UNFOUND,
            `Access Resource id [${resourceNo}] incorrect.`,
          ),
          HttpStatus.NOT_FOUND,
        );
      }

      saveEntity = {
        ...dto,
        actionName: actionName || findResource.methodName,
        url: url || findResource.url,
        description: description || findResource.methodDesc,
        status: 1,
      };
    }

    //Save
    const access: AccessEntity = this.accessRepository.create(saveEntity);
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
      select: ['id', 'name', 'resourceNo', 'actionName', 'sortno'],
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
