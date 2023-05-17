-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, '2023-05-16 08:02:41.024206', '2023-05-16 08:04:19.561114', NULL, 'admin', '$2b$11$A2BcJ4/iCCm99NST2irY/.0pSsYCySQ7uJkgKOpzmuzNg2Yyfh9HG', NULL, 'admin@anglar.dev', 'Administrator', NULL, NULL, NULL, 1, 2, 1);
INSERT INTO `user` VALUES (2, '2023-05-16 08:04:00.120816', '2023-05-16 08:04:00.120816', NULL, 'dev', '$2b$11$Y9u9KijoyyqA9tuO3NgZSeBWtxQQvOXR2BQzLXW7jSpYfylJFHIwe', NULL, 'dev@anglar.dev', 'Wade Cai', NULL, NULL, NULL, 1, 2, 0);
commit;

-- ----------------------------
-- Records of role
-- ----------------------------
INSERT INTO `role` VALUES (1, '2023-05-16 08:13:45.505558', '2023-05-16 08:13:45.505558', NULL, 'admin-role', 'Administrator role had super permissions', 1, 0);
INSERT INTO `role` VALUES (2, '2023-05-16 08:14:22.284860', '2023-05-16 08:16:29.731332', NULL, 'guest-role', 'Guest user role no auth', 1, 1);
INSERT INTO `role` VALUES (3, '2023-05-16 08:15:06.330608', '2023-05-16 08:15:06.330608', NULL, 'merchant-role', 'Merchant user role had biz permissions', 1, 0);
INSERT INTO `role` VALUES (4, '2023-05-16 08:16:00.048577', '2023-05-16 08:16:00.048577', NULL, 'farmer-role', 'Farmer user role operation self infomations', 1, 0);
commit;

-- ----------------------------
-- Records of access Make sure resource no exist.
-- ----------------------------
INSERT INTO `access` VALUES (1, '2023-05-17 13:21:02.872965', '2023-05-17 13:22:29.103370', NULL, 0, '系统管理', 1, NULL, NULL, 'user-icon', NULL, 1, 1, '系统管理');
INSERT INTO `access` VALUES (2, '2023-05-17 13:22:17.988120', '2023-05-17 13:22:17.988120', NULL, 0, '前端API管理', 1, NULL, NULL, 'web-icon', NULL, 1, 1, '前端API管理(WEB 和 wechat)');
INSERT INTO `access` VALUES (3, '2023-05-17 13:24:16.545159', '2023-05-17 13:24:16.545159', NULL, 1, '账户管理', 2, '0-user', 'getUsers', 'account-icon', 'user', 1, 1, '管理WEB 端登录账户');
INSERT INTO `access` VALUES (4, '2023-05-17 13:28:16.793445', '2023-05-17 13:45:50.324919', NULL, 1, '角色管理', 2, '0-admin/role', 'roleList', 'role-icon', 'admin/role', 1, 1, 'role list');
INSERT INTO `access` VALUES (5, '2023-05-17 13:39:50.633240', '2023-05-17 13:43:57.178405', NULL, 1, '授权管理', 1, NULL, NULL, 'auth-icon', NULL, 1, 1, 'API 授权管理模块');
INSERT INTO `access` VALUES (6, '2023-05-17 13:42:14.053558', '2023-05-17 13:45:48.251898', NULL, 2, '用户管理', 2, NULL, NULL, 'user-icon', NULL, 1, 1, '用户管理模块');
INSERT INTO `access` VALUES (7, '2023-05-17 13:26:10.726358', '2023-05-17 13:45:45.635392', NULL, 3, '账户详情', 3, '0-user/:id', 'getUserById', 'account-icon', 'user/:id', 1, 1, '查询账户详细信息');
INSERT INTO `access` VALUES (8, '2023-05-17 13:31:21.054780', '2023-05-17 13:45:43.209463', NULL, 3, '修改密码', 3, '1-user/modify_password', 'modifyMyPassword', 'edit-icon', 'user/modify_password', 1, 1, 'Modify My password');
INSERT INTO `access` VALUES (9, '2023-05-17 13:33:34.213186', '2023-05-17 13:48:50.541224', NULL, 4, '添加角色', 3, '1-admin/role', 'addRole', 'edit-icon', 'admin/role', 1, 1, 'Create role');
INSERT INTO `access` VALUES (10, '2023-05-17 13:34:08.805261', '2023-05-17 13:48:53.221663', NULL, 4, '修改角色', 3, '1-admin/role/:id/update', 'modifyRoleById', 'edit-icon', 'admin/role/:id/update', 1, 1, 'Update role');
INSERT INTO `access` VALUES (11, '2023-05-17 13:34:58.531867', '2023-05-17 13:48:56.546442', NULL, 4, '移除角色', 3, '3-admin/role/:id', 'removeRoleById', 'remove-icon', 'admin/role/:id', 1, 1, 'make role unavailabled');
INSERT INTO `access` VALUES (12, '2023-05-17 13:35:27.396573', '2023-05-17 13:49:01.644177', NULL, 4, '恢复角色', 3, '1-admin/role/:id/restore', 'restoreRoleById', 'remove-icon', 'admin/role/:id/restore', 1, 1, 'restore role availabled');
INSERT INTO `access` VALUES (13, '2023-05-17 13:47:45.609230', '2023-05-17 13:47:45.609230', NULL, 6, '用户查询', 3, '0-user', 'getUsers', 'user-icon', 'user', 1, 1, '用户管理模块');
INSERT INTO `access` VALUES (14, '2023-05-17 13:51:09.720805', '2023-05-17 13:51:09.720805', NULL, 5, '查询权限树', 3, '0-admin/access/access_all', 'allList', 'auth-icon', 'admin/access/access_all', 1, 1, NULL);
INSERT INTO `access` VALUES (15, '2023-05-17 13:52:50.153474', '2023-05-17 13:52:50.153474', NULL, 5, '添加权限', 3, '1-admin/access', 'createAccess', 'auth-icon', 'admin/access', 1, 1, 'create access resource');
INSERT INTO `access` VALUES (16, '2023-05-17 13:53:43.043069', '2023-05-17 13:53:43.043069', NULL, 5, '搜索权限', 3, '0-admin/access', 'getAccessListByParent', 'auth-icon', 'admin/access', 1, 1, 'Get Access records pagination');
COMMIT;
