import json
import logging

import azure.functions as func
from Integration.UserDAO import UserDAO

from validation import get_user_from_token


def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('api/allusers function processed a request.')

    try:
        user = get_user_from_token(req.headers['Authorization'])

        if(user['role'] != 'ADMIN'):
            raise Exception("User does not have role 'ADMIN'")

        userDAO = UserDAO()

        users = userDAO.find_all()

        return func.HttpResponse(json.dumps(users, default=str), status_code = 200)
    except Exception as e:
        logging.info(f"Error from tickets: {e}")
        return func.HttpResponse(f"Error: {e}", status_code = 500)
