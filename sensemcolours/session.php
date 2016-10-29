<?php
   
        $conn = mysqli_connect("localhost","sensehql_colors","Dinothunder1.","sensehql_inventory");    

        session_start();

        $user_check = $_SESSION['login_user'];

        $ses_sql =  "select username from ss_login where username = '$user_check'";

        $result_sql=mysqli_query($conn,$ses_sql);

        $rows=mysqli_fetch_assoc($result_sql);

        $login_session = $rows['username'];

        if(!isset($login_session)){
            mysqli_close($conn);
            header("location: index.html");
        }

?>


