<?php

class WineController
{
    private $gateway;

    public function __construct(WineGateway $gateway)
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

    public function csvToArrayIndividual($wine){
        $attributes = $wine["attributes"];
        $attribute_array = explode(',',$attributes);
        $wine["attributes"] = $attribute_array;
        return $wine;
    }

    public function csvToArrayArray($wineArray){
        $resArray = [];
        foreach($wineArray as $wine){
            $resArray[] = $this->csvToArrayIndividual($wine);
        }
        return $resArray;
    }

    private function processResourceRequest(string $method, string $id)
    {   
        $wine = $this->gateway->get($id);
        if(str_starts_with($id, 'filtered')){
            $wine = 1;
        }
        if(!$wine){
            http_response_code(404);
            echo json_encode(["message" => "Wine Not Found"]);
            return;
        }
        switch($method){
            case "GET":
                $wine = $this->csvToArrayIndividual($wine);
                echo json_encode($wine);
                break;
            case "POST":
                $data = (array) json_decode(file_get_contents("php://input"), true);
                $wines = $this->gateway->getFiltered($data);
                $wines = $this->csvToArrayIndividual($wine);
                echo json_encode($wines);
                break;
            case "PATCH":
                $data = (array) json_decode(file_get_contents("php://input"), true);
                if (! empty($errors)){
                    http_response_code(422);
                    echo json_encode(["errors" => $errors]);
                    break;
                }
                $row = $this->gateway->update($wine, $data);

                echo json_encode([
                    "message" => "Wine $id updated",
                    "id" => $row
                ]);
                break;
            case "DELETE":
                $rows = $this->gateway->delete($id);

                echo json_encode([
                    "message" => "Wine $id deleted",
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
                echo json_encode($this->csvToArrayArray($this->gateway->getAll()));
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
                    "message" => "Wine Created",
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


        // if(empty($data["username"])){
        //     $errors[] = "username is required";
        // }


        // How to check if a value is an integer
        // if(array_key_exists("key", $data)) {
        //     if(filter_var($data["size"], FILTER_VALIDATE_INT) === false){
        //         $errors[] = "key must be an integer";
        //     }
        // }

        return $errors;
    }
}