from Integration.DAO import DAO

class UserDAO(DAO):

    def find_by_id(self, id):
        self.cursor.execute("SELECT * FROM [User] WHERE Id = %s", id)
        return self.cursor.fetchone()
    
    def create(self, id):
        self.cursor.execute("INSERT INTO [User] (Id) VALUES (%s)", id)
        self.connection.commit()