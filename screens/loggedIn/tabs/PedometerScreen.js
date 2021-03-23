import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTheme } from "@react-navigation/native";
import PedometerView from "../../../components/PedometerView";
import DonutChart from "../../../components/DonutChart";
import { useSelector } from "react-redux";
import * as SQLite from "expo-sqlite";

import LineChart from "../../../components/LineChart";
import { DB_FILE, DB_PEDOMETER_TABLE } from "../../../constants";
import { epochToDate, dateToEpoch, getPreviousDate } from "../../../utils/datetime";

const db = SQLite.openDatabase(DB_FILE);

export const PedometerScreen = ({ navigation }) => {
  const currentAppStepCount = useSelector(
    (state) => state.pedometer.currentAppStepCount
  );
  const currentDayStepCount = useSelector(
    (state) => state.pedometer.currentDayStepCount
    // (state) => state.pedometer.currentDayStepCount
  );
  const setYesterdayStepCount = useSelector(
    (state) => state.pedometer.yesterdayStepCount
  );
  const goal = useSelector((state) => state.pedometer.goal);
  const [data, setData] = useState([]);

  useEffect(() => {
    for (let i = 0; i < 10; i++) {
      const id = dateToEpoch(getPreviousDate(i));
      const steps = Math.floor(Math.random()*10000);
      // const steps = i * 100;
      db.transaction((tx) => {
        tx.executeSql(
          // `UPDATE ${DB_PEDOMETER_TABLE} SET steps = ${steps} WHERE id = ${id};`,
          `INSERT INTO ${DB_PEDOMETER_TABLE} (id, steps) VALUES (${id}, ${steps}); UPDATE ${DB_PEDOMETER_TABLE} SET steps = ${steps} WHERE id = ${id};`,
          // `INSERT INTO ${DB_PEDOMETER_TABLE} (id, steps) VALUES (${id}, ${steps})`,
          [],
          (_, { rows }) => {
            console.log('success ' + steps);
          }
        );
      });
    }
  });

  useEffect(() => {
      const id = dateToEpoch(getPreviousDate(6));
      db.transaction((tx) => {
      tx.executeSql(
        `select * from ${DB_PEDOMETER_TABLE} WHERE id >= ${id}`, 
        [], 
        (_, { rows }) => {
          setData(
            rows["_array"].map((x) => ({
              y: x.steps,
              x: epochToDate(x["id"]),
              // labels: x.steps,
            }))
          );
        }
      );
    });
  }, []);



  return (
    <View style={styles.container}>
      <DonutChart
        value={currentAppStepCount + currentDayStepCount}
        goal={goal}
      />
      <PedometerView />
      {/* <LineChart data={[
            { x: 1, y: 5 },
            { x: 2, y: 3 },
            { x: 3, y: 5 },
            { x: 4, y: 4 },
            { x: 5, y: 7 },
          ]} /> */}
      <LineChart data={data} />
    </View>
  );
};

const PedometerStack = createStackNavigator();

const PedometerStackScreen = ({ navigation }) => {
  const { colors } = useTheme();

  return (
    <PedometerStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.tabs.pedometer,
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
              backgroundColor={colors.tabs.pedometer}
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
