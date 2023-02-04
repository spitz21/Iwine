DROP DATABASE IF EXISTS iWine;
CREATE DATABASE iWine;

DROP TABLE IF EXISTS iWine.users;
DROP TABLE IF EXISTS iWine.wines;
DROP TABLE IF EXISTS iWine.reviews;
DROP TABLE IF EXISTS iWine.wine_lists;

CREATE TABLE iWine.users (
    id INT AUTO_INCREMENT,
    username varchar(50) UNIQUE NOT NULL,
    email varchar(255) UNIQUE NOT NULL,
    password varchar(255) NOT NULL,
    google_uuid varchar(255) UNIQUE,
    INDEX(username),
    INDEX(google_uuid),
    PRIMARY KEY(id)
);

CREATE TABLE iWine.wines(
    id INT AUTO_INCREMENT,
    price DOUBLE NOT NULL,
    name varchar(255) NOT NULL,
    region varchar(255) NOT NULL,
    province varchar(255) NOT NULL,
    country varchar(255) NOT NULL,
    variety varchar(255) NOT NULL,
    winery varchar(255) NOT NULL,
    color varchar(255) NOT NULL,
    attributes LONGTEXT NOT NULL,
    INDEX(region),
    PRIMARY KEY(id)
)

CREATE TABLE iWine.reviews(
    id INT AUTO_INCREMENT,
    rating DOUBLE NOT NULL,
    reviewer varchar(255) NOT NULL,
    review_text LONGTEXT NOT NULL,
    title varchar(255) NOT NULL,
    wine_id INT NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(wine_id) REFERENCES iWine.wines(id)
);

CREATE TABLE iWine.wine_lists(
    id INT AUTO_INCREMENT,
    wines LONGTEXT NOT NULL,
    user_id INT NOT NULL,
    last_modified DATE NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(user_id) REFERENCES iWine.users(id)
);
