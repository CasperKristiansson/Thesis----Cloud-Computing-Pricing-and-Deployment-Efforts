import logging

import azure.functions as func

from flask import Flask
from flask_session import Session
import Helper.validation as validation

app = Flask(__name__)
Session(app)

def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('initializeProfile function processed a request.')
    
    tokenValid = validation.validate_token(req.headers['Authorization'])

    if(tokenValid):
        #session['token'] = token
        return func.HttpResponse(f"Token is valid!")
    else:
        return func.HttpResponse(f"Not a valid token!")