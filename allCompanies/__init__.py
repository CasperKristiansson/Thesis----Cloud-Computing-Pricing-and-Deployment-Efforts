import json
import logging

import azure.functions as func
from Integration.CompanyDAO import CompanyDAO
from Integration.ProjectDAO import ProjectDAO

from validation import get_user_from_token


def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('api/allCompanies function processed a request.')

    try:
        user = get_user_from_token(req.headers['Authorization'])

        if(user['role'] != 'ADMIN'):
            raise Exception("User does not have role 'ADMIN'")

        companyDAO = CompanyDAO()

        companies = companyDAO.find_all()

        return func.HttpResponse(json.dumps(companies, default=str), status_code = 200)
    except Exception as e:
        logging.info(f"Error from allCompanies: {e}")
        return func.HttpResponse(f"Error: {e}", status_code = 500)
