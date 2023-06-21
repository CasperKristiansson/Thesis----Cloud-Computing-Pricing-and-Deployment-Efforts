import json
import logging

import azure.functions as func
from Integration.UserDAO import UserDAO

from validation import get_user_from_token


def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('api/deleteUser/ function processed a request.')

    try:
        user_id = req.route_params.get('id')

        if(user_id is None):
            raise Exception("Missing parameters")

        user = get_user_from_token(req.headers['Authorization'])

        if(user['role'] != 'ADMIN'):
            raise Exception("User does not have role 'ADMIN'")

        userDAO = UserDAO()

        userDAO.delete(user_id)

        return func.HttpResponse(json.dumps({'status': 'success'}, default=str), status_code = 200)
    except Exception as e:
        logging.info(f"Error from deleteUser: {e}")
        return func.HttpResponse(f"Error: {e}", status_code = 500)
