<?php

/*
    The purpose of index.php is to act as the mediator between the functionality of api and the users.
    Through the use of a .htaccess file all http requests that go to the api folder will be sent to this fille.
    based on everything after the /api in the url will depend on which endpoint will be used, an endpoint consists of this file in addition to a controller and a gateway.
    This file is shared between all endpoints the if statements at the end are the directors to the controllers.
*/

spl_autoload_register(function ($class){ //This Function loads classes from files in the src folder, it does this automatically so you don't have to main use require()
    require __DIR__ . "/src/$class.php";
});

set_error_handler("ErrorHandler::handleError");
set_exception_handler("ErrorHandler::handleException");

header("Content-type: application/json; charset=UTF-8");
$parts = explode('/', $_SERVER['REQUEST_URI']); //Turns a string into an array similar to other langauges split methods the expected parts are api/endpoint/resourceId if applicable


if ($parts[2] != "user" && $parts[2] != "wine" && $parts[2] != "review"){
    http_response_code(404);
    exit;
}

$id = $parts[3] ?? "-1";

$database = new Database("localhost", "iwine", "root", "");
$database->getConnection();

if(str_starts_with($parts[2], "user")){
    $userGateway = new UserGateway($database);
    $controller = new UserController($userGateway);

    $controller->processRequest($_SERVER['REQUEST_METHOD'], $id);
}
if(str_starts_with($parts[2], "wine")){
    $wineGateway = new WineGateway($database);
    $controller = new WineController($wineGateway);

    $controller->processRequest($_SERVER['REQUEST_METHOD'], $id);
}
if(str_starts_with($parts[2], "review")){
    $reviewGateway = new ReviewGateway($database);
    $controller = new ReviewController($reviewGateway);

    $controller->processRequest($_SERVER['REQUEST_METHOD'], $id);
}
