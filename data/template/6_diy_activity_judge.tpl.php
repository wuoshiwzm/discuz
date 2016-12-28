<?php if(!defined('IN_DISCUZ')) exit('Access Denied'); hookscriptoutput('judge');?><?php include template('activity/header'); ?>judge.htm - 后台审核
<html>
<head>
    <meta charset="UTF-8">
    <title>Document</title>


</head>
<body>

</body>
</html>
<hr>


<table>
    <tr>
        <th>标题</th>
        <th>操作</th>
    </tr>
    <?php if(is_array($arts)) foreach($arts as $art) { ?>    <tr>
        <td>
            <?php echo $art['title'];?>
        </td>
        <td>
            <button onclick="approve(<?php echo $art['id'];?>)">审核</button>
            <button onclick="unapprove(<?php echo $art['id'];?>)">不通过</button>
        </td>
    </tr>
    <?php } ?>

</table>


<script>
    function approve(id) {
        $.post('/activity.php?mod=judge&action=approve', {id: id}, function (data) {
                    location = location;
                }
        );
    }

    function unapprove(id) {
        $.post('/activity.php?mod=judge&action=unapprove', {id: id}, function (data) {
                    location = location;
                }
        );
    }
</script><?php include template('activity/footer'); ?>