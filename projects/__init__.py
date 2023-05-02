import json
import logging

import azure.functions as func
from Integration.ProjectDAO import ProjectDAO

from Integration.ProjectUserDAO import ProjectUserDAO
from validation import get_user_from_token

# Get all projects user has access to
def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('api/projects function processed a request.')

    try:
        user = get_user_from_token(req.headers['Authorization'])

        projectDAO = ProjectDAO()

        projects = projectDAO.find_all_by_user_access(user['id'])

        return func.HttpResponse(json.dumps(projects), status_code = 200)
    except Exception as e:
        logging.info(f"Error from projects: {e}")
        return func.HttpResponse(f"Error: {e}", status_code = 500)
