import json
import logging

import azure.functions as func
from Integration.ProjectDAO import ProjectDAO

from validation import get_user_from_token

def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('api/projects function processed a request.')

    try:
        user = get_user_from_token(req.headers['Authorization'])

        projectDAO = ProjectDAO()

        if(user['companyId'] is None):
            raise Exception("User does not belong to a company")
        
        if(user['role'] == 'ADMIN'):
            projects = projectDAO.find_all()
        else:
            projects = projectDAO.find_all_by_creator_id_or_company_id(user['id'], user['companyId'])

        return func.HttpResponse(json.dumps(projects, default=str), status_code = 200)
    except Exception as e:
        logging.info(f"Error from projects: {e}")
        return func.HttpResponse(f"Error: {e}", status_code = 500)
