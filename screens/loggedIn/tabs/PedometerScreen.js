import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView, View, StatusBar } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTheme } from "@react-navigation/native";
import PedometerView from "../../../components/PedometerView";
import DonutChart from "../../../components/DonutChart";
import { useSelector } from "react-redux";
import * as SQLite from "expo-sqlite";
import BarChart from "../../../components/BarChart";

import { DB_FILE, DB_PEDOMETER_TABLE } from "../../../constants";
import {
  epochToDate,
  dateToEpoch,
  getPreviousDate,
  getDateMonthString,
} from "../../../utils/datetime";

const db = SQLite.openDatabase(DB_FILE);

export const PedometerScreen = () => {
  const theme = useTheme();
  const [steps, setSteps] = useState([]);
  const currentAppStepCount = useSelector(
    (state) => state.pedometer.currentAppStepCount
  );
  const currentDayStepCount = useSelector(
    (state) => state.pedometer.currentDayStepCount
  );
  const goal = useSelector((state) => state.pedometer.goal);

  useEffect(() => {
    const id = dateToEpoch(getPreviousDate(6));
    db.transaction((tx) => {
      tx.executeSql(
        `select * from ${DB_PEDOMETER_TABLE} WHERE id >= ${id}`,
        [],
        (_, { rows }) => {
          setSteps(
            rows["_array"].map((x) => ({
              y: Number(x.steps),
              x: getDateMonthString(epochToDate(x["id"])),
            }))
          );
        }
      );
    });
  }, []);

  useEffect(() => {
    const id = dateToEpoch(getPreviousDate(6));
    db.transaction((tx) => {
      tx.executeSql(
        `select * from ${DB_PEDOMETER_TABLE} WHERE id >= ${id}`,
        [],
        (_, { rows }) => {
          setSteps(
            rows["_array"].map((x) => ({
              y: Number(x.steps),
              x: getDateMonthString(epochToDate(x["id"])),
            }))
          );
        }
      );
    });
  }, [currentDayStepCount]);

  return (
    <ScrollView>
      <View style={styles.container}>
        <StatusBar barStyle={theme.dark ? "dark-content" : "light-content"} />
        <DonutChart
          value={currentAppStepCount + currentDayStepCount}
          goal={goal}
        />
        <PedometerView />
        <BarChart data={steps} style={{ width: "100%" }} />
      </View>
    </ScrollView>
  );
};

const PedometerStack = createStackNavigator();

const PedometerStackScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const theme = useTheme();

  const color = theme.dark
    ? theme.colors.darkMode.status
    : theme.colors.lightMode.status;

  return (
    <PedometerStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: color,
        },
        headerTintColor: colors.components.headerTintColor,
      }}
    >
      <PedometerStack.Screen
        name="Pedometer"
        component={PedometerScreen}
        options={{
          title: "Pedometer",
          headerLeft: () => (
            <Icon.Button
              name="menu"
              size={25}
              backgroundColor={color}
              onPress={() => navigation.openDrawer()}
            ></Icon.Button>
          ),
        }}
      />
    </PedometerStack.Navigator>
  );
};

export default PedometerStackScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
