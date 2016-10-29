<?php
session_start();
$error = '';

if(isset($_POST['submit'])){
    if(empty($_POST['user']) || empty($_POST['pass'])){
        echo "Username password invalid";
    }
    else{
        $user = $_POST['user']; //sensehql_colors
        $pass = $_POST['pass']; //Dinothunder1.
        
        $conn = mysqli_connect("localhost","sensehql_colors","Dinothunder1.","sensehql_inventory");

        // Check connection
        if (mysqli_connect_errno())
        {
            echo "Failed to connect to MySQL: " . mysqli_connect_error();
        }

        $user = mysqli_real_escape_string($conn,$user);
        $pass = mysqli_real_escape_string($conn,$pass);
        
        $sql = "select * from ss_login where username = '$user' and password = '$pass'";
        $result = mysqli_query($conn,$sql);
        $rows=mysqli_num_rows($result);
        
        if($rows==1){
            $_SESSION['login_user'] = $user;
            header("Location: estimate.html");
        }else{
             echo "Username password invalid";
        }
        mysqli_close($conn);
    }
}
?>