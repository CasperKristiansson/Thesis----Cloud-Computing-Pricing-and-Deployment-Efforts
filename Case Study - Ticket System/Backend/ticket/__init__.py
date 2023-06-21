import json
import logging

import azure.functions as func
from Integration.TicketCommentDAO import TicketCommentDAO
from Integration.TicketDAO import TicketDAO

from validation import get_user_from_token


def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('api/ticket function processed a request.')

    try:
        get_user_from_token(req.headers['Authorization'])

        ticket_id = req.route_params.get('id')

        ticketDAO = TicketDAO()

        ticket = ticketDAO.find_by_id(ticket_id)

        # Get ticket comments
        ticketCommentDAO = TicketCommentDAO()

        ticketComments = ticketCommentDAO.find_all_by_ticket_id(ticket_id)

        ticket['comments'] = ticketComments

        return func.HttpResponse(json.dumps(ticket, default=str), status_code = 200)
    except Exception as e:
        logging.info(f"Error from ticket: {e}")
        return func.HttpResponse(f"Error: {e}", status_code = 500)
