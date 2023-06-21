import logging
import azure.functions as func
from dotenv import load_dotenv
from Integration.DAO import DAO

def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('TestDBConnection function processed a request.')

    load_dotenv()

    try:
        dao = DAO()
        return func.HttpResponse(f"Connection Successful!")
    except Exception as e:
        return func.HttpResponse(f"Error: \n {e}")
