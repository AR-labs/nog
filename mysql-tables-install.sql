CREATE TABLE `user` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `username` varchar(20) NOT NULL,
  `password` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `blog` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `title` varchar(50) NOT NULL,
  `subtitle` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `article` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `text` TEXT NOT NULL,
  `title` varchar(200),
  `arttype` int(2) NOT NULL,
  `created` DATETIME NOT NULL, #time in millis
  `lastchange` DATETIME,
  `shorturl` varchar(20),
  `urlfragment` varchar(20),
  PRIMARY KEY (`id`)
);

CREATE TABLE `sessions` (
  `uuid` VARCHAR(20) NOT NULL,
  `userId` INT(20),
  PRIMARY KEY  (`uuid`)
);

# arttype
# 0: text (default)
# 1: image
# 2: link
# 3: audio
# 4: video


CREATE TABLE `tag` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `value` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `rel_user_blog` (
  `id` int(15) NOT NULL AUTO_INCREMENT,
  `userid` int(15) NOT NULL,
  `blogid` int(15) NOT NULL,
  `owned` int(1) NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `rel_blog_article` (
  `id` int(15) NOT NULL AUTO_INCREMENT,
  `blogid` int(15) NOT NULL,
  `artid` int(20) NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `rel_article_tag` (
  `id` int(15) NOT NULL AUTO_INCREMENT,
  `artid` int(20) NOT NULL,
  `tagid` int(20) NOT NULL,
  PRIMARY KEY (`id`)
);

ALTER TABLE  `article` CHANGE  `urlfragment`  `urlfragment` VARCHAR( 50 ) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL;

ALTER TABLE  `user` ADD  `email` VARCHAR( 40 ) CHARACTER SET utf8 COLLATE utf8_general_ci NULL;