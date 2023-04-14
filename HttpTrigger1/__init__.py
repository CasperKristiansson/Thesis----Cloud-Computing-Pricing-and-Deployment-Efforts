import logging

import os

from dotenv import load_dotenv

import pymssql

import azure.functions as func

def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')
    for key in req.headers.keys():
        logging.info(f"{key}: {req.headers.get(key)}")

    load_dotenv()

    logging.info(f"ENVIRONMENT VARIABLE: {os.getenv('TEST')}")

    server = "amaceit-ticket-system.database.windows.net"
    user = "developerRoot"
    password = "amazingTicketSystemDB2023"
    database = "amaceit-ticket-system"
    conn = pymssql.connect(server, user, password, database)
    cursor = conn.cursor(as_dict=True)

    name = req.params.get('name')
    if not name:
        try:
            req_body = req.get_json()
        except ValueError:
            pass
        else:
            name = req_body.get('name')

    if name:
        return func.HttpResponse(f"Hello, {name}. This HTTP triggered function executed successfully.")
    else:
        return func.HttpResponse(
            "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.",
            status_code=200
        )
