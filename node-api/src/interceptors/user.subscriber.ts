import { ClsService } from 'nestjs-cls';
import SharedEntity from 'src/shared/entities/shared.entity';
import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';

@EventSubscriber()
export class UserSubcriber implements EntitySubscriberInterface<SharedEntity> {
  constructor(dataSource: DataSource, private readonly cls: ClsService) {
    dataSource.subscribers.push(this);
  }

  listenTo() {
    return SharedEntity;
  }

  beforeInsert(event: InsertEvent<SharedEntity>) {
    const userId = this.cls.get('userId');
    if (userId) {
      event.entity.createdBy = userId;
    }
  }

  beforeUpdate(event: UpdateEvent<SharedEntity>): void | Promise<any> {
    const userId = this.cls.get('userId');
    if (userId) {
      event.entity.updatedBy = userId;
    }
  }
}
