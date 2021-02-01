import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Pedometer } from "expo-legacy";
import { useDispatch } from "react-redux";
import {
  setYesterdayStepCount,
  setCurrentAppStepCount,
  setCurrentDayStepCount,
} from "../store/actions/pedometer";

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
    const currentDayStart = new Date();
    currentDayStart.setHours(0, 0, 0, 0);
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
    let yesterdayStart = new Date();
    yesterdayStart.setHours(0, 0, 0, 0);
    yesterdayStart = yesterdayStart.getDate() - 1;
    const yesterdayEnd = new Date();
    yesterdayEnd.setHours(0, 0, 0, 0);
    Pedometer.getStepCountAsync(yesterdayStart, yesterdayEnd).then(
      (result) => {
        dispatch(setYesterdayStepCount(result.steps));
      },
      (error) => {
        // setPastStepCount("Could not get stepCount: " + error);
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
