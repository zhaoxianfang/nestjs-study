/*
Navicat MySQL Data Transfer

Source Server         : 本地
Source Server Version : 50505
Source Host           : localhost:3306
Source Database       : km_volunteer

Target Server Type    : MYSQL
Target Server Version : 50505
File Encoding         : 65001

Date: 2020-09-09 14:29:49
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for km_user
-- ----------------------------
DROP TABLE IF EXISTS `km_user`;
CREATE TABLE `km_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(30) NOT NULL COMMENT '姓名',
  `nickname` varchar(40) NOT NULL COMMENT '昵称',
  `password` varchar(70) NOT NULL COMMENT '密码',
  `salt` varchar(10) NOT NULL,
  `avatar` varchar(150) DEFAULT NULL COMMENT '头像',
  `gender` tinyint(4) NOT NULL DEFAULT 1 COMMENT '性别：0未知1男2女',
  `mobile` varchar(15) NOT NULL COMMENT '手机号码',
  `create_time` int(11) NOT NULL COMMENT '创建时间',
  `last_login_ip` varchar(70) DEFAULT NULL COMMENT '最后登录IP',
  `last_login_time` int(11) DEFAULT NULL COMMENT '最后登录时间',
  `status` tinyint(4) NOT NULL DEFAULT 1 COMMENT '用户状态：-1删除;1正常;2冻结',
  PRIMARY KEY (`id`),
  UNIQUE KEY `mobile` (`mobile`),
  UNIQUE KEY `IDX_523d50efb386569c84b2ed7b1f` (`mobile`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of km_user
-- ----------------------------
INSERT INTO `km_user` VALUES ('1', '张三', '小张三', 'gmQ3vQPWCeQRDxf/KOSQsQ==', '1Jqm', null, '1', '15687860797', '1599467355', null, null, '1');
INSERT INTO `km_user` VALUES ('3', '张三', '小张三', 'iyCJ+8jl+isTB5Wk0GJ0+g==', 'cMMi', null, '1', '15687860796', '1599467714', null, null, '1');
