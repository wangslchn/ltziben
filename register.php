<?php
$username = $_POST['username'];
$password = $_POST['password'];
$password2 = $_POST['password2'];

if ($username == "") {
    exit("用户名不能为空");
}

if ($password != $password2) {
    exit("两次密码输入不同");
}

$dbhost = "localhost";
$dbuser = "ltziben";
$dbpwd = "ltzb2016";
$dbname = "ltziben";

$connetion = mysql_connect($dbhost, $dbuser, $dbpwd);
mysql_set_charset('utf8', $connetion);

if ($connetion) {
    
    $password = md5($password);
    mysql_select_db($dbname, $connetion);
    $dbsql = "INSERT INTO userinfo (UserName,Password,InvitationCode) VALUES('$username','$password','$username' )";
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