<?php

$connect = mysqli_connect("localhost","root","","sensehql_inventory");
if (!$connect) {
    die("Connection failed: " . mysqli_connect_error());
}
$data = json_decode(file_get_contents("php://input"));
if(count($data)>0){
    
    $raw_material = mysqli_real_escape_string($connect,$data->raw_material);
    $price_per_kg = mysqli_real_escape_string($connect,$data->price_per_kg);
  
    $query = "UPDATE  ss_raw  SET RM_NAME = '$raw_material',PRICE_PER_KG = '$price_per_kg' WHERE RM_NAME = '$raw_material'";
    if(mysqli_query($connect,$query)){
        echo "data updated...";
    }
    else{
        echo "Error....";
    }
}
mysqli_close($connect);
?>
