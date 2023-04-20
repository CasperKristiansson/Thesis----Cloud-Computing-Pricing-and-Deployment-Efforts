from DAO import DAO

class UserDAO(DAO):

    def find_user_by_id(self, id):
        cursor = self.connection.cursor(as_dict=True)
        cursor.execute("SELECT * FROM [User] WHERE Id = %s", id)
        return cursor.fetchone()