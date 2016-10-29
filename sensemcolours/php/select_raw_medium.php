<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$conn = mysqli_connect("localhost","root","","sensehql_inventory");

$result = $conn->query("SELECT DISTINCT(RM_NAME) FROM ss_medium");

$outp = "";
while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
    if ($outp != "") {$outp .= ",";}
    $outp .= '{"rawmediumname":"'  . $rs["RM_NAME"] . '"}';
}
$outp ='{"records":['.$outp.']}';
$conn->close();

echo($outp);

?>