import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Pedometer } from "expo-legacy";
import { useDispatch } from "react-redux";
import {
  setYesterdayStepCount,
  setCurrentAppStepCount,
  setCurrentDayStepCount,
} from "../store/actions/pedometer";
import {
  getCurrentDate,
  getPreviousDate,
  dateToEpoch,
} from "../utils/datetime";
import * as SQLite from "expo-sqlite";
import { DB_FILE, DB_TABLE } from "../constants";

const db = SQLite.openDatabase(DB_FILE);

export default function App() {
  const [isPedometerAvailable, setIsPedometerAvailable] = useState("checking");
  const dispatch = useDispatch();

  let _subscription;

  const _subscribe = () => {
    _subscription = Pedometer.watchStepCount((result) => {
      dispatch(setCurrentAppStepCount(result.steps));
    });

    // Get current day steps while app is open
    Pedometer.isAvailableAsync().then(
      (result) => {
        setIsPedometerAvailable(result);
      },
      (error) => {
        setIsPedometerAvailable("Could not get isPedometerAvailable: " + error);
      }
    );

    // Get current day steps before app was open
    const currentDayStart = getCurrentDate();
    const currentDayEnd = new Date();
    Pedometer.getStepCountAsync(currentDayStart, currentDayEnd).then(
      (result) => {
        dispatch(setCurrentDayStepCount(result.steps));
      },
      (error) => {
        // setPastStepCount("Could not get stepCount: " + error);
      }
    );

    // Get yesterdays steps
    let yesterdayStart = getPreviousDate(1);
    const yesterdayEnd = getCurrentDate();
    Pedometer.getStepCountAsync(yesterdayStart, yesterdayEnd).then(
      (result) => {
        dispatch(setYesterdayStepCount(result.steps));
        db.transaction((tx) => {
          tx.executeSql(
            `insert into ${DB_TABLE} (id, steps) values (${dateToEpoch(
              yesterdayStart
            )}, ${result.steps})`
          );
        });
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const _unsubscribe = () => {
    _subscription && _subscription.remove();
    _subscription = null;
  };

  useEffect(() => {
    _subscribe();
    return () => _unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Pedometer.isAvailableAsync(): {isPedometerAvailable}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
    alignItems: "center",
    justifyContent: "center",
  },
});
