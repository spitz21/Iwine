<?php

class ReviewGateway
{
    private $conn;
    public function __construct(Database $database)
    {
        $this->conn = $database->getConnection();
    }

    public function getAll()
    {
        $sql = "SELECT *
                FROM reviews";
        $stmt = $this->conn->query($sql);

        $data = [];

        while($row = $stmt->fetch(PDO::FETCH_ASSOC)){ //Goes Through all results of the query and appends them to the result array, FETCH_ASSOC means that the results grabed are returned as an associative array
            $data[] = $row;
        }

        return $data;

    }

    public function create(array $data) //Create makes a new entry into the database, the data is an associative array derived from a json, this would corrospond to a collective post request
    {
        $sql = "INSERT INTO reviews(rating, reviewer, review_text, title, wine_id)
                VALUES (:rating, :reviewer, :review_text, :title, :wine_id)";
        $stmt = $this->conn->prepare($sql);

        $stmt->bindValue(":rating", $data["rating"]);
        $stmt->bindValue(":reviewer", $data["reviewer"]);
        $stmt->bindValue(":review_text", $data["review_text"]);
        $stmt->bindValue(":title", $data["title"]);
        $stmt->bindValue(":wine_id", $data["wine_id"]);

        $stmt->execute();

        return $this->conn->lastInsertId();

    }

    public function get($id)
    {
        $sql = "SELECT *
                FROM reviews
                WHERE id = :id";
        
        $stmt = $this->conn->prepare($sql);

        $stmt->bindValue(":id", $id);

        $stmt->execute();

        $data = $stmt->fetch(PDO::FETCH_ASSOC);

        return $data;
    }

    function update($current, $new){
        $sql = "UPDATE reviews
                SET rating = :rating, reviewer = :reviewer, review_text = :review_text, title = :title, wine_id = :wine_id
                WHERE id = :id";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindValue(":rating", $new["rating"] ?? $current["rating"]);
        $stmt->bindValue(":reviewer", $new["reviewer"] ?? $current["reviewer"]);
        $stmt->bindValue(":review_text", $new["review_text"] ?? $current["review_text"]);
        $stmt->bindValue(":title", $new["title"] ?? $current["title"]);
        $stmt->bindValue(":wine_id", $new["wine_id"] ?? $current["wine_id"]);

        $stmt->bindValue(":id", $current["id"]);

        $stmt->execute();
        return $stmt->rowCount();

    }

    function delete($id){
        $sql = "DELETE FROM reviews
                WHERE id = :id";
        $stmt = $this->conn->prepare($sql);

        $stmt->bindValue(":id", $id);

        $stmt->execute();

        return $stmt->rowCount();
    }

}