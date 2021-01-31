import { createStore, compose, applyMiddleware } from "redux";
// import createSagaMiddleware from "redux-saga";
import { persistStore, persistCombineReducers } from "redux-persist";
import AsyncStorage from "@react-native-community/async-storage";
// import rootSaga from "./sagas/rootSaga";
import pedometerReducer from "./reducers/pedometer";

const rootReducer = persistCombineReducers(
  {
    key: "root",
    storage: AsyncStorage,
  },
  {
    pedometer: pedometerReducer,
  }
);

const middlewares = [];
const enhancers = [];

// const sagaMiddleware = createSagaMiddleware();
// middlewares.push(sagaMiddleware);
// enhancers.push(applyMiddleware(...middlewares));

export default () => {
  const store = createStore(rootReducer, compose(...enhancers));
  const persistor = persistStore(store);
  //   sagaMiddleware.run(rootSaga);

  return { store, persistor };
};
