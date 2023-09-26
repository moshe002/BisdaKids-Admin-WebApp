<?php 

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
//header("Access-Control-Allow-Methods: DELETE");

include("dbConfig.php");
$objDb = new DbConnect;
$conn = $objDb->connect();

$requestMethod = $_SERVER['REQUEST_METHOD'];
switch ($requestMethod) {
    case "POST":
        // Get the JSON data from the request body
        $data = json_decode(file_get_contents("php://input"));

        if (!empty($data)) {
            $adminId = $data->userId;

            // data
            $firstname = $data->firstname;
            $lastname = $data->lastname;
            $username = $data->username;
            $email = $data->email;
            $contactNo = $data->contactNo;

            $sql = "UPDATE user SET 
                fName = :firstname,
                lName = :lastname,
                userName = :username,
                userEmail = :email,
                contactNo = :contactNo
                WHERE userID = :adminId";

            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':firstname', $firstname);
            $stmt->bindParam(':lastname', $lastname);
            $stmt->bindParam(':username', $username);
            $stmt->bindParam(':email', $email);
            $stmt->bindParam(':contactNo', $contactNo);
            $stmt->bindParam(':adminId', $adminId);

            if ($stmt->execute()) {
                $response = ['status' => 1, 'message' => 'User updated successfully'];
            } else {
                $response = ['status' => 0, 'message' => 'Error updating user'];
            }

            header('Content-Type: application/json');
            echo json_encode($response);
        } else {
            $response = ['status' => 0, 'message' => 'Invalid data received'];
            header('Content-Type: application/json');
            echo json_encode($response);
        }
        break;
    // default:
    //     http_response_code(405); // Method Not Allowed
    //     echo 'Invalid request method';
}

// Close the database connection
$conn = null;

?>