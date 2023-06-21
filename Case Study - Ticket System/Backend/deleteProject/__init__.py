import json
import logging

import azure.functions as func

from validation import get_user_from_token

from Integration.ProjectDAO import ProjectDAO


def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')

    try:
        project_id = req.route_params.get('id')

        if(project_id is None):
            raise Exception("Missing parameters")

        get_user_from_token(req.headers['Authorization'])
        
        projectDAO = ProjectDAO()

        projectDAO.delete(project_id)

        return func.HttpResponse(json.dumps({'status': 'success'}, default=str), status_code = 200)
    except Exception as e:
        logging.info(f"Error from deleteProject: {e}")
        return func.HttpResponse(f"Error: {e}", status_code = 500)
