import logging
import json

import azure.functions as func
from Integration.TicketDAO import TicketDAO
from validation import get_user_from_token

def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('api/tickets function processed a request.')

    try:
        user = get_user_from_token(req.headers['Authorization'])

        ticketDAO = TicketDAO()

        tickets = ticketDAO.find_all_by_creator_id_and_user_assignee(user['id'])

        return func.HttpResponse(json.dumps(tickets), status_code = 200)
    except Exception as e:
        logging.info(f"Error from tickets: {e}")
        return func.HttpResponse(f"Error: {e}", status_code = 500)
