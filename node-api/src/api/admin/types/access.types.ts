export type RoleAccessResourceType = {
  roleId?: number;
  accessId?: number;
  resourceNo?: string;
};

export type ApproveAccessDataType = Omit<RoleAccessResourceType, 'roleId'>;
