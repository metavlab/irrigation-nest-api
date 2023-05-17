import { Injectable } from '@nestjs/common';
import { CollectionsPermissionService } from 'src/common/collections-permission/services/collections.permission.service';
import { ResourceEntity } from '../../entities/resource.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ResourceService {
  private resourceList:
    | Omit<ResourceEntity, 'id' | 'createdAt' | 'updatedAt'>[]
    | undefined = [];
  constructor(
    private readonly collectionsPermissionService: CollectionsPermissionService,
    @InjectRepository(ResourceEntity)
    private readonly resourceRepository: Repository<ResourceEntity>,
    private readonly config: ConfigService,
  ) {}

  onModuleInit() {
    const collectionEnabled = this.config.get('COLLECTIONS_RESOURCES');
    if (['yes', '1'].includes(collectionEnabled)) {
      this.initPermissions();
    }
  }

  private async initPermissions() {
    this.resourceList =
      await this.collectionsPermissionService.allPermissionList();

    await this.createOrUpdateResource();
    await this.removeDeparedRource();
  }

  private async createOrUpdateResource(): Promise<void> {
    if (!this.resourceList?.length) return;
    for (const item of this.resourceList) {
      const { method, url, controllerRoute, controllerName } = item;
      const checkFind: Pick<ResourceEntity, 'id'> | undefined =
        await this.resourceRepository.findOne({
          where: { method, url, controllerRoute, controllerName },
          select: ['id'],
        });

      if (!checkFind?.id) {
        const result = this.resourceRepository.create(item);

        await this.resourceRepository.save(result);
      } else {
        await this.resourceRepository.update({ id: checkFind.id }, { ...item });
      }
    }
  }

  private async removeDeparedRource(): Promise<void> {
    type DbResource = Omit<ResourceEntity, 'createdAt' | 'updatedAt'>;

    const dblist: DbResource[] = await this.resourceRepository.find({
      select: [
        'id',
        'moduleName',
        'controllerName',
        'controllerRoute',
        'methodName',
        'method',
        'url',
      ],
    });

    const diffList: DbResource[] = dblist.filter((item: DbResource) => {
      const isExist = this.resourceList.find(
        (it) =>
          it.method === item.method &&
          it.url === item.url &&
          it.controllerRoute === item.controllerRoute &&
          it.methodName === item.methodName,
      );

      return !isExist;
    });
    if (diffList?.length) {
      const diffListByDel = diffList.map((it) => it.id);
      await this.resourceRepository.delete(diffListByDel);
    }
  }
}
