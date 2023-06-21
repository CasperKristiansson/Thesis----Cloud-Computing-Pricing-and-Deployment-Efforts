import json
import logging

import azure.functions as func
from Integration.ProjectCommentDAO import ProjectCommentDAO

from validation import get_user_from_token


def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('api/createProjectComment function processed a request.')

    try:
        user = get_user_from_token(req.headers['Authorization'])
        
        request = req.get_json()

        logging.info(f"Request: {request}")

        comment = request.get('comment')
        project_id = request.get('projectId')

        if(comment is None or project_id is None):
            raise Exception("Missing parameters")
            
        projectCommentDAO = ProjectCommentDAO()

        projectCommentDAO.create(project_id, user['id'], comment)

        return func.HttpResponse(json.dumps({'status': 'success'}), status_code = 200)
    except Exception as e:
        logging.info(f"Error from createProject: {e}")
        return func.HttpResponse(f"Error: {e}", status_code = 500)
