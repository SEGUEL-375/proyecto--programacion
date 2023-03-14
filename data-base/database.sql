CREATE DATABASE banco;

USE banco;

CREATE TABLE usuarios (
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(180),
    email VARCHAR(50),
    password VARCHAR(30),
    date_joined  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE transacciones (
    id_transaccion INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    origen VARCHAR(50) NOT NULL,
    destino VARCHAR(50) NOT NULL,
    cantidad VARCHAR(50) NOT NULL,
    fecha_realizada VARCHAR(50) NOT NULL
);




RENAME TABLE transaccion to transacciones;

DESCRIBE usuarios;

