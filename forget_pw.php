<?php
$username = $_POST['userphone'];
$mobilecode = $_POST['mobilecode'];
$repassword = $_POST['repassword'];


if ($username == "") {
    exit("用户名不能为空");
}

if ($mobilecode == "") {
    exit("验证码不能为空");
}

if ($repassword == "") {
    exit("输入新的密码");
}

$dbhost = "localhost";
$dbuser = "ltziben";
$dbpwd = "ltzb2016";
$dbname = "ltziben";

$connetion = mysql_connect($dbhost, $dbuser, $dbpwd);
mysql_set_charset('utf8', $connetion);

if ($connetion) {
    
    $repassword = md5($repassword);
    mysql_select_db($dbname, $connetion);
    $dbsql = "INSERT INTO userinfo (UserName,Password,InvitationCode) VALUES('$username','$repassword','$username' )";
    // exit($dbsql);
    $dbresult = mysql_query($dbsql);
    
    if ($dbresult) {
        echo $username . "注册成功";
    } else {
        die($username . "注册失败");
    }
} else {
    echo $dbname . "数据库连接失败";
}

mysql_close($connetion);

?>