USE [amaceit-ticket-system];

CREATE TABLE [User] (
    Id VARCHAR(36) PRIMARY KEY DEFAULT NEWID(),
    Role VARCHAR(10) DEFAULT 'USER'
);

CREATE TABLE [Project] (
    Id VARCHAR(36) PRIMARY KEY DEFAULT NEWID(),
    Name VARCHAR(500) NOT NULL,
    Description VARCHAR(500) NOT NULL,
    CompanyName VARCHAR(500) NOT NULL
);

CREATE TABLE [ProjectUser] (
    ProjectId VARCHAR(36) NOT NULL,
    UserId VARCHAR(36) NOT NULL,
    PRIMARY KEY (ProjectId, UserId),
    FOREIGN KEY (ProjectId) REFERENCES [Project](Id),
    FOREIGN KEY (UserId) REFERENCES [User](Id)
);

CREATE TABLE [Ticket] (
    Id VARCHAR(36) PRIMARY KEY DEFAULT NEWID(),
    ProjectId VARCHAR(36) NOT NULL,
    CreatorId VARCHAR(36) NOT NULL,
    Title VARCHAR(500) NOT NULL,
    Description VARCHAR(500) NOT NULL,
    Priority VARCHAR(500) NOT NULL,
    Status VARCHAR(500) NOT NULL,
    FOREIGN KEY (ProjectId) REFERENCES [Project](Id),
    FOREIGN KEY (CreatorId) REFERENCES [User](Id)
);

CREATE TABLE [TicketAssignee] (
    TicketId VARCHAR(36) NOT NULL,
    UserId VARCHAR(36) NOT NULL,
    PRIMARY KEY (TicketId, UserId),
    FOREIGN KEY (TicketId) REFERENCES [Ticket](Id),
    FOREIGN KEY (UserId) REFERENCES [User](Id)
);

CREATE TABLE [TicketComment] (
    Id VARCHAR(36) PRIMARY KEY DEFAULT NEWID(),
    TicketId VARCHAR(36) NOT NULL,
    UserId VARCHAR(36) NOT NULL,
    Comment VARCHAR(500) NOT NULL,
    FOREIGN KEY (TicketId) REFERENCES [Ticket](Id),
    FOREIGN KEY (UserId) REFERENCES [User](Id)
);
