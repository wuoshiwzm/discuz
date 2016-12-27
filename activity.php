<?php

/**
 *      [Discuz!] (C)2001-2099 Comsenz Inc.
 *      This is NOT a freeware, use is subject to license terms
 *
 *      $Id: portal.php 33234 2013-05-08 04:13:19Z andyzheng $
 */


define('APPTYPEID', 4);
define('CURSCRIPT', 'portal');

require './source/class/class_core.php';
$discuz = C::app();


//$cachelist = array('userapp', 'portalcategory', 'diytemplatenameportal');
//$discuz->cachelist = $cachelist;
$discuz->init();


//require DISCUZ_ROOT . './source/function/function_home.php';
//require DISCUZ_ROOT . './source/function/function_portal.php';
//

//默认页面为index  其他 页面为 vote, upload, share
if (empty($_GET['mod']) || !in_array($_GET['mod'], array('vote', 'upload', 'share','detail','discuss','gallery','judge'))) {
    $_GET['mod'] = 'index';
}


define('CURMODULE', $_GET['mod']);




$navtitle = str_replace('{bbname}', $_G['setting']['bbname'], $_G['setting']['seotitle']['activity']);

$_G['disabledwidthauto'] = 1;

require_once libfile('activity/' . $_GET['mod'], 'module');

?>

