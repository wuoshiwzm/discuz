<?php if(!defined('IN_DISCUZ')) exit('Access Denied'); hookscriptoutput('vote');?>
vote.htm - 上传作品<?php include template('activity/header'); ?><table>
    <tr>
        <th>标题</th>
        <th>操作</th>
    </tr>
    <?php if(is_array($arts)) foreach($arts as $art) { ?>    <tr>

        <td>
            <?php echo $art['title'];?>
        </td>
        <td>
            <button onclick="vote(<?php echo $art['id'];?>)">投票</button>

        </td>
    </tr>
    <?php } ?>

</table>

<script>

    function vote(id) {
        $.post('/activity.php?mod=judge&action=vote', {id: id}, function (a) {
            alert(a);
        });
    }

</script><?php include template('activity/footer'); ?>