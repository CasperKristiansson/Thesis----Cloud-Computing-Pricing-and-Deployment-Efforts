import json
import logging

import azure.functions as func
from Integration.TicketDAO import TicketDAO

from validation import get_user_from_token


def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('api/editTicket function processed a request.')

    try:
        get_user_from_token(req.headers['Authorization'])
        
        request = req.get_json()

        ticket_id = request.get('id')
        title = request.get('title')
        description = request.get('description')
        priority = request.get('priority')
        assigned_id = request.get('assignedId')
        project_id = request.get('projectId')

        if(ticket_id is None or description is None or priority is None or assigned_id is None or project_id is None or title is None):
            raise Exception("Missing required parameters")
            
        ticketDAO = TicketDAO()

        ticketDAO.edit(ticket_id, title, description, priority, assigned_id, project_id)

        return func.HttpResponse(json.dumps({'status': 'success'}), status_code = 200)
    except Exception as e:
        logging.info(f"Error from createProject: {e}")
        return func.HttpResponse(f"Error: {e}", status_code = 500)
