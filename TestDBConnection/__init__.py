import logging
import os
import azure.functions as func
import pymssql
from dotenv import load_dotenv

def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('TestDBConnection function processed a request.')

    load_dotenv()

    server = os.getenv("SERVER")
    user = os.getenv("USER")
    password = os.getenv("PASSWORD")
    database = os.getenv("DATABASE")

    if(server == None or user == None or password == None or database == None):
        return func.HttpResponse(f"Environment Variables not set or could not be loaded.")

    conn = pymssql.connect(server, user, password, database)
    cursor = conn.cursor(as_dict=True)

    if(conn):
        return func.HttpResponse(f"Connection Successful")
    else:
        return func.HttpResponse(f"Connection Failed")
