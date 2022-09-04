DROP DATABASE IF EXISTS playlistInquirer_db;
CREATE DATABASE playlistInquirer_db;

USE playlistInquirer_db;

CREATE TABLE user (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(45) NOT NULL
);

CREATE TABLE song (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    song_name VARCHAR(45) NOT NULL UNIQUE,
    artist VARCHAR(45) NOT NULL,
    genre VARCHAR(30),
    user_id INT,
    FOREIGN KEY (user_id)
    REFERENCES user(id)
    ON DELETE SET NULL
);