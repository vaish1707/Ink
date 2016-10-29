<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$conn = mysqli_connect("localhost","root","","sensehql_inventory");
$data = json_decode(file_get_contents("php://input"));  
$mediumname = mysqli_real_escape_string($conn,$data->raw_ink_medium_name);
$result = $conn->query("SELECT DISTINCT(PRICE_PER_KG) FROM ss_medium where M_NAME='$mediumname'");
$rows=mysqli_num_rows($result);
if($rows==1){
    $row = mysqli_fetch_assoc($result);
    $price=$row['PRICE_PER_KG'];
echo $row['PRICE_PER_KG'];
}

$conn->close();



?>
