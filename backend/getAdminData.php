<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

include("dbConfig.php");
$objDb = new DbConnect;
$conn = $objDb->connect();

$requestMethod = $_SERVER['REQUEST_METHOD'];
switch($requestMethod){
    case "GET":
        $sql = "SELECT * FROM user";
        $stmt = $conn->prepare($sql);

        if($stmt->execute()) {
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

            if($result){
                $response = ['status' => 1, 'message' => 'Data Fetched!', 'data' => $result];
            } else {
                $response = ['status' => 0, 'message' => 'Fetching Failed!', 'data' => $result];
            }
        } else {
            $response = ['status' => 0, 'message' => 'Error executing query!'];
        }
        //var_dump($response);
        echo json_encode($response);
        break;
}


// Close the database connection
//$conn->close();

?>