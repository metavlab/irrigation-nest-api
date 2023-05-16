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
