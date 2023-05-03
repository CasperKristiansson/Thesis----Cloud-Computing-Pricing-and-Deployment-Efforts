import logging

import azure.functions as func

import validation as validation
from Integration.UserDAO import UserDAO
import json

def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('api/authorize function processed a request.')
    
    try:
        response = validation.validate_token(req.headers['Authorization'])

        logging.info(f"Response: {response}")
        
        response_user = response.json()

        microsoft_user_id = response_user.get('id')

        logging.info(f"User ID: {microsoft_user_id}")

        userDAO = UserDAO()
        user = userDAO.find_by_id(microsoft_user_id)

        if user is None:
            logging.info("User not found, creating new user")
            
            role = 'USER'

            # Everyone with amaceit mail gets admin role, which is the same as 'internal' role
            if(response_user['mail'].endswith('@amaceit.se')):
                role = 'ADMIN'

            userDAO.create(microsoft_user_id, role)
            response_user['role'] = role
        else:
            logging.info(f"User found: {user}")
            response_user['role'] = user[1]
            response_user['companyId'] = user[2]

        return func.HttpResponse(json.dumps(response_user), status_code = 200)
    except Exception as e:
        logging.info(f"Error from initializeProfile: {e}")
        return func.HttpResponse(f"Error: {e}", status_code = 500)