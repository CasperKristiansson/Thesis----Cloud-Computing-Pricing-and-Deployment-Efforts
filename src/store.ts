import { applyMiddleware, compose, legacy_createStore as createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import Reducer, { initialState, State } from "./Redux/Reducer";
import projectSaga from "./Redux/Saga";

function ConfigureStore(preloadedState: State = initialState) {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(Reducer, preloadedState, compose(applyMiddleware(sagaMiddleware)));

  sagaMiddleware.run(projectSaga);

  return store;
}

export const Store = ConfigureStore();

export type AppDispatch = typeof Store.dispatch