export class QueryVo {
  id?: number;
  isDeleted?: number;
  createdTime?: Date;
  updatedTime?: Date;
}

export class QueryListVo {
  total: number;
  pageSize: number;
  pageNumber: number;
}
