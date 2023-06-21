import json
import logging

import azure.functions as func
from Integration.ProjectCommentDAO import ProjectCommentDAO
from Integration.ProjectDAO import ProjectDAO
from Integration.TicketDAO import TicketDAO

from validation import get_user_from_token

# Get specific project
def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('api/project function processed a request.')

    try:
        get_user_from_token(req.headers['Authorization'])

        project_id = req.route_params.get('id')

        projectDAO = ProjectDAO()

        project = projectDAO.find_by_id(project_id)

        # Get tickets
        ticketDAO = TicketDAO()

        tickets = ticketDAO.find_all_by_project_id(project_id)

        project['tickets'] = tickets

        # Get project comments
        projectCommentDAO = ProjectCommentDAO()

        projectComments = projectCommentDAO.find_all_by_project_id(project_id)

        project['comments'] = projectComments

        return func.HttpResponse(json.dumps(project, default=str), status_code = 200)
    except Exception as e:
        logging.info(f"Error from projects: {e}")
        return func.HttpResponse(f"Error: {e}", status_code = 500)
