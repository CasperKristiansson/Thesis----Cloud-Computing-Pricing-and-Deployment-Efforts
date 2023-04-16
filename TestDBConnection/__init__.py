import logging
import os
import azure.functions as func
import pymssql
from dotenv import load_dotenv

def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('TestDBConnection function processed a request.')

    load_dotenv()

    server = os.getenv("DB_SERVER")
    username = os.getenv("DB_USERNAME")
    password = os.getenv("DB_PASSWORD")
    database = os.getenv("DB_DATABASE")

    if(server == None or username == None or password == None or database == None):
        return func.HttpResponse(f"Environment Variables not set or could not be loaded.")

    try:
        conn = pymssql.connect(server, username, password, database)
        cursor = conn.cursor(as_dict=True)
        return func.HttpResponse(f"Connection Successful")
    except Exception as e:
        logging.info(f"Connection Failed to DB! \n SERVER: {server} \n USER: {user} \n PASSWORD: {password} \n DATABASE: {database} \n {e}")
        return func.HttpResponse(f"Connection Failed: \n {e}")
