import { all, put, takeLatest } from "redux-saga/effects";
import { LOGIN, SET_IN_LINE_OPERATION_IN_PROGRESS, SET_TOKEN } from "./Actions";
import { loginRequest } from "../authConfig";
import { msalInstance } from "..";
import { acquireTokenSilent } from "./helpers";
import { AuthenticationResult } from "@azure/msal-browser";

function* handleLogin(action: any) {
  yield put({ type: SET_IN_LINE_OPERATION_IN_PROGRESS, payload: true })
  try {
    msalInstance.loginPopup(loginRequest);
    const graphTokenResponse: AuthenticationResult = yield acquireTokenSilent(loginRequest, msalInstance);
    yield put({ type: SET_TOKEN, payload: graphTokenResponse.accessToken });
    // TODO: GET IMAGE FOR USER
    // url = `https://graph.microsoft.com/v1.0/me/photo/$value`;
    // we need to send the token aswell when fetching the image.
  } catch (error) {
    console.log(error);
  } finally {
    yield put({ type: SET_IN_LINE_OPERATION_IN_PROGRESS, payload: false })
  }
}

function* projectSaga() {
  yield all([
    takeLatest(LOGIN, handleLogin),
  ]);
}
  
export default projectSaga;