<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

session_start();

include("dbConfig.php");
$objDb = new DbConnect;
$conn = $objDb->connect();

//"select * from user where userEmail='$a'or userName='$a'"
//password_verify($b, $row['userPassword'])
$requestMethod = $_SERVER['REQUEST_METHOD'];
switch($requestMethod){
    case "POST":
        $signupData = json_decode(file_get_contents('php://input'));
        $sql = "SELECT * from user where userEmail= :userEmail or userName= :userName";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':userEmail', $signupData->loginfo);
        $stmt->bindParam(':userName', $signupData->loginfo);
        if($stmt->execute()) {
            // Fetch the result
            $result = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($result) {
                // Check if the provided password matches the stored hashed password
                if (password_verify($signupData->password, $result['userPassword'])) {
                    $response = ['status' => 1, 'message' => 'Login successful!', 'data' => $result];
                } else {
                    $response = ['status' => 0, 'message' => 'Invalid password!'];
                }
            } else {
                $response = ['status' => 0, 'message' => 'User not found!'];
            }
        } else {
            $response = ['status' => 0, 'message' => 'Error executing query!'];
        }
        echo json_encode($response);
        break;
}

?>