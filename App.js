import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/es/integration/react";
import configureStore from "./store/configureStore";
import RootContainer from "./screens/RootContainer";
import * as SQLite from "expo-sqlite";
import { DB_FILE, DB_PEDOMETER_TABLE, DB_WEIGHT_TABLE } from "./constants";

const db = SQLite.openDatabase(DB_FILE);

const App = () => {
  const { store, persistor } = configureStore();

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        `create table if not exists ${DB_PEDOMETER_TABLE} (id integer primary key not null, steps text);`
      );
    });
    db.transaction((tx) => {
      tx.executeSql(
        `create table if not exists ${DB_WEIGHT_TABLE} (id integer primary key not null, weight text);`
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
