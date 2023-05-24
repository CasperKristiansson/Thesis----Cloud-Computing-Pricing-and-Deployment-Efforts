import logging
from Integration.DAO import DAO

class TicketDAO(DAO):

    def find_by_id(self, id):
        self.cursor.execute(
            'SELECT [Ticket].*, Assigned.Name, Creator.Name, [Project].Name FROM [Ticket] LEFT OUTER JOIN [User] as Assigned ON Assigned.Id = [Ticket].AssignedId LEFT OUTER JOIN [User] as Creator ON Creator.Id = [Ticket].CreatorId INNER JOIN [Project] ON [Project].Id = [Ticket].ProjectId WHERE [Ticket].Id = %s', id
        )
        result = self.cursor.fetchone()

        return {
            'id': result[0],
            'projectId': result[1],
            'creatorId': result[2],
            'title': result[3],
            'description': result[4],
            'priority': result[5],
            'status': result[6],
            'assignedId': result[7],
            'lastUpdated': result[8],
            'assignedName': result[9],
            'creatorName': result[10],
            'projectName': result[11]
        }

    def find_all_by_project_id(self, project_id):
        self.cursor.execute(
            'SELECT [Ticket].*, [User].Name FROM [Ticket] INNER JOIN [User] ON [User].Id = [Ticket].AssignedId WHERE ProjectId = %s', project_id
        )
        result = self.cursor.fetchall()

        return self.__format_tickets(result)
    
    def find_all(self):
        self.cursor.execute(
            'SELECT [Ticket].*, [User].Name FROM [Ticket] INNER JOIN [User] ON [User].Id = [Ticket].AssignedId'
        )

        result = self.cursor.fetchall()

        return self.__format_tickets(result)

    
    def find_all_by_creator_id_and_user_assignee(self, user_id):
        self.cursor.execute(
            'SELECT [Ticket].*, [User].Name FROM [Ticket] INNER JOIN [User] ON [User].Id = [Ticket].AssignedId WHERE [Ticket].AssignedId = %s OR [Ticket].CreatorId = %s', (user_id, user_id)
        )

        result = self.cursor.fetchall()

        return self.__format_tickets(result)
    
    def create(self, title, priority, assigned_id, project_id, description, status, creator_id):
        self.cursor.execute(
            'INSERT INTO [Ticket] (Title, Priority, AssignedId, ProjectId, Description, Status, CreatorId) VALUES (%s, %s, %s, %s, %s, %s, %s)', (title, priority, assigned_id, project_id, description, status, creator_id)
        )
        self.connection.commit()

    def edit_status(self, id, status):
        self.cursor.execute(
            'UPDATE [Ticket] SET Status = %s WHERE Id = %s', (status, id)
        )
        self.connection.commit()

    def delete(self, id):
        # Delete comments
        self.cursor.execute(
            'DELETE FROM [TicketComment] WHERE TicketId = %s', id
        )
        # Delete ticket
        self.cursor.execute(
            'DELETE FROM [Ticket] WHERE Id = %s', id
        )
        self.connection.commit()

    def edit(self, ticket_id, title, description, priority, assigned_id, project_id):
        self.cursor.execute(
            'UPDATE [Ticket] SET Title = %s, Description = %s, Priority = %s, AssignedId = %s, ProjectId = %s, LastUpdated = GETDATE() WHERE Id = %s', (title, description, priority, assigned_id, project_id, ticket_id)
        )
        self.connection.commit()

    def __format_tickets(self, result):
        tickets = []
        for ticket in result:
            tickets.append({
                'id': ticket[0],
                'projectId': ticket[1],
                'creatorId': ticket[2],
                'title': ticket[3],
                'description': ticket[4],
                'priority': ticket[5],
                'status': ticket[6],
                'assignedId': ticket[7],
                'lastUpdated': ticket[8],
                'assignedName': ticket[9]
            })
        return tickets