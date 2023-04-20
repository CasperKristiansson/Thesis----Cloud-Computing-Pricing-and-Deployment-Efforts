import logging
import os
import azure.functions as func
import pymssql
from dotenv import load_dotenv
import Helper.dao as dao

def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('TestDBConnection function processed a request.')

    load_dotenv()

    try:
        conn = dao.connectToDB()
        return func.HttpResponse(f"Connection Successful!")
    except Exception as e:
        return func.HttpResponse(f"Connection Failed: \n {e}")
