from Integration.DAO import DAO

class ProjectDAO(DAO):

    # Find all projects user has access to
    def find_all_by_user_access(self, user_id):
        self.cursor.execute(
            'SELECT [Project].* FROM [ProjectUser] INNER JOIN [Project] ON [Project].Id = [ProjectUser].ProjectId WHERE [ProjectUser].UserId = %s', user_id
        )
        result = self.cursor.fetchall()

        projects = []
        for p in result:
            projects.append({
                'id': p[0],
                'name': p[1],
                'description': p[2],
                'companyId': p[3],
                'creatorId': p[4]
            })

        return projects
    
    def find_by_id(self, id):
        self.cursor.execute(
            'SELECT * FROM [Project] WHERE Id = %s', id
        )
        result = self.cursor.fetchone()

        if(result is None):
            raise Exception("Project not found")

        project = {
            'id': result[0],
            'name': result[1],
            'description': result[2],
            'companyId': result[3],
            'creatorId': result[4]
        }

        return project
