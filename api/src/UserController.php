<?php

class UserController
{
    private $gateway;

    public function __construct(UserGateway $gateway)
    {
        $this->gateway = $gateway;
    }
    public function processRequest(string $method, string $id)
    {
        if($id == '-1'){
            $this->processCollectionRequest($method);
        } else {
            $this->processResourceRequest($method, $id);
        }
    }

    private function processResourceRequest(string $method, string $id)
    {   
        $user = $this->gateway->get($id);
        if(!$user){
            http_response_code(404);
            echo json_encode(["message" => "User Not Found"]);
            return;
        }
        switch($method){
            case "GET":
                echo json_encode($user);
                break;
            case "PATCH":
                $data = (array) json_decode(file_get_contents("php://input"), true);
                if (! empty($errors)){
                    http_response_code(422);
                    echo json_encode(["errors" => $errors]);
                    break;
                }
                $row = $this->gateway->update($user, $data);

                echo json_encode([
                    "message" => "User $id updated",
                    "id" => $row
                ]);
                break;
            case "DELETE":
                $rows = $this->gateway->delete($id);

                echo json_encode([
                    "message" => "User $id deleted",
                    "rows" => $rows
                ]);
                break;
            default:
                http_response_code(405);
                header("Allow: GET, PATCH, DELETE");
        }
    }
    private function processCollectionRequest(string $method)
    {
        switch($method){
            case "GET":
                echo json_encode($this->gateway->getAll());
                break;
            case "POST":
                $data = (array) json_decode(file_get_contents("php://input"), true);
                $errors = $this->getValidationErrors($data);

                if (! empty($errors)){
                    http_response_code(422);
                    echo json_encode(["errors" => $errors]);
                    break;
                }
                $id = $this->gateway->create($data);

                http_response_code(201);
                echo json_encode([
                    "message" => "User Created",
                    "id" => $id
                ]);
                break;
            default:
                http_response_code(405);
                header("Allow: GET, POST");
        }
    }

    private function getValidationErrors(array $data){
        $errors = [];


        if(empty($data["username"])){
            $errors[] = "username is required";
        }


        // How to check if a value is an integer
        // if(array_key_exists("key", $data)) {
        //     if(filter_var($data["size"], FILTER_VALIDATE_INT) === false){
        //         $errors[] = "key must be an integer";
        //     }
        // }

        return $errors;
    }
}
