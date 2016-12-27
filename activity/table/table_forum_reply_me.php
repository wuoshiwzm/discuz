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

    /**
     * @param $uid
     * check the user whoss id is $uid is check the option of reply
     */
    public function get_is_reply($uid)
    {
        $sql = "SELECT is_reply FROM %t where uid=%d";

        //discuz DAO class: discuz_database
        return (int)DB::result_first($sql,array($this->table,$uid));

    }


}