<?php

$connect = mysqli_connect("localhost","root","","sensehql_inventory");
if (!$connect) {
    die("Connection failed: " . mysqli_connect_error());
}
$data = json_decode(file_get_contents("php://input"));
if(count($data)>0){
    
    $medium_name = mysqli_real_escape_string($connect,$data->medium_name);
    $price= mysqli_real_escape_string($connect,$data->price);
  
    $query = "UPDATE  ss_medium  SET M_NAME = '$medium_name',PRICE_PER_KG = '$price' WHERE M_NAME = '$medium_name'";
    if(mysqli_query($connect,$query)){
        echo "data updated...";
    }
    else{
        echo "Error....";
    }
}
mysqli_close($connect);
?>


