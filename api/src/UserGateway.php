<?php

class UserGateway
{
    private $conn;
    public function __construct(Database $database)
    {
        $this->conn = $database->getConnection();
    }

    public function getAll()
    {
        $sql = "SELECT *
                FROM users";
        $stmt = $this->conn->query($sql);

        $data = [];

        while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
            $data[] = $row;
        }

        return $data;

    }

    public function create(array $data)
    {
        $sql = "INSERT INTO users(username, email, password, google_uuid)
                VALUES (:username, :email, :password, :google_uuid)";
        $stmt = $this->conn->prepare($sql);

        $date = date('Y-m-d');
        $stmt->bindValue(":username", $data["username"]);
        $stmt->bindValue(":email", $data["email"]);
        $stmt->bindValue(":password", $data["password"]);
        $stmt->bindValue(":google_uuid", $data["google_uuid"]);

        $stmt->execute();

        return $this->conn->lastInsertId();

    }

    public function get($id)
    {
        $sql = "SELECT *
                FROM users
                WHERE id = :id";
        
        $stmt = $this->conn->prepare($sql);

        $stmt->bindValue(":id", $id);

        $stmt->execute();

        $data = $stmt->fetch(PDO::FETCH_ASSOC);

        return $data;
    }

    public function getByEmail($id)
    {
        $sql = "SELECT *
                FROM users
                WHERE email = :id";
        $stmt = $this->conn->prepare($sql);

        $stmt->bindValue(":id", $id);

        $stmt->execute();

        $data = $stmt->fetch(PDO::FETCH_ASSOC);

        return $data;
    }

    function update($current, $new){
        $sql = "UPDATE users
                SET username = :username, email = :email, password = :password, google_uuid = :google_uuid
                WHERE id = :id";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindValue(":username", $new["username"] ?? $current["username"]);
        $stmt->bindValue(":email", $new["email"] ?? $current["email"]);
        $stmt->bindValue(":password", $new["password"] ?? $current["password"]);
        $stmt->bindValue(":google_uuid", $new["google_uuid"] ?? $current["google_uuid"]);

        $stmt->bindValue(":id", $current["id"]);

        $stmt->execute();
        return $stmt->rowCount();

    }

    function delete($id){
        $sql = "DELETE FROM users
                WHERE id = :id";
        $stmt = $this->conn->prepare($sql);

        $stmt->bindValue(":id", $id);

        $stmt->execute();

        return $stmt->rowCount();
    }

}