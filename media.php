<?php
/**
 * Created by PhpStorm.
 * User: HIAPAD
 * Date: 2016/12/26
 * Time: 15:47
 */


define('CURSCRIPT', 'test');
require './source/class/class_core.php';//引入系统核心文件 $discuz = & discuz_core::instance();//以下代码为创建及初始化对象 $discu–>init();
loadcache('diytemplatename');
$navtitle = '合作媒体';
$metakeywords = '合作媒体';
$metadescription = '合作媒体';
include template('diy:forum/media');//调用单页模版文件 