import json
import logging

import azure.functions as func
from Integration.CompanyDAO import CompanyDAO

from validation import get_user_from_token


def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('api/companies function processed a request.')

    try:
        user = get_user_from_token(req.headers['Authorization'])

        companyDAO = CompanyDAO()

        # Admins should find all companies, users should only find their own
        if(user['role'] == 'ADMIN'):
            companies = companyDAO.find_all()
        else:
            companies = [ companyDAO.find_by_id(user['companyId']) ]

        return func.HttpResponse(json.dumps(companies), status_code = 200)
    except Exception as e:
        logging.info(f"Error from companies: {e}")
        return func.HttpResponse(f"Error: {e}", status_code = 500)
    
