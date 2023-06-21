from Integration.DAO import DAO

class TicketCommentDAO(DAO):

    # Find all bu ticket id
    def find_all_by_ticket_id(self, ticket_id):
        self.cursor.execute(
            'SELECT [TicketComment].*, [User].Name FROM [TicketComment] INNER JOIN [User] ON [User].Id = [TicketComment].UserId WHERE [TicketComment].TicketId = %s', ticket_id
        )
        result = self.cursor.fetchall()

        return self.__format_ticket_comments(result)
    
    # Create ticket comment
    def create(self, ticket_id, user_id, comment):
        self.cursor.execute(
            'INSERT INTO [TicketComment] (TicketId, UserId, Comment) VALUES (%s, %s, %s)', (ticket_id, user_id, comment)
        )
        self.connection.commit()

    def __format_ticket_comment(self, result):
        return {
            'id': result[0],
            'ticketId': result[1],
            'userId': result[2],
            'comment': result[3],
            'time': result[4],
            'name': result[5]
        }
    
    # Private format ticket comments function
    def __format_ticket_comments(self, result):
        ticket_comments = []
        for t in result:
            ticket_comments.append({
                'id': t[0],
                'ticketId': t[1],
                'userId': t[2],
                'comment': t[3],
                'time': t[4],
                'name': t[5]
            })

        return ticket_comments
