<?php

/**
 *      [Discuz!] (C)2001-2099 Comsenz Inc.
 *      This is NOT a freeware, use is subject to license terms
 *
 *      $Id: portal_index.php 31313 2012-08-10 03:51:03Z zhangguosheng $
 */

if(!defined('IN_DISCUZ')) {
    exit('Access Denied');
}

$sql = 'SELECT * FROM pre_activity_upload WHERE shown = 1' ;
$arts = DB::fetch_all($sql);

//echo 'source/module/activity/activity_index.php';

include_once template('diy:activity/vote');
?>

