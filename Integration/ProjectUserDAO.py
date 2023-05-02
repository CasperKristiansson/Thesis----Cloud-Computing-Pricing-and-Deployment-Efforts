from Integration.DAO import DAO

class ProjectUserDAO(DAO):

    # NOT USED
    def find_all_by_user_id(self, user_id):
        self.cursor.execute('SELECT * FROM [ProjectUser] WHERE UserId = %s', user_id)
        result = self.cursor.fetchall()

        project_user = []
        for pu in result:
            project_user.append({
                'projectId': pu[0],
                'userId': pu[1],
            })

        return project_user
    
    def find_by_user_and_project_id(self, user_id, project_id):
        self.cursor.execute('SELECT * FROM [ProjectUser] WHERE UserId = %s AND ProjectId = %s', (user_id, project_id))
        result = self.cursor.fetchone()

        if(result is None):
            raise Exception("User is not part of project")

        project_user = {
            'projectId': result[0],
            'userId': result[1],
        }

        return project_user