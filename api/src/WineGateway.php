<?php

class WineGateway
{
    private $conn;
    public function __construct(Database $database)
    {
        $this->conn = $database->getConnection();
    }

    public function getAll()
    {
        $sql = "SELECT *
                FROM wines";
        $stmt = $this->conn->query($sql);

        $data = [];

        while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
            $data[] = $row;
        }

        return $data;

    }

    public function create(array $data)
    {
        $sql = "INSERT INTO wines(price, name, region, province, country, variety, winery, color, attributes)
                VALUES (:price, :name, :region, :province, :country, :variety, :winery, :color, :attributes)";
        $stmt = $this->conn->prepare($sql);

        $stmt->bindValue(":price", $data["price"]);
        $stmt->bindValue(":name", $data["name"]);
        $stmt->bindValue(":region", $data["region"]);
        $stmt->bindValue(":province", $data["province"]);
        $stmt->bindValue(":country", $data["country"]);
        $stmt->bindValue(":variety", $data["variety"]);
        $stmt->bindValue(":winery", $data["winery"]);
        $stmt->bindValue(":color", $data["color"]);
        $stmt->bindValue(":attributes", $data["attributes"]);

        $stmt->execute();

        return $this->conn->lastInsertId();

    }

    public function get($id)
    {
        $sql = "SELECT *
                FROM wines
                WHERE id = :id";
        
        $stmt = $this->conn->prepare($sql);

        $stmt->bindValue(":id", $id);

        $stmt->execute();

        $data = $stmt->fetch(PDO::FETCH_ASSOC);

        return $data;
    }

    public function getFiltered($id){
        $sql = "SELECT * FROM wines WHERE ";
        $keys = array_keys($id);
        foreach($keys as $key){
            if(strlen($key) > 0){
                $sql .= "$key = :$key AND ";
            }
        }
        $sql = substr($sql, 0, strlen($sql) - 5);
        $stmt = $this->conn->prepare($sql);
        foreach($keys as $key){
            if(strlen($key) > 0){
                $stmt->bindValue(":$key", $id[$key]);
            }
        }
        $stmt->execute();

        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return $data;
    }

    function update($current, $new){
        $sql = "UPDATE wines
                SET price = :price, name = :name, region = :region, province = :province, country = :country, variety = :variety, winery = :winery, color = :color, attributes = :attributes
                WHERE id = :id";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindValue(":price", $new["price"] ?? $current["price"]);
        $stmt->bindValue(":name", $new["name"] ?? $current["name"]);
        $stmt->bindValue(":region", $new["region"] ?? $current["region"]);
        $stmt->bindValue(":province", $new["province"] ?? $current["province"]);
        $stmt->bindValue(":country", $new["country"] ?? $current["country"]);
        $stmt->bindValue(":variety", $new["variety"] ?? $current["variety"]);
        $stmt->bindValue(":winery", $new["winery"] ?? $current["winery"]);
        $stmt->bindValue(":attributes", $new["attributes"] ?? $current["attributes"]);
        $stmt->bindValue(":color", $new["color"] ?? $current["color"]);
        $stmt->bindValue(":id", $current["id"]);

        $stmt->execute();
        return $stmt->rowCount();

    }

    function delete($id){
        $sql = "DELETE FROM wines
                WHERE id = :id";
        $stmt = $this->conn->prepare($sql);

        $stmt->bindValue(":id", $id);

        $stmt->execute();

        return $stmt->rowCount();
    }

}