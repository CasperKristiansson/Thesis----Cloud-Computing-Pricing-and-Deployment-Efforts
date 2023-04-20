USE [amaceit-ticket-system];

CREATE TABLE [User] (
    Id VARCHAR(36) PRIMARY KEY DEFAULT NEWID(),
    Name VARCHAR(500) NOT NULL,
    Email VARCHAR(500) NOT NULL,
    Password VARCHAR(16) NOT NULL,
    Role VARCHAR(10) NOT NULL
);

