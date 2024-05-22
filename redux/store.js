import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import logger from "redux-logger";
import rootReducer from "./rootreducer";
import { rootSaga } from "./rootsaga";

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// Mount it on the Store
const store = createStore(
  rootReducer,
  process.env.NODE_ENV === "production"
    ? applyMiddleware(sagaMiddleware)
    : applyMiddleware(sagaMiddleware, logger)
);

// Run the saga
sagaMiddleware.run(rootSaga);

export default store;
