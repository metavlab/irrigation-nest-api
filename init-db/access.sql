/*
 Navicat Premium Data Transfer

 Source Server         : Docker-mysql3307
 Source Server Type    : MySQL
 Source Server Version : 50724
 Source Host           : localhost:3307
 Source Schema         : irri-db

 Target Server Type    : MySQL
 Target Server Version : 50724
 File Encoding         : 65001

 Date: 18/05/2023 23:01:55
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for access
-- ----------------------------
DROP TABLE IF EXISTS `access`;
CREATE TABLE `access`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Primary key ID',
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT 'record create time',
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT 'record last update time',
  `deleted_at` timestamp(6) NULL DEFAULT NULL COMMENT 'Logic delete sign',
  `parent_id` int(11) NOT NULL DEFAULT 0 COMMENT 'Parent Id',
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT 'Module ,menu or action name',
  `type` tinyint(4) NULL DEFAULT NULL COMMENT 'Resource type,2-menu,3-api',
  `rsource_no` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT 'Resouce no',
  `action_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT 'access action name',
  `icon` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT 'icon url',
  `url` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT 'route URL copy form resource',
  `sortno` int(11) NOT NULL DEFAULT 1 COMMENT 'sort number',
  `status` tinyint(4) NOT NULL DEFAULT 1 COMMENT 'Access status,0-unavailable,1-available',
  `description` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT 'description',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `resource_no_delete_at`(`rsource_no`, `deleted_at`) USING BTREE,
  UNIQUE INDEX `module_name_delete_at`(`name`, `deleted_at`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 19 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of access
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
INSERT INTO `access` VALUES (17, '2023-05-17 15:37:59.669574', '2023-05-18 06:29:46.938419', NULL, 5, '批量授权', 3, '1-admin/role/access/:id/batch_approve', 'batchApproveByRoleId', 'auth-icon', 'admin/role/access/:id/batch_approve', 1, 1, '批量授权');
INSERT INTO `access` VALUES (18, '2023-05-18 06:26:53.535141', '2023-05-18 06:28:44.426576', NULL, 5, '批量取消授权', 3, '1-admin/role/access/:roleId/batch_remove', 'batchRemoveApproveByRole', 'auth-icon', 'admin/role/access/:roleId/batch_remove', 1, 1, '批量移除授权');

SET FOREIGN_KEY_CHECKS = 1;
