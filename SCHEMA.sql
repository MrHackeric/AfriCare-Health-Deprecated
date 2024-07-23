-- This file has the database set up for mysql
-- You shoukd have mysql2 installed as a dependancy
CREATE  DATABASE `africare`;
USE `africare`;

CREATE TABLE `users`(
id INT AUTO_INCREMENT PRIMARY KEY,
`name` VARCHAR(255) NOT NULL UNIQUE,
`email` VARCHAR(255) NOT NULL UNIQUE,
`password` VARCHAR(255) NOT NULL	
);