import logging

import azure.functions as func

from flask import Flask
from flask_session import Session
import Helper.validation as validation
import Integration.UserDAO as UserDAO
import json

app = Flask(__name__)
Session(app)

def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('initializeProfile function processed a request.')

    try:
        response = validation.validate_token(req.headers['Authorization'])
        
        response_user = response.json();
        userDAO = UserDAO()
        user = userDAO.find_user_by_id(response_user.id)

        return func.HttpResponse(json.dumps(user), 200)
    except Exception as e:
            return func.HttpResponse(f"Error: {e}", 500)