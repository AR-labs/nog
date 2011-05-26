SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;


CREATE TABLE `article` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `text` text CHARACTER SET latin1 NOT NULL,
  `title` varchar(200) CHARACTER SET latin1 DEFAULT NULL,
  `created` datetime NOT NULL,
  `lastchange` datetime DEFAULT NULL,
  `shorturl` varchar(20) CHARACTER SET latin1 DEFAULT NULL,
  `urlfragment` varchar(20) CHARACTER SET latin1 DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

INSERT INTO `article` VALUES(3, 'Dieser Artikel dient der Dokumentation des Projektes…', 'nog', '2011-05-02 16:27:53', '2011-05-02 16:27:53', 'nog', 'node-based-blog');
INSERT INTO `article` VALUES(2, 'Das iPad ist immer noch nicht da. :(', 'iPadiPadiPadiPadiPadiPad', '2011-05-02 16:26:32', '2011-05-02 16:26:32', 'ipad', 'ipad');

CREATE TABLE `blog` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `title` varchar(50) CHARACTER SET latin1 NOT NULL,
  `subtitle` varchar(100) CHARACTER SET latin1 NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

INSERT INTO `blog` VALUES(1, 'papr.log', 'Logging the best');
INSERT INTO `blog` VALUES(2, 'bloggog', '');

CREATE TABLE `rel_article_tag` (
  `id` int(15) NOT NULL AUTO_INCREMENT,
  `artid` int(20) NOT NULL,
  `tagid` int(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

INSERT INTO `rel_article_tag` VALUES(1, 2, 4);
INSERT INTO `rel_article_tag` VALUES(2, 4, 2);
INSERT INTO `rel_article_tag` VALUES(3, 4, 3);

CREATE TABLE `rel_blog_article` (
  `id` int(15) NOT NULL AUTO_INCREMENT,
  `blogid` int(15) NOT NULL,
  `artid` int(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

INSERT INTO `rel_blog_article` VALUES(1, 1, 2);
INSERT INTO `rel_blog_article` VALUES(2, 1, 3);

CREATE TABLE `rel_user_blog` (
  `id` int(15) NOT NULL AUTO_INCREMENT,
  `userid` int(15) NOT NULL,
  `blogid` int(15) NOT NULL,
  `owned` int(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

INSERT INTO `rel_user_blog` VALUES(1, 1, 1, 1);
INSERT INTO `rel_user_blog` VALUES(2, 2, 2, 1);
INSERT INTO `rel_user_blog` VALUES(3, 1, 2, 0);
INSERT INTO `rel_user_blog` VALUES(4, 2, 1, 0);

CREATE TABLE `tag` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `value` varchar(20) CHARACTER SET latin1 NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

INSERT INTO `tag` VALUES(1, 'Apple');
INSERT INTO `tag` VALUES(2, 'InfoLK');
INSERT INTO `tag` VALUES(3, 'Schule');
INSERT INTO `tag` VALUES(4, 'iPad');

CREATE TABLE `user` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `username` varchar(20) CHARACTER SET latin1 NOT NULL,
  `password` varchar(50) CHARACTER SET latin1 NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

INSERT INTO `user` VALUES(1, 'papr', 'd41d8cd98f00b204e9800998ecf8427e');
INSERT INTO `user` VALUES(2, 'feedic', 'd41d8cd98f00b204e9800998ecf8427e');
