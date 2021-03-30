import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTheme } from "@react-navigation/native";
import * as SQLite from "expo-sqlite";
import { DB_FILE, DB_WEIGHT_TABLE, DB_HEIGHT_TABLE } from "../../../constants";
import LineChart from "../../../components/LineChart"
import { Line } from "react-chartjs-2";

import { epochToDate, dateToEpoch, getPreviousDate } from "../../../utils/datetime";

const db = SQLite.openDatabase(DB_FILE);

export const TabScreen3 = ({ navigation }) => {
  // useEffect(() => {
  //   db.transaction((tx) => {
  //     tx.executeSql(`select * from ${DB_PEDOMETER_TABLE}`, [], (_, { rows }) =>
  //       console.log(JSON.stringify(rows))
  //     );
  //   });
  // }, []);

  const [data, setData] = useState([]);

  useEffect(() => {
      const id = dateToEpoch(getPreviousDate(6));
      db.transaction((tx) => {
      tx.executeSql(
        `select * from ${DB_WEIGHT_TABLE} WHERE id >= ${id}`, 
        [], 
        (_, { rows }) => {
          setData(
            rows["_array"].map((x) => ({
              // bmi formula is kg/m^2 
              y: (Math.floor((Number(x.weight * 0.453592)/ (1.75*1.75)*100)))/ 100,
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
      <Text>Body Mass Index for Past Week</Text>
      <LineChart data={data}/>
    </View>
  );
};
// testing 123
const TabStack3 = createStackNavigator();

const TabStackScreen3 = ({ navigation }) => {
  const { colors } = useTheme();

  return (
    <TabStack3.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.tabs.tab3,
        },
        headerTintColor: colors.components.headerTintColor,
      }}
    >
      <TabStack3.Screen
        name="BMI"
        component={TabScreen3}
        options={{
          title: "BMI",
          headerLeft: () => (
            <Icon.Button
              name="menu"
              size={25}
              backgroundColor={colors.tabs.tab3}
              onPress={() => navigation.openDrawer()}
            ></Icon.Button>
          ),
        }}
      />
    </TabStack3.Navigator>
  );
};

export default TabStackScreen3;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
