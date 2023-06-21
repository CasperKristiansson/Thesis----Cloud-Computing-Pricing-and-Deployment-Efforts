import json
import logging

import azure.functions as func

from Integration.UserDAO import UserDAO
from validation import get_user_from_token

def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('api/setCompany function processed a request.')

    try:
        user = get_user_from_token(req.headers['Authorization'])

        req_body = req.get_json()
        companyId = req_body.get('companyId')

        if(companyId is None):
            raise Exception("No companyId provided")
        
        userDAO = UserDAO()

        userDAO.update_company(user['id'], companyId)
        
        return func.HttpResponse(json.dumps({"status": "success"}), status_code = 200)
    except Exception as e:
        logging.info(f"Error from setCompany: {e}")
        return func.HttpResponse(f"Error: {e}", status_code = 500)
