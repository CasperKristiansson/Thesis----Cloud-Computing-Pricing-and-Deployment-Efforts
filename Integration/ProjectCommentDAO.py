from Integration.DAO import DAO

class ProjectCommentDAO(DAO):

    # Find all projects
    def find_all_by_project_id(self, project_id):
        self.cursor.execute(
            'SELECT [ProjectComment].*, [User].Name FROM [ProjectComment] INNER JOIN [User] ON [User].Id = [ProjectComment].UserId WHERE ProjectId = %s', (project_id)
        )
        result = self.cursor.fetchall()

        return self.__format_project_comments(result)
    
    # Create project comment
    def create(self, project_id, user_id, comment):
        self.cursor.execute(
            'INSERT INTO [ProjectComment] (ProjectId, UserId, Comment) VALUES (%s, %s, %s)', (project_id, user_id, comment)
        )
        self.connection.commit()
    
    # Private format projects function
    def __format_project_comments(self, result):
        project_comments = []
        for p in result:
            project_comments.append({
                'id': p[0],
                'projectId': p[1],
                'userId': p[2],
                'comment': p[3],
                'time': p[4],
                'name': p[5]
            })

        return project_comments
