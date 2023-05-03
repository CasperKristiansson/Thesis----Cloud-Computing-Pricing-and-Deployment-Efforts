from Integration.DAO import DAO

class UserDAO(DAO):

    def find_by_id(self, id):
        self.cursor.execute("SELECT * FROM [User] WHERE Id = %s", id)
        return self.cursor.fetchone()
    
    def create(self, id, role):
        self.cursor.execute("INSERT INTO [User] (Id, Role) VALUES (%s, %s)", (id, role))
        self.connection.commit()

    def update_company(self, id, companyId):
        self.cursor.execute("UPDATE [User] SET CompanyId = %s WHERE Id = %s", (companyId, id))
        self.connection.commit()