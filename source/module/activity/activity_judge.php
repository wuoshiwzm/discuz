<?php

/**
 *      [Discuz!] (C)2001-2099 Comsenz Inc.
 *      This is NOT a freeware, use is subject to license terms
 *
 *      $Id: portal_index.php 31313 2012-08-10 03:51:03Z zhangguosheng $
 */

if (!defined('IN_DISCUZ')) {
    exit('Access Denied');
}

//admincp.php?action=dodo，相当于执行admin目录下的dodo.inc.php文件


//var_dump($_GET);

//action:article 上传作品
if ($_GET['action'] == 'article') {
//array(3) { ["mod"]=> string(5) "judge" ["action"]=> string(6) "zuopin" ["TEST"]=> string(9) "weffsddsf" }

    $sql = "SELECT * FROM pre_activity_upload WHERE uid =" . $_G['uid'];
//    检测是否此用户已经提交过作品
//    if (DB::fetch_first($sql)) {
//        die('you already post before!');
//    }

    //    DB::insert($tablename, 数据(数组),是否返回插入ID,是否是替换式,是否silent)
    DB::insert('activity_upload', [
        'uid' => $_G['uid'],
        'title' => $_GET['TEST'],
    ], true);

    //返回上传页
    include_once template('diy:activity/upload');
//    die('success');
}

if ($_GET['action'] == 'approve') {
//    DB::update($tablename, 数据(数组)条件)
    $res = DB::update('activity_upload', [
        'shown' => 1,
    ],  [
        'id'=>$_GET['id'],
    ]);
}

//审核不通过
if ($_GET['action'] == 'unapprove') {
    //    DB::update($tablename, 数据(数组)条件)
    $res = DB::update('activity_upload', [
        'shown' => 2,
    ],  [
        'id'=>$_GET['id'],
    ]);
}

//投票
if ($_GET['action'] == 'vote') {
    //判断是否通过验证的用户
    if(DB::fetch_first("SELECT * FROM pre_activity_vote where uid=".$_G['uid'])){
        return 1;
    }

    return 2;
    //DB::update($tablename, 数据(数组)条件)
    $res = DB::insert('activity_vote', [
       'uid'=>$_G['uid'],
        'art_id'=>$_GET['id'],
        'vote_time'=>date('Y-m-d H:m:s',time()),
    ]);
    return 2;
}


$sql = 'SELECT * FROM pre_activity_upload WHERE shown = 0' ;
$arts = DB::fetch_all($sql);


//echo 'source/module/activity/activity_index.php';

include_once template('diy:activity/judge');
?>

