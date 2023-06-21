import json
import logging

import azure.functions as func
from Integration.ProjectDAO import ProjectDAO

from validation import get_user_from_token


def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('api/tickets function processed a request.')

    try:
        user = get_user_from_token(req.headers['Authorization'])

        if(user['role'] != 'ADMIN'):
            raise Exception("User does not have role 'ADMIN'")

        projectDAO = ProjectDAO()

        projects = projectDAO.find_all()

        return func.HttpResponse(json.dumps(projects, default=str), status_code = 200)
    except Exception as e:
        logging.info(f"Error from tickets: {e}")
        return func.HttpResponse(f"Error: {e}", status_code = 500)
