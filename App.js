import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/es/integration/react";
import configureStore from "./store/configureStore";
import RootContainer from "./screens/RootContainer";
import useAppState from "react-native-appstate-hook";
import { GENERATE_MOCK_DATA, DELETE_DB_DATA } from "./constants";
import { populateMockData, deleteDBData, createTables } from "./utils/sqlite";
import { saveToDb, getFromDb } from "./utils/sql";

const App = () => {
  const { store, persistor } = configureStore();
  useAppState({
    onForeground: () => getFromDb(),
    onBackground: () => saveToDb(),
  });

  useEffect(() => {
    createTables();
    getFromDb();

    if (GENERATE_MOCK_DATA) {
      populateMockData();
    }

    if (DELETE_DB_DATA) {
      deleteDBData();
    }
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
