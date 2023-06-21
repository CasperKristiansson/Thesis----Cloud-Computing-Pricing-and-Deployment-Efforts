import json
import logging

import azure.functions as func
from Integration.UserDAO import UserDAO

from validation import get_user_from_token


def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('api/adminUsers function processed a request.')

    try:
        get_user_from_token(req.headers['Authorization'])

        userDAO = UserDAO()

        users = userDAO.find_all_admins()

        return func.HttpResponse(json.dumps(users, default=str), status_code = 200)
    except Exception as e:
        logging.info(f"Error from tickets: {e}")
        return func.HttpResponse(f"Error: {e}", status_code = 500)