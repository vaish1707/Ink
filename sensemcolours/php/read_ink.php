<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$conn = mysqli_connect("localhost","root","","sensehql_inventory");

$data = json_decode(file_get_contents("php://input"));  
//$inkname = $data->selectedink;
$inkname = mysqli_real_escape_string($conn,$data->selectedink);
$query = "SELECT
  DISTINCT(inkTable.RM_MEDIUM_NAME),
  inkTable.RM_QUANTITY,
  coalesce(rawTable.PRICE_PER_KG, mediumTable.PRICE_PER_KG) as PRICE_PER_KG
FROM
  ss_raw rawTable
right JOIN
  ss_ink inkTable
ON
  rawTable.RM_NAME = inkTable.RM_MEDIUM_NAME
LEFT JOIN
  ss_medium mediumTable
ON
  inkTable.RM_MEDIUM_NAME = mediumTable.M_NAME
  where INK_NAME='$inkname'";

$result = $conn->query($query);

$outp = "";
while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
    if ($outp != "") {$outp .= ",";}
    $outp .= '{"Component":"'  . $rs["RM_MEDIUM_NAME"] . '",';
    $outp .= '"Quantity":"'   . $rs["RM_QUANTITY"]        . '",';
    $outp .= '"Price":"'. $rs["PRICE_PER_KG"]     . '"}'; 
}
$outp ='{"records":['.$outp.']}';
$conn->close();

echo($outp);

?>
