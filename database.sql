USE [amaceit-ticket-system];

CREATE TABLE [user] (
    id VARCHAR(36) PRIMARY KEY DEFAULT NEWID(),
    name VARCHAR(500) NOT NULL,
    email VARCHAR(500) NOT NULL,
    password VARCHAR(16) NOT NULL,
    role VARCHAR(10) NOT NULL
);

