<?php
    # Preflight Check
    if (isset($_SERVER['HTTP_ORIGIN'])){
        header("Access-Control-Allow-Origin: *"); # Allow all external connections
        header("Access-Control-Max-Age: 60"); # Keep connections open for 1 minute
        
        # Check if a site is requesting access to the site:
        if ($_SERVER["REQUEST_METHOD"] === "OPTIONS"){
            header("Access-Control-Allow-Methods: POST, OPTIONS"); # Only allow these kinds of connections
            header("Access-Control-Allow-Headers: Authorization, Content-Type, Accept, Origin, cache-control");
            http_response_code(200); # Report that they are good to make their request now
            die; # Quit here until they send a followup!
        }
    }
    #Database Connection
    $connection_string = "host=db.nsnoztviefjxvptztmnj.supabase.co dbname=postgres user=postgres password=#bisdakids5";
    $dbconnect = pg_connect($connection_string);

    #If database connect attempt failed
    if (!$dbconnect) {
        print_response([], "db_connection_error");
        die;
    }
    #If command is empty
    if (!isset($_REQUEST['command']) or $_REQUEST['command'] === null){
        echo "{\"error\" : \"missing_command\"}";
        die;
    }
    #If data is missing
    if (!isset($_REQUEST['data']) or $_REQUEST['data'] === null){
        echo "{\"error\" : \"missing_data\"}";
        die;
    }
    #Receive and validate JSON from Godot
    $json = json_decode($_REQUEST['data'], true);
    if ($json === null){
        print_response([], "invalid_json");
        die;
    }
    // $json['user_id'] = 789512314;
    // // $json['item_id'] = 3;
    // $json['quantity'] = 15;
    $user_id = $json['user_id'];
    switch ($_REQUEST['command']){
        case "get_user_inventory":
            if (!isset($json['user_id'])){
                print_response([],"get user inventory requires user_id, received none");
                die;
            }
            $query = "SELECT item_id, quantity FROM user_inventory WHERE user_id = $user_id";
            $result = pg_query($dbconnect, $query);
            $data = pg_fetch_all($result, PGSQL_ASSOC);                        
            $data['size'] = sizeof($data);
            print_response($data);
            die;
        case "add_user_inventory":
            if (!isset($json['item_id']) or !isset($json['quantity'])){
                print_response([],"add user inventory requires item_id and quantity");
                die;
            }
            $item_id = $json['item_id'];
            $quantity = $json['quantity'];
            $query = <<<PGQUERY
            insert into
            user_inventory (user_id, item_id, quantity)
            values ($user_id, $item_id, $quantity)
            on conflict (user_id, item_id) do
            update set quantity = quantity + excluded.quantity
            where user_inventory.user_id = excluded.user_id and user_inventory.item_id = excluded.item_id 
            PGQUERY;
            $result = pg_query($dbconnect, $query);
            $data['query'] = "successfully added";
            print_response($data);
            die;
        case "buy_item":
            if (!isset($json['item_id']) or !isset($json['quantity'])){
                print_response([],"buy item requires item_id and quantity");
                die;
            }
            die;
        default:
            print_response([], "unknown_command");
            die;
    } # end of switch case

    function print_response($dictionary = [], $error = "none"){
        $string = "{\"error\" : \"$error\", \"command\" : \"$_REQUEST[command]\", \"response\" : ".json_encode($dictionary) ."}";
        if ($error != "none")
            $string = "{\"error\" : \"$error\", \"command\" : \"$_REQUEST[command]\"}";
        echo $string; # dictionary

        /* Parse the JSON data into a PHP array
        $data = json_decode($string, true);

        // Check if JSON decoding was successful
        if ($data !== null) {
            // Access the "response" part of the data
            $response = $data['response'];

            // Loop through each item in the response
            foreach ($response as $item) {
                // Access the item_id and quantity for each item
                $item_id = $item['item_id'];
                $quantity = $item['quantity'];

                // Display the item details
                echo "Item ID: $item_id, Quantity: $quantity<br>";
            }
        } else {
            echo "Failed to decode JSON data.";
        } */
    }

    # /BisdaKids_Admin/backend/api-request.php?command=get_user_inventory&data={"user_id"%3A824655} (command to get_user_inventory)
    # html url encoding:
    # %7B = {
    # %7D = }
    # %3A = :
    # %3B = ;
?>