<?php

class ReviewController
{
    private $gateway;
    /**
     * @param gateway the gateway that interfaces between the database and this controller
     */
    public function __construct(ReviewGateway $gateway)
    {
        $this->gateway = $gateway;
    }
    /**
     * handles which process Request should be used
     * @param method the http method used for this request
     * @param id the resource id if there is one
     */
    public function processRequest(string $method, string $id)
    {
        if($id == '-1'){ //Id is -1 if there is no resource id specified, the database is set up such that the first id is 1, if there is no resouce id then the request is a collection request
            $this->processCollectionRequest($method);
        } else {
            $this->processResourceRequest($method, $id);
        }
    }
    /**
     * @param method the http method that should be used
     * @param id the id of the resource being requested
     */
    private function processResourceRequest(string $method, string $id)
    {   
        $review = $this->gateway->get($id);
        if(!$review){
            http_response_code(404);
            echo json_encode(["message" => "Review Not Found"]);
            return;
        }
        switch($method){
            case "GET":
                echo json_encode($review);
                break;
            case "PATCH":
                $data = (array) json_decode(file_get_contents("php://input"), true);
                if (! empty($errors)){
                    http_response_code(422);
                    echo json_encode(["errors" => $errors]);
                    break;
                }
                $row = $this->gateway->update($review, $data);

                echo json_encode([
                    "message" => "Review $id updated",
                    "id" => $row
                ]);
                break;
            case "DELETE":
                $rows = $this->gateway->delete($id);

                echo json_encode([
                    "message" => "Review $id deleted",
                    "rows" => $rows
                ]);
                break;
            default:
                http_response_code(405);
                header("Allow: GET, PATCH, DELETE");
        }
    }
    /**
     * @param method the method being used in the http request
     */
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
                    "message" => "Review Created",
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