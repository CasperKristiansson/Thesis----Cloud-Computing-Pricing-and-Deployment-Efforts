from Integration.DAO import DAO

class CompanyDAO(DAO):
    
    def find_all(self):
        self.cursor.execute(
            'SELECT * FROM [Company]'
        )

        result = self.cursor.fetchall()

        return self.__format_companies(result)
    
    def find_by_id(self, id):
        self.cursor.execute(
            'SELECT * FROM [Company] WHERE Id = %s', id
        )

        result = self.cursor.fetchone()

        return {
            'id': result[0],
            'name': result[1],
            'email': result[2],
            'contactPersonName': result[3]
        }
    
    def delete(self, id):

        #Delete all ticket comments
        self.cursor.execute(
            'DELETE FROM [TicketComment] WHERE TicketId IN (SELECT Id FROM [Ticket] WHERE ProjectId IN (SELECT Id FROM [Project] WHERE CompanyId = %s))', id
        )

        #Delete all tickets
        self.cursor.execute(
            'DELETE FROM [Ticket] WHERE ProjectId IN (SELECT Id FROM [Project] WHERE CompanyId = %s)', id
        )

        #Delete all project comments
        self.cursor.execute(
            'DELETE FROM [ProjectComment] WHERE ProjectId IN (SELECT Id FROM [Project] WHERE CompanyId = %s)', id
        )

        #Delete all projects
        self.cursor.execute(
            'DELETE FROM [Project] WHERE CompanyId = %s', id
        )

        # Set company id to null for all users in the company
        self.cursor.execute(
            'UPDATE [User] SET CompanyId = NULL WHERE CompanyId = %s', id
        )

        # Delete company
        self.cursor.execute(
            'DELETE FROM [Company] WHERE Id = %s', id
        )

        self.connection.commit()

    def create(self, name, email, contact_person_name):
        self.cursor.execute(
            'INSERT INTO [Company] (Name, Email, ContactPersonName) VALUES (%s, %s, %s)',
            (name, email, contact_person_name)
        )

        self.connection.commit()
    
    def __format_companies(self, result):
        companies = []
        for company in result:
            companies.append({
                'id': company[0],
                'name': company[1],
                'email': company[2],
                'contactPersonName': company[3]
            })
        return companies