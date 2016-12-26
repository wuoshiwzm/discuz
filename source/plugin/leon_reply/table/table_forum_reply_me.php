<?php

/**
 * Created by PhpStorm.
 * User: HIAPAD
 * Date: 2016/12/26
 * Time: 17:49
 */


defined('IN_DISCUZ') || die;

/**
 * Class table_forum_reply_me
 * modle file
 */
class table_forum_reply_me extends discuz_table
{

    public function __construct()
    {
        //pk parent::__construct()

        $this->_table = 'forum_reply_me';
        $this->_pk = 'uid';

        parent::__construct();
    }


}