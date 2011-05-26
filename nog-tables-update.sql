ALTER TABLE  `article` ADD  `arttype` INT( 2 ) NOT NULL AFTER  `title`;

ALTER TABLE  `article` CHANGE  `urlfragment`  `urlfragment` VARCHAR( 50 ) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL;

ALTER TABLE  `user` ADD  `email` VARCHAR( 40 ) CHARACTER SET utf8 COLLATE utf8_general_ci NULL;