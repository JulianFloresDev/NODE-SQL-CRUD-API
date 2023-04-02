CREATE DATABASE IF NOT EXISTS SQLPractice;

USE SQLPractice;

CREATE TABLE IF NOT EXISTS `users` (
    `id` INT NOT NULL,
    `name` VARCHAR(45) NULL,
    `email` VARCHAR(45) NULL,
    `password` VARCHAR(45) NULL,
    PRIMARY KEY (`id`)
);

SHOW tables;

DESCRIBE users;