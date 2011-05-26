-- phpMyAdmin SQL Dump
-- version 3.2.5
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: May 26, 2011 at 10:37 PM
-- Server version: 5.1.44
-- PHP Version: 5.3.2

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `nog`
--

-- --------------------------------------------------------

--
-- Table structure for table `article`
--

CREATE TABLE `article` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `text` text NOT NULL,
  `title` varchar(200) DEFAULT NULL,
  `arttype` int(2) NOT NULL,
  `created` datetime NOT NULL,
  `lastchange` datetime DEFAULT NULL,
  `urlfragment` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=45 ;

--
-- Dumping data for table `article`
--

INSERT INTO `article` VALUES(3, 'Dieser Artikel dient der Dokumentation des Projektes…', 'nog', 0, '2011-05-02 16:27:53', '2011-05-02 16:27:53', 'node-based-blog');
INSERT INTO `article` VALUES(2, 'Das iPad ist immer noch nicht da. :(<br/>\r\n<br/>\r\n<b>Update:</b><br/>\r\nMittlerweile ist es da. :)', 'iPadiPadiPadiPadiPadiPad', 0, '2011-05-02 16:26:32', '2011-05-13 18:09:38', 'ipad');
INSERT INTO `article` VALUES(4, 'Ich schreibe jetzt wieder bei <a href="http://apfeltech.net/author/felix-boehm">Apfeltech</a>.', 'Meine kreativen Arbeiten', 0, '2011-05-13 11:02:29', '2011-05-13 11:02:29', 'meine-kreativen-arbe');
INSERT INTO `article` VALUES(5, 'Phat ipsizzle shiznit fo amizzle, consectetuer adipiscing elit. Nullizzle things velizzle, things volutpat, suscipizzle fo shizzle, gangster vizzle, you son of a bizzle. Dawg eget ghetto. Pimpin'' eros. Away izzle dolor dapibizzle tempizzle bizzle. Maurizzle pellentesque the bizzle izzle turpizzle. Mofo izzle tortizzle. Pellentesque crunk that''s the shizzle fo shizzle. In hac habitasse crazy dictumst. Hizzle dapibizzle. Stuff tellizzle urna, pretium ma nizzle, black ac, crazy vitae, nunc. Go to hizzle ass. Integer semper shizzlin dizzle shiz izzle.\r\n\r\nNunc get down get down lorem, pulvinizzle izzle, uhuh ... yih! egizzle, dang id, diam. Owned sed leo gangster sizzle hendrerit mattis. Ass interdizzle gizzle crackalackin erizzle commodo ghetto. Etizzle lobortis fermentizzle gangsta. Morbi pizzle. Maecenizzle quis metizzle rizzle hizzle auctizzle. Integer funky fresh viverra urna. Dawg sollicitudizzle check it out dope purus. Morbi gangsta check out this sizzle amizzle fo. Nizzle dawg enizzle vitae arcu. Cizzle fo shizzle daahng dawg penatibus et we gonna chung dizzle parturient shit, nascetizzle ridiculus owned.', 'Lorem Ipsum mal etwas anders', 0, '2011-05-13 18:02:35', '2011-05-13 18:02:35', 'lorem-ipsum');
INSERT INTO `article` VALUES(26, 'fuu', 'arr', 0, '2011-05-19 20:24:34', '2011-05-19 20:24:34', 'fuar');
INSERT INTO `article` VALUES(38, 'artikel        			\r\n        		', 'test', 0, '2011-05-22 16:59:56', '2011-05-22 16:59:56', 'testart');
INSERT INTO `article` VALUES(40, 'http://29.media.tumblr.com/tumblr_lllwzmORpL1qa1zngo1_500.jpg	\r\n        		', 'Kätzchen :D', 1, '2011-05-22 23:19:06', '2011-05-22 23:19:06', 'katze');
INSERT INTO `article` VALUES(39, 'http://30.media.tumblr.com/tumblr_llli3kK2pO1qezkk9o1_500.jpg', '', 1, '2011-05-22 23:02:10', '2011-05-25 22:38:34', 'takeoff');
INSERT INTO `article` VALUES(18, 'fuu', 'arr', 0, '2011-05-19 20:24:34', '2011-05-19 20:24:34', 'fuar');
INSERT INTO `article` VALUES(41, '<object><param name="movie" value="http://www.youtube.com/v/xlU3eKMVsCY&rel=0&hl=de_DE&feature=player_embedded&version=3"></param><param name="allowFullScreen" value="true"></param><param name="allowScriptAccess" value="always"></param><embed src="http://www.youtube.com/v/xlU3eKMVsCY&rel=0&hl=de_DE&feature=player_embedded&version=3" type="application/x-shockwave-flash" allowfullscreen="true" allowScriptAccess="always" width="640" height="390"></embed></object>', 'http://www.pixelschatten.com/', 4, '2011-05-24 21:17:46', '2011-05-24 21:17:46', 'testvideo');
INSERT INTO `article` VALUES(42, 'http://prietz.org/', 'My Homepage', 2, '2011-05-24 21:37:11', '2011-05-25 14:50:27', '');
INSERT INTO `article` VALUES(43, 'dasdsadaZZZZsdsad', 'arg', 0, '2011-05-24 22:59:56', '2011-05-25 21:07:45', '');
INSERT INTO `article` VALUES(44, 'http://prietz.org/assets/me.jpg', 'Me :)', 1, '2011-05-26 17:58:08', '2011-05-26 17:58:08', 'me');

-- --------------------------------------------------------

--
-- Table structure for table `blog`
--

CREATE TABLE `blog` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `title` varchar(50) CHARACTER SET latin1 NOT NULL,
  `subtitle` varchar(100) CHARACTER SET latin1 NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=6 ;

--
-- Dumping data for table `blog`
--

INSERT INTO `blog` VALUES(1, 'papr.log', 'Logging the best');
INSERT INTO `blog` VALUES(2, 'bloggog', '');
INSERT INTO `blog` VALUES(3, 'en', 'This is your first nog.');
INSERT INTO `blog` VALUES(4, 'test', 'This is your first nog.');
INSERT INTO `blog` VALUES(5, '', 'This is your first nog.');

-- --------------------------------------------------------

--
-- Table structure for table `rel_article_tag`
--

CREATE TABLE `rel_article_tag` (
  `id` int(15) NOT NULL AUTO_INCREMENT,
  `artid` int(20) NOT NULL,
  `tagid` int(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `rel_article_tag`
--

INSERT INTO `rel_article_tag` VALUES(1, 2, 4);
INSERT INTO `rel_article_tag` VALUES(2, 4, 2);
INSERT INTO `rel_article_tag` VALUES(3, 4, 3);

-- --------------------------------------------------------

--
-- Table structure for table `rel_blog_article`
--

CREATE TABLE `rel_blog_article` (
  `id` int(15) NOT NULL AUTO_INCREMENT,
  `blogid` int(15) NOT NULL,
  `artid` int(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=34 ;

--
-- Dumping data for table `rel_blog_article`
--

INSERT INTO `rel_blog_article` VALUES(1, 1, 2);
INSERT INTO `rel_blog_article` VALUES(2, 1, 3);
INSERT INTO `rel_blog_article` VALUES(3, 2, 4);
INSERT INTO `rel_blog_article` VALUES(4, 2, 5);
INSERT INTO `rel_blog_article` VALUES(7, 1, 18);
INSERT INTO `rel_blog_article` VALUES(6, 2, 17);
INSERT INTO `rel_blog_article` VALUES(8, 1, 19);
INSERT INTO `rel_blog_article` VALUES(9, 1, 20);
INSERT INTO `rel_blog_article` VALUES(10, 1, 21);
INSERT INTO `rel_blog_article` VALUES(11, 1, 22);
INSERT INTO `rel_blog_article` VALUES(12, 1, 23);
INSERT INTO `rel_blog_article` VALUES(13, 1, 24);
INSERT INTO `rel_blog_article` VALUES(27, 1, 38);
INSERT INTO `rel_blog_article` VALUES(15, 1, 26);
INSERT INTO `rel_blog_article` VALUES(33, 1, 44);
INSERT INTO `rel_blog_article` VALUES(17, 1, 28);
INSERT INTO `rel_blog_article` VALUES(18, 1, 29);
INSERT INTO `rel_blog_article` VALUES(19, 1, 30);
INSERT INTO `rel_blog_article` VALUES(20, 1, 31);
INSERT INTO `rel_blog_article` VALUES(21, 1, 32);
INSERT INTO `rel_blog_article` VALUES(22, 1, 33);
INSERT INTO `rel_blog_article` VALUES(23, 1, 34);
INSERT INTO `rel_blog_article` VALUES(24, 1, 35);
INSERT INTO `rel_blog_article` VALUES(25, 1, 36);
INSERT INTO `rel_blog_article` VALUES(26, 1, 37);
INSERT INTO `rel_blog_article` VALUES(28, 1, 39);
INSERT INTO `rel_blog_article` VALUES(29, 2, 40);
INSERT INTO `rel_blog_article` VALUES(30, 1, 41);
INSERT INTO `rel_blog_article` VALUES(31, 1, 42);
INSERT INTO `rel_blog_article` VALUES(32, 2, 43);

-- --------------------------------------------------------

--
-- Table structure for table `rel_user_blog`
--

CREATE TABLE `rel_user_blog` (
  `id` int(15) NOT NULL AUTO_INCREMENT,
  `userid` int(15) NOT NULL,
  `blogid` int(15) NOT NULL,
  `owned` int(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=9 ;

--
-- Dumping data for table `rel_user_blog`
--

INSERT INTO `rel_user_blog` VALUES(1, 1, 1, 1);
INSERT INTO `rel_user_blog` VALUES(2, 2, 2, 1);
INSERT INTO `rel_user_blog` VALUES(3, 1, 2, 0);
INSERT INTO `rel_user_blog` VALUES(4, 2, 1, 0);
INSERT INTO `rel_user_blog` VALUES(6, 4, 3, 1);
INSERT INTO `rel_user_blog` VALUES(7, 5, 4, 1);
INSERT INTO `rel_user_blog` VALUES(8, 6, 5, 1);

-- --------------------------------------------------------

--
-- Table structure for table `tag`
--

CREATE TABLE `tag` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `value` varchar(20) CHARACTER SET latin1 NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

--
-- Dumping data for table `tag`
--

INSERT INTO `tag` VALUES(1, 'Apple');
INSERT INTO `tag` VALUES(2, 'InfoLK');
INSERT INTO `tag` VALUES(3, 'Schule');
INSERT INTO `tag` VALUES(4, 'iPad');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `username` varchar(20) CHARACTER SET latin1 NOT NULL,
  `password` varchar(50) CHARACTER SET latin1 NOT NULL,
  `email` varchar(40) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=7 ;

--
-- Dumping data for table `user`
--

INSERT INTO `user` VALUES(1, 'papr', 'd41d8cd98f00b204e9800998ecf8427e', NULL);
INSERT INTO `user` VALUES(2, 'feedic', 'd41d8cd98f00b204e9800998ecf8427e', NULL);
INSERT INTO `user` VALUES(3, 'test', '098f6bcd4621d373cade4e832627b4f6', NULL);
INSERT INTO `user` VALUES(4, 'en', 'd41d8cd98f00b204e9800998ecf8427e', NULL);
INSERT INTO `user` VALUES(5, 'test', 'd41d8cd98f00b204e9800998ecf8427e', 'test@test.foo');
