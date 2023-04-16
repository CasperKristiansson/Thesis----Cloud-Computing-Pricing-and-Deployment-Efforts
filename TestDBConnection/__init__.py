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

    try:
        conn = pymssql.connect(server, user, password, database)
        cursor = conn.cursor(as_dict=True)
        return func.HttpResponse(f"Connection Successful")
    except Exception as e:
        logging.info(f"Connection Failed to DB! \n SERVER: {server} \n USER: {user} \n PASSWORD: {password} \n DATABASE: {database} \n {e}")
        return func.HttpResponse(f"Connection Failed: \n {e}")
