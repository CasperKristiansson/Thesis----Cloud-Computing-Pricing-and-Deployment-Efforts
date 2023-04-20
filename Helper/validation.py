import requests
import logging

def validateToken(token):
    try:
        url = "https://graph.microsoft.com/v1.0/users"
        headers = {
            'Authorization': token
        }
        response = requests.request("GET", url, headers=headers)

        #logging.info(f"Validation Response: {response.json()}")

        return response.status_code == 200
    except Exception as e:
        return False