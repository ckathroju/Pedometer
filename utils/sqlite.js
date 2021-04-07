import {
  DB_WEIGHT_TABLE,
  DB_HEIGHT_TABLE,
  DB_PEDOMETER_TABLE,
  DB_FILE,
} from "../constants";
import { dateToEpoch, getPreviousDate } from "./datetime";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase(DB_FILE);

export const createTables = () => {
  db.transaction((tx) => {
    tx.executeSql(
      `create table if not exists ${DB_PEDOMETER_TABLE} (id integer primary key not null, steps text);`
    );
    tx.executeSql(
      `create table if not exists ${DB_WEIGHT_TABLE} (id integer primary key not null, weight text);`
    );
    tx.executeSql(
      `create table if not exists ${DB_HEIGHT_TABLE} (id integer primary key not null, height text);`
    );
  });
};

export const populateMockData = () => {
  for (let i = 0; i < 10; i++) {
    const id = dateToEpoch(getPreviousDate(i));
    // const steps = i * 100;
    db.transaction((tx) => {
      const weight = Math.floor(Math.random() * 100) + 100;
      tx.executeSql(
        `REPLACE INTO ${DB_WEIGHT_TABLE} (id, weight) VALUES (${id}, ${weight})`
      );
      const height = Math.floor(Math.random() * 100) + 100;
      tx.executeSql(
        `REPLACE INTO ${DB_HEIGHT_TABLE} (id, height) VALUES (${id}, ${height})`
      );
      const steps = Math.floor(Math.random() * 10000);
      tx.executeSql(
        `REPLACE INTO ${DB_PEDOMETER_TABLE} (id, steps) VALUES (${id}, ${steps})`
      );
    });
  }
};

export const deleteDBData = () => {
  db.transaction((tx) => {
    tx.executeSql(`DELETE FROM ${DB_WEIGHT_TABLE}`);
    tx.executeSql(`DELETE FROM ${DB_HEIGHT_TABLE}`);
    tx.executeSql(`DELETE FROM ${DB_PEDOMETER_TABLE}`);
  });
};
