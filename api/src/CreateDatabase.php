<?php
    require("Database.php");
    $database = new Database("localhost","iwine", "root", "");
    $conn = $database->getConnection();
    $conn->exec('        
        DROP TABLE IF EXISTS iWine.wine_lists;    
        DROP TABLE IF EXISTS iWine.reviews;    
        DROP TABLE IF EXISTS iWine.users;
        DROP TABLE IF EXISTS iWine.wines; 
        ');
    $conn->exec('CREATE TABLE iwine.users(
        id INT AUTO_INCREMENT,
        username varchar(50) UNIQUE NOT NULL,
        email varchar(255) UNIQUE NOT NULL,
        password varchar(255) NOT NULL,
        google_uuid varchar(255) UNIQUE,
        INDEX(username),
        INDEX(google_uuid),
        PRIMARY KEY(id)
    )');
    $conn->exec('CREATE TABLE iwine.wines(
        id INT AUTO_INCREMENT,
        price INT,
        name varchar(255),
        region varchar(255),
        province varchar(255),
        country varchar(255),
        variety varchar(255),
        winery varchar(255),
        color varchar(255),
        attributes LONGTEXT,
        INDEX(region),
        INDEX(variety),
        PRIMARY KEY(id))'
    );
    $conn->exec('CREATE TABLE iwine.reviews(
        id INT AUTO_INCREMENT,
        rating DOUBLE NOT NULL,
        reviewer varchar(255) NOT NULL,
        review_text LONGTEXT NOT NULL,
        title varchar(255) NOT NULL,
        wine_id INT,
        PRIMARY KEY(id),
        FOREIGN KEY(wine_id)
            REFERENCES wines(id)
            ON UPDATE CASCADE ON DELETE CASCADE
    )');
    $conn->exec('CREATE TABLE iWine.wine_lists(
        id INT AUTO_INCREMENT,
        wines LONGTEXT NOT NULL,
        user_id INT,
        last_modified DATE NOT NULL,
        PRIMARY KEY(id),
        FOREIGN KEY(user_id)
            REFERENCES users(id)
            ON UPDATE CASCADE ON DELETE CASCADE
            
    )');




