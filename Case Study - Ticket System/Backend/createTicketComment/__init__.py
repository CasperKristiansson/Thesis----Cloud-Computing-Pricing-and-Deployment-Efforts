import json
import logging

import azure.functions as func
from Integration.TicketCommentDAO import TicketCommentDAO

from validation import get_user_from_token

def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('api/createTicketComment function processed a request.')

    try:
        user = get_user_from_token(req.headers['Authorization'])
        
        request = req.get_json()

        comment = request.get('comment')
        ticket_id = request.get('id')

        if(comment is None or ticket_id is None):
            raise Exception("Missing parameters")
            
        ticketCommentDAO = TicketCommentDAO()

        ticketCommentDAO.create(ticket_id, user['id'], comment)

        return func.HttpResponse(json.dumps({'status': 'success'}), status_code = 200)
    except Exception as e:
        logging.info(f"Error from createProject: {e}")
        return func.HttpResponse(f"Error: {e}", status_code = 500)
