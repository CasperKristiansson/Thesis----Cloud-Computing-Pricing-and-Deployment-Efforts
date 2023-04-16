import logging

import azure.functions as func

import requests
from flask import Flask, render_template, session, request, redirect, url_for
from flask_session import Session
import msal
import app_config

app = Flask(__name__)
app.config.from_object(app_config)
Session(app)

def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Login function processed a request.')

    #session["flow"] = _build_auth_code_flow(scopes=app_config.SCOPE)
    try:
        app = msal.ConfidentialClientApplication(app_config.CLIENT_ID, authority=app_config.AUTHORITY, client_credential=app_config.CLIENT_SECRET, token_cache=None)
        flow = app.initiate_auth_code_flow(scopes=app_config.SCOPE, redirect_uri=url_for("authorized", _external=True))
        session["flow"] = flow

        result = app.acquire_token_by_auth_code_flow(flow, request.args)
        session["user"] = result.get("id_token_claims")
        logging.info(f"Login success")
        logging.info(f"Hello {session['user']}")
        return func.HttpResponse(f"Hello {session['user']}")
    
    except Exception as e:
        logging.info(f"Error: {e}")
        return func.HttpResponse(f"Error: {e}")

    #try:
    #    cache = _load_cache()
    #    result = _build_msal_app(cache=cache).acquire_token_by_auth_code_flow(
    #        session.get("flow", {}), request.args)
    #    if "error" in result:
    #        return func.HttpResponse(f"Error: {result}")
    #    session["user"] = result.get("id_token_claims")
    #    _save_cache(cache)
    #except Exception as e:  # Usually caused by CSRF
    #    logging.info(f"Error: {e}")
    #    return func.HttpResponse(f"Error: {e}")
    #return func.HttpResponse(f"Hello {session['user']}")

#def _save_cache(cache):
#    if cache.has_state_changed:
#        session["token_cache"] = cache.serialize()

#def _load_cache():
#    cache = msal.SerializableTokenCache()
#    if session.get("token_cache"):
#        cache.deserialize(session["token_cache"])
#    return cache

#def _build_msal_app(cache=None, authority=None):
#    return msal.ConfidentialClientApplication(
#        app_config.CLIENT_ID, authority=authority or app_config.AUTHORITY,
#        client_credential=app_config.CLIENT_SECRET, token_cache=cache)

#def _build_auth_code_flow(authority=None, scopes=None):
#    return _build_msal_app(authority=authority).initiate_auth_code_flow(
#        scopes or [],
#        redirect_uri=url_for("authorized", _external=True))
