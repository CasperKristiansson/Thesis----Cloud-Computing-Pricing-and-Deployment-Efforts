from Integration.DAO import DAO

class ProjectDAO(DAO):

    # Find all projects
    def find_all(self):
        self.cursor.execute(
            'SELECT [Project].*, [Company].Name as CompanyName FROM [Project] INNER JOIN [Company] ON [Company].id = CompanyId'
        )
        result = self.cursor.fetchall()

        return self.__format_projects(result)

    # Find all projects user has access to
    def find_all_by_creator_id_or_company_id(self, user_id, company_id):
        self.cursor.execute(
            'SELECT [Project].*, [Company].Name as CompanyName FROM [Project] INNER JOIN [Company] ON [Company].id = CompanyId WHERE CreatorId = %s OR CompanyId = %s', (user_id, company_id)
        )
        result = self.cursor.fetchall()

        return self.__format_projects(result)
    
    # Find project by id
    def find_by_id(self, id):
        self.cursor.execute(
            'SELECT [Project].*, [Company].Name, [Company].ContactPersonName, [User].Name FROM [Project] INNER JOIN [Company] ON [Company].Id = [Project].CompanyId INNER JOIN [User] ON [User].Id = [Project].CreatorId WHERE [Project].Id = %s', id
        )
        result = self.cursor.fetchone()

        if(result is None):
            raise Exception("Project not found")

        project = {
            'id': result[0],
            'name': result[1],
            'description': result[2],
            'companyId': result[3],
            'creatorId': result[4],
            'lastEdited': result[5],
            'companyName': result[6],
            'contactPersonName': result[7],
            'creatorName': result[8]
        }

        return project
    
    # Create project
    def create(self, name, description, company_id, creator_id):
        self.cursor.execute(
            'INSERT INTO [Project] (Name, Description, CompanyId, CreatorId) VALUES (%s, %s, %s, %s)', (name, description, company_id, creator_id)
        )
        self.connection.commit()

    # Delete project
    def delete(self, id):
        #Delete tickets
        self.cursor.execute(
            'DELETE FROM [TicketComment] WHERE TicketId IN (SELECT Id FROM [Ticket] WHERE ProjectId = %s)', id
        )
        self.cursor.execute(
            'DELETE FROM [Ticket] WHERE ProjectId = %s', id
        )
        #Delete project
        self.cursor.execute(
            'DELETE FROM [ProjectComment] WHERE ProjectId = %s', id
        )
        self.cursor.execute(
            'DELETE FROM [Project] WHERE Id = %s', id
        )
        self.connection.commit()

    # Edit project
    def edit(self, name, description, company_id, id):
        self.cursor.execute(
            'UPDATE [Project] SET Name = %s, Description = %s, CompanyId = %s, LastEdited = GETDATE() WHERE Id = %s', (name, description, company_id, id)
        )
        self.connection.commit()
    
    # Private format projects function
    def __format_projects(self, result):
        projects = []
        for p in result:
            projects.append({
                'id': p[0],
                'name': p[1],
                'description': p[2],
                'companyId': p[3],
                'creatorId': p[4],
                'lastEdited': p[5],
                'companyName': p[6]
            })

        return projects
