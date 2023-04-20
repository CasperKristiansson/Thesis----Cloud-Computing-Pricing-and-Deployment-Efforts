import logging

import azure.functions as func

import requests
from flask import Flask, render_template, session, request, redirect, url_for
from flask_session import Session
import msal
import Helper.validation as validation

app = Flask(__name__)
Session(app)

def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('initializeProfile function processed a request.')
    
    tokenValid = validation.validateToken(req.headers['Authorization'])

    if(tokenValid):
        #session['token'] = token
        return func.HttpResponse(f"Token is valid!")
    else:
        return func.HttpResponse(f"Not a valid token!")