import json
import logging

import azure.functions as func
from Integration.CompanyDAO import CompanyDAO

from validation import get_user_from_token


def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('api/deleteCompany function processed a request.')

    try:
        company_id = req.route_params.get('id')

        if(company_id is None):
            raise Exception("Missing parameters")

        user = get_user_from_token(req.headers['Authorization'])

        if(user['role'] != 'ADMIN'):
            raise Exception("Unauthorized")
        
        companyDAO = CompanyDAO()

        companyDAO.delete(company_id)

        return func.HttpResponse(json.dumps({'status': 'success'}, default=str), status_code = 200)
    except Exception as e:
        logging.info(f"Error from deleteProject: {e}")
        return func.HttpResponse(f"Error: {e}", status_code = 500)
