<?php

$username = $_POST['username'];
$password = $_POST['password'];


if ($username == "")
{
    //exit("用户名不能为空");
    die('用户名不鞥你为空');
}

if($password == "")
{
    exit("密码不能为空");
}

$dbhost ="localhost";
$dbuser = "ltziben";
$dbpwd = "ltzb2016";
$dbname = "ltziben";

$connetion = mysql_connect($dbhost, $dbuser, $dbpwd);
if($connetion){
    
    $password = md5($password);
    mysql_select_db($dbname, $connetion);
    $dbsql = "SELECT * FROM  userinfo WHERE UserName='$username' AND Password = '$password'";
    //exit($dbsql);
    $dbresult = mysql_query($dbsql);
    
    if($dbresult){
        $row = mysql_fetch_array($dbresult);
        if($row){
            echo $row['UserName']."登录成功";
            //var_dump($row);
        }else{
            die("用户名密码不正确，或者该用户不存在！");
        }
        
    }else{
        die("登录失败");
    }
}
else {
    echo $dbname."连接数据库失败";
}

mysql_close($connetion);

?>