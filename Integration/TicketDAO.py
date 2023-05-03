from Integration.DAO import DAO

class TicketDAO(DAO):

    def find_all_by_project_id(self, project_id):
        self.cursor.execute(
            'SELECT * FROM [Ticket] WHERE ProjectId = %s', project_id
        )
        result = self.cursor.fetchall()

        return self.__format_tickets(result)
    
    def find_all(self):
        self.cursor.execute(
            'SELECT * FROM [Ticket]'
        )

        result = self.cursor.fetchall()

        return self.__format_tickets(result)

    
    def find_all_by_creator_id_and_user_assignee(self, user_id):
        self.cursor.execute(
            'SELECT * FROM [Ticket] WHERE Id = (SELECT TicketId FROM [TicketAssignee] WHERE UserId = %s) OR CreatorId = %s', (user_id, user_id)
        )

        result = self.cursor.fetchall()

        return self.__format_tickets(result)
    
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
            })
        return tickets