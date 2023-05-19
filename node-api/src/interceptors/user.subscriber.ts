import { ClsService } from 'nestjs-cls';
import { CommonEntity } from 'src/core/models';

import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';

@EventSubscriber()
export class UserSubcriber implements EntitySubscriberInterface<CommonEntity> {
  constructor(dataSource: DataSource, private readonly cls: ClsService) {
    dataSource.subscribers.push(this);
  }

  listenTo() {
    return CommonEntity;
  }

  beforeInsert(event: InsertEvent<CommonEntity>) {
    const userId = this.cls.get('userId');
    if (userId) {
      event.entity.createdBy = userId;
    }
  }

  beforeUpdate(event: UpdateEvent<CommonEntity>): void | Promise<any> {
    const userId = this.cls.get('userId');
    if (userId) {
      event.entity.updatedBy = userId;
    }
  }
}
