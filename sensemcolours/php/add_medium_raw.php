<?php

$connect = new mysqli("localhost","root","","sensehql_inventory");
if (!$connect) {
    die("Connection failed: " . mysqli_connect_error());
}
$data = json_decode(file_get_contents("php://input"));
if(count($data)>0){
$medium_name=mysqli_real_escape_string($connect,$data->medium_name);
    $raw_material = mysqli_real_escape_string($connect,$data->raw_medium_name);
    $quantity=mysqli_real_escape_string($connect,$data->quantity);
    $raw_price=mysqli_real_escape_string($connect,$data->raw_price);
    $price_per_kg = mysqli_real_escape_string($connect,$data->price);
    $query = "INSERT INTO ss_medium(M_NAME, RM_NAME, RM_QUANTITY, PRICE_PER_KG) VALUES ('$medium_name','$raw_material', '$quantity','$price_per_kg');";
    $query .="INSERT INTO ss_raw(RM_NAME, PRICE_PER_KG) VALUES ('$raw_material','$raw_price');";
     

    if(mysqli_multi_query($connect,$query)){
        echo "data inserted...";
      
    }
    else{
        echo "Error....";
    }
}
mysqli_close($connect);
?>