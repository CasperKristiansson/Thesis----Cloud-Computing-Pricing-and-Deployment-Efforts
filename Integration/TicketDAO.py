from Integration.DAO import DAO

class TicketDAO(DAO):

    def find_all_by_project_id(self, project_id):
        self.cursor.execute(
            'SELECT * FROM [Ticket] WHERE ProjectId = %s', project_id
        )
        result = self.cursor.fetchall()

        if(result is None):
            return []

        tickets = []
        for t in result:
            tickets.append({
                'id': t[0],
                'projectId': t[1],
                'creatorId': t[2],
                'title': t[3],
                'description': t[4],
                'priority': t[5],
                'status': t[6],
            })

        return tickets