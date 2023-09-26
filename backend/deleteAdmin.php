<?php 

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
//header("Access-Control-Allow-Methods: DELETE");

include("dbConfig.php");
$objDb = new DbConnect;
$conn = $objDb->connect();

// Check if the request method is DELETE
$requestMethod = $_SERVER['REQUEST_METHOD'];
switch($requestMethod) {
    case "POST":
        $data = json_decode(file_get_contents("php://input"));
        if(isset($data)){
            $adminId = $data;
            $sql = "DELETE FROM user WHERE userID = :userId";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':userId', $adminId);

            if ($stmt->execute()) {
                $response = ['status' => 1, 'message' => 'User deleted successfully'];
            } else {
                $response = ['status' => 0, 'message' => 'Error deleting user'];
            }
        } else {
            $response = ['status' => 0, 'message' => 'Username not provided'];
        }
        header('Content-Type: application/json');
        echo json_encode($response);
        break;
    // default:
    //     http_response_code(405); // Method Not Allowed
    //     echo 'Invalid request method';
}

// Close the database connection
$conn = null;

?>