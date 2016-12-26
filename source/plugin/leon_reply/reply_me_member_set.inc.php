<?php


defined('IN_DISCUZ') || die('no access!');

//http://discuz.com/home.php?mod=spacecp&ac=plugin&id=myrepeats:memcp
//action="home.php?mod=spacecp&ac=plugin&id=myrepeats:memcp&pluginop=update"

//the function you plugin has
$pluginop_list = array('get', 'set');

if (!isset($_GET['pluginop']) || !in_array($_GET['pluginop'], $pluginop_list)) {
//the request is not leagal
//set default action
    $_GET['pluginop'] = 'get';
}


//to realize the set and get function

if ($_GET['pluginop'] == 'get') {

//    die('sdf');
    $m_forum_reply_me = C::t('#leon_reply#forum_reply_me');

    var_dump($m_forum_reply_me);
    die();
}


if ($_GET['pluginop'] == 'set') {

}