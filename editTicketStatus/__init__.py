import json
import logging

import azure.functions as func
from Integration.TicketDAO import TicketDAO

from validation import get_user_from_token


def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')

    try:
        get_user_from_token(req.headers['Authorization'])
        
        request = req.get_json()

        ticket_id = request.get('id')
        status = request.get('status')

        if(ticket_id is None or status is None):
            raise Exception("Missing parameters")
        
        if(status not in ['Open', 'In Progress', 'Closed']):
            raise Exception("Invalid status")
            
        ticketDAO = TicketDAO()

        ticketDAO.edit_status(ticket_id, status)

        return func.HttpResponse(json.dumps({'status': 'success'}), status_code = 200)
    except Exception as e:
        logging.info(f"Error from createProject: {e}")
        return func.HttpResponse(f"Error: {e}", status_code = 500)
