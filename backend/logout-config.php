<?php 

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
session_start();

// Handle the logout request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Clear the session data
    session_destroy();

    // Respond with a success message
    echo json_encode(['status' => 1, 'message' => 'Logout successful']);
} else {
    // Respond with an error message if the request method is not POST
    echo json_encode(['status' => 0, 'message' => 'Invalid request']);
}

?>