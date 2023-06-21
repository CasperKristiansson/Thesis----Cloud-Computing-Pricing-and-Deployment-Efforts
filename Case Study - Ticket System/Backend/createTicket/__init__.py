import json
import logging

import azure.functions as func
from Integration.TicketDAO import TicketDAO

from validation import get_user_from_token


def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('api/createTicket function processed a request.')

    try:
        user = get_user_from_token(req.headers['Authorization'])
        
        request = req.get_json()

        logging.info(f"Request: {request}")

        name = request.get('name')
        project_id = request.get('projectId')
        description = request.get('description')
        assigned_id = request.get('assignedId')
        priority = request.get('priority')
        status = "Open"
        creator_id = user['id']

        if(name is None or project_id is None or description is None or assigned_id is None or priority is None):
            raise Exception("Missing parameters")
            
        ticketDAO = TicketDAO()

        ticketDAO.create(name, priority, assigned_id, project_id, description, status, creator_id)

        return func.HttpResponse(json.dumps({'status': 'success'}), status_code = 200)
    except Exception as e:
        logging.info(f"Error from createProject: {e}")
        return func.HttpResponse(f"Error: {e}", status_code = 500)
