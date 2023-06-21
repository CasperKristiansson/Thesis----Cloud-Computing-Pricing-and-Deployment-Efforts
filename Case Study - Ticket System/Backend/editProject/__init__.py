import json
import logging

import azure.functions as func
from Integration.ProjectDAO import ProjectDAO

from validation import get_user_from_token


def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('api/editProject function processed a request.')

    try:
        user = get_user_from_token(req.headers['Authorization'])
        
        request = req.get_json()

        project_id = request.get('id')
        name = request.get('name')
        description = request.get('description')
        company_id = request.get('companyId')

        if(name is None or description is None or company_id is None):
            raise Exception("Missing parameters")
        
        if(user['role'] != 'ADMIN'):
            if(user['companyId'] != company_id):
                raise Exception("User does not have role 'ADMIN' or is not part of the company")
            
        projectDAO = ProjectDAO()

        projectDAO.edit(name, description, company_id, project_id)

        return func.HttpResponse(json.dumps({'status': 'success'}), status_code = 200)
    except Exception as e:
        logging.info(f"Error from createProject: {e}")
        return func.HttpResponse(f"Error: {e}", status_code = 500)
