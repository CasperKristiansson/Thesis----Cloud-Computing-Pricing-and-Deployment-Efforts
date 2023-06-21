from Integration.DAO import DAO

class UserDAO(DAO):

    def find_all(self):
        self.cursor.execute("SELECT * FROM [User]")
        result = self.cursor.fetchall()
        return self.__format_users(result)
    
    def find_all_admins(self):
        self.cursor.execute("SELECT * FROM [User] WHERE Role = 'ADMIN'")
        result = self.cursor.fetchall()
        return self.__format_users(result)

    def find_by_id(self, id):
        self.cursor.execute("SELECT * FROM [User] WHERE Id = %s", id)
        return self.cursor.fetchone()
    
    def create(self, id, role, email, name):
        self.cursor.execute("INSERT INTO [User] (Id, Role, Email, Name) VALUES (%s, %s, %s, %s)", (id, role, email, name))
        self.connection.commit()

    def update_company(self, id, companyId):
        self.cursor.execute("UPDATE [User] SET CompanyId = %s WHERE Id = %s", (companyId, id))
        self.connection.commit()

    def update_last_login(self, id):
        self.cursor.execute("UPDATE [User] SET LastLogin = GETDATE() WHERE Id = %s", id)
        self.connection.commit()

    def update_role(self, id, role):
        self.cursor.execute("UPDATE [User] SET Role = %s WHERE Id = %s", (role, id))
        self.connection.commit()

    def delete(self, id):
        # Disable fk constraints
        self.cursor.execute("ALTER TABLE [Project] NOCHECK CONSTRAINT ALL")
        self.cursor.execute("ALTER TABLE [Ticket] NOCHECK CONSTRAINT ALL")

        # Delete project comments
        self.cursor.execute("DELETE FROM [ProjectComment] WHERE UserId = %s", id)

        # Delete ticket comments
        self.cursor.execute("DELETE FROM [TicketComment] WHERE UserId = %s", id)

        self.cursor.execute("DELETE FROM [User] WHERE Id = %s", id)

        self.cursor.execute("ALTER TABLE [Project] WITH CHECK CHECK CONSTRAINT ALL")
        self.cursor.execute("ALTER TABLE [Ticket] WITH CHECK CHECK CONSTRAINT ALL")
        self.connection.commit()

    def __format_users(self, result):
        users = []
        for user in result:
            users.append({
                "id": user[0],
                "role": user[1],
                "companyId": user[2],
                "lastLogin": user[3],
                "created": user[4],
                "email": user[5],
                "name": user[6]
            })
        return users