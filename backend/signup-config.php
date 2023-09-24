<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

include("dbConfig.php");
$objDb = new DbConnect;
$conn = $objDb->connect();

//echo "test";
$requestMethod = $_SERVER['REQUEST_METHOD'];
switch($requestMethod){
    case "POST":
        $signupData = json_decode(file_get_contents('php://input'));
        var_dump($signupData->pass);
        $sql = "INSERT INTO `user` ( `userEmail`, `userName`, `fName`, `lName`,`userPassword`,`contactNo`,`dateJoined`) VALUES (:userEmail, :userName, :fName, :lName, :userPassword, :contactNo, current_timestamp())";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':userEmail', $signupData->email);
        $stmt->bindParam(':userName', $signupData->username);
        $stmt->bindParam(':fName', $signupData->firstname);
        $stmt->bindParam(':lName', $signupData->lastname);
        $firstPass = $signupData->pass;
        $confirmPass = $signupData->confirmpass;
        if($firstPass == $confirmPass){
            $hashedPassword = password_hash($signupData->pass, PASSWORD_DEFAULT);
            $stmt->bindParam(':userPassword', $hashedPassword);
        }
        $stmt->bindParam(':contactNo', $signupData->contact);
        if($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'success!'];
        } else {
            $response = ['status' => 0, 'message' => 'error!'];
        }
        echo json_encode($response);
        break;
}

?>