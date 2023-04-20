import logging
import azure.functions as func
from dotenv import load_dotenv
import Integration.DAO as DAO

def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('TestDBConnection function processed a request.')

    load_dotenv()

    try:
        dao = DAO()
        cursor = dao.conn.cursor(as_dict=True)
        return func.HttpResponse(f"Connection Successful!")
    except Exception as e:
        return func.HttpResponse(f"Connection Failed: \n {e}")
