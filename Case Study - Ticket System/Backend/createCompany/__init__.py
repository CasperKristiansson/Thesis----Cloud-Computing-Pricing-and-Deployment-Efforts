import json
import logging

import azure.functions as func
from Integration.CompanyDAO import CompanyDAO

from validation import get_user_from_token


def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('api/createCompany function processed a request.')

    try:
        user = get_user_from_token(req.headers['Authorization'])

        if(user['role'] != 'ADMIN'):
            raise Exception("User does not have role 'ADMIN'")
        
        request = req.get_json()

        name = request.get('name')
        email = request.get('email')
        contact_person_name = request.get('contactPersonName')

        if(name is None or email is None or contact_person_name is None):
            raise Exception("Missing parameters")
            
        companyDAO = CompanyDAO()

        companyDAO.create(name, email, contact_person_name)

        return func.HttpResponse(json.dumps({'status': 'success'}), status_code = 200)
    except Exception as e:
        logging.info(f"Error from createCompany: {e}")
        return func.HttpResponse(f"Error: {e}", status_code = 500)