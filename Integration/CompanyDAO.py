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