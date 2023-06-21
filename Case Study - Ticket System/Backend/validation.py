import requests
import msal
from Integration.UserDAO import UserDAO
import msalConfig
import logging
import urllib.parse

def validate_token(token):
    
    if token is None:
        raise Exception("No token provided")
    
    logging.info(f"Token: {token[:25]}...")
    
    if(token.startswith("Bearer ") == False):
        raise Exception("Token is not in the correct format")
        
    #logging.info(f"ID Token: {token}")

    # MSAL authorization does not currently work
    result = msal.ConfidentialClientApplication(
        client_id= msalConfig.CLIENT_ID,
        client_credential= msalConfig.CLIENT_SECRET, 
        authority= msalConfig.AUTHORITY
    ).acquire_token_on_behalf_of(user_assertion=token.split(" ")[1], scopes= msalConfig.SCOPES)

    logging.info(f"Result: {result}")
    
    url = "https://graph.microsoft.com/v1.0/me"
    
    headers = {
        'Authorization': token
    }

    response = requests.request("GET", url, headers=headers)

    if(response.status_code != 200):
        raise Exception("Token is not valid")
    
    return response

# Validate a token and return the user + role if the token is valid
def get_user_from_token(token):
    response = validate_token(token)

    response_user = response.json()

    microsoft_user_id = response_user.get('id')

    userDAO = UserDAO()
    user = userDAO.find_by_id(microsoft_user_id)

    if user is None:
        raise Exception("User not found")
    
    role = user[1]
    companyId = user[2]
    
    if role != 'USER' and role != 'ADMIN':
        raise Exception("User does not have role 'USER' or 'ADMIN'")
    
    response_user['role'] = role
    response_user['companyId'] = companyId
    return response_user
    

    

    
