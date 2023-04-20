import os
import pymssql

from dotenv import load_dotenv

def connectToDB() -> pymssql.connect:
    load_dotenv()

    server = os.getenv("DB_SERVER")
    username = os.getenv("DB_USERNAME")
    password = os.getenv("DB_PASSWORD")
    database = os.getenv("DB_DATABASE")

    if(server == None or username == None or password == None or database == None):
        raise Exception("Environment Variables not set or could not be loaded.")
    
    return pymssql.connect(server, username, password, database)