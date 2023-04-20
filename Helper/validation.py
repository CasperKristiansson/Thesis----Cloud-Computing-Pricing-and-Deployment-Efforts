import requests

def validate_token(token):
    
    if token is None:
        raise Exception("No token provided")
    
    url = "https://graph.microsoft.com/v1.0/me"
    
    headers = {
        'Authorization': token
    }

    response = requests.request("GET", url, headers=headers)

    if(response.status_code != 200):
        raise Exception("Token is not valid")
    
    return response