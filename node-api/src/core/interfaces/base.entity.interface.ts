export type IBaseEntity = {
  id: number;
  createdBy?: number;
  createdAt: Date;
  updatedBy?: number;
  updatedAt: Date;
  deletedAt?: Date;
};
