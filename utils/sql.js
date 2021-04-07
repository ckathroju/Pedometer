import Server from "./Server";
import AsyncStorage from "@react-native-community/async-storage";
import {
  DB_PEDOMETER_TABLE,
  DB_HEIGHT_TABLE,
  DB_WEIGHT_TABLE,
  DB_FILE,
} from "../constants";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase(DB_FILE);

export const saveToDb = async () => {
  const userToken = await AsyncStorage.getItem("userToken");

  const postData = (userToken, data, key) => {
    Server.post(
      `/api/sql/save/${key}`,
      { data },
      {
        headers: { "auth-token": userToken },
      }
    ).catch((e) => console.log(e));
  };

  if (userToken) {
    //Save to db
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM ${DB_PEDOMETER_TABLE}`,
        [],
        (_, { rows }) => {
          postData(userToken, rows["_array"], "steps");
        }
      );
      tx.executeSql(`SELECT * FROM ${DB_HEIGHT_TABLE}`, [], (_, { rows }) => {
        postData(userToken, rows["_array"], "height");
      });
      tx.executeSql(`SELECT * FROM ${DB_WEIGHT_TABLE}`, [], (_, { rows }) => {
        postData(userToken, rows["_array"], "weight");
      });
    });
  }
};

export const getFromDb = async () => {
  const userToken = await AsyncStorage.getItem("userToken");
  Server.get(`/api/sql/fetch`, {
    headers: { "auth-token": userToken },
  })
    .then((res) => {
      const { height, weight, steps } = res.data;
      db.transaction((tx) => {
        for (const s of steps) {
          tx.executeSql(
            `REPLACE INTO ${DB_PEDOMETER_TABLE} VALUES (${s.id}, ${s.steps});`
          );
        }
        for (const h of height) {
          tx.executeSql(
            `REPLACE INTO ${DB_HEIGHT_TABLE} VALUES (${h.id}, ${h.height});`
          );
        }
        for (const w of weight) {
          tx.executeSql(
            `REPLACE INTO ${DB_WEIGHT_TABLE} VALUES (${w.id}, ${w.weight});`
          );
        }
      });
    })
    .catch((e) => console.log(e));
};
