import json
import logging

import azure.functions as func

from validation import get_user_from_token

from Integration.TicketDAO import TicketDAO


def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('api/deleteTicket function processed a request.')

    try:
        ticket_id = req.route_params.get('id')

        if(ticket_id is None):
            raise Exception("Missing parameters")

        get_user_from_token(req.headers['Authorization'])
        
        ticketDAO = TicketDAO()

        ticketDAO.delete(ticket_id)

        return func.HttpResponse(json.dumps({'status': 'success'}, default=str), status_code = 200)
    except Exception as e:
        logging.info(f"Error from deleteTicket: {e}")
        return func.HttpResponse(f"Error: {e}", status_code = 500)
