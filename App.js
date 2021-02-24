import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/es/integration/react";
import configureStore from "./store/configureStore";
import RootContainer from "./screens/RootContainer";
import * as SQLite from "expo-sqlite";
import {
  getCurrentDate,
  getPreviousDate,
  dateToEpoch,
  epochToDate,
} from "./utils/datetime";
import { DB_FILE, DB_TABLE } from "./constants";

const db = SQLite.openDatabase(DB_FILE);

const App = () => {
  const { store, persistor } = configureStore();

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        `create table if not exists ${DB_TABLE} (id integer primary key not null, steps text);`
      );
    });
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RootContainer />
      </PersistGate>
    </Provider>
  );
};

export default App;
