import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, StatusBar, ScrollView } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTheme } from "@react-navigation/native";
import {
  getCurrentDateInEpoch,
  epochToDate,
  getPreviousDate,
  dateToEpoch,
  getDateString,
  getDateMonthString,
} from "../../../utils/datetime";
import * as SQLite from "expo-sqlite";
import { TextInput, Button, DataTable } from "react-native-paper";
//imported this from constants
import { DB_FILE, DB_WEIGHT_TABLE } from "../../../constants";

//changes here.
import LineChart from "../../../components/LineChart";

const db = SQLite.openDatabase(DB_FILE);

export const TabScreen2 = ({ navigation }) => {
  const { colors } = useTheme();
  const theme = useTheme();
  const [data, setData] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    const id = getCurrentDateInEpoch();
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM ${DB_WEIGHT_TABLE} ORDER BY id DESC`,
        [],
        (_, { rows }) => {
          setTableData(rows["_array"]);
        }
      );
    });
  };

  const saveData = () => {
    const id = getCurrentDateInEpoch();
    db.transaction((tx) => {
      tx.executeSql(
        `REPLACE INTO ${DB_WEIGHT_TABLE}(id,weight) VALUES(${id},${data});`
      );
    });
    getData();
  };

  useEffect(() => {
    for (let i = 0; i < 10; i++) {
      const id = dateToEpoch(getPreviousDate(i));
      const weight = Math.floor(Math.random() * 100) + 100;
      // const steps = i * 100;
      db.transaction((tx) => {
        tx.executeSql(
          `INSERT INTO ${DB_WEIGHT_TABLE} (id, weight) VALUES (${id}, ${weight})`
        );
      });
    }
  });

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(`select * from ${DB_WEIGHT_TABLE}`, [], (_, { rows }) => {
        setChartData(
          rows["_array"].map((x) => ({
            y: Number(x.weight),
            x: getDateMonthString(epochToDate(x["id"])),
          }))
        );
      });
    });
  }, []);

  const [tabView, setTabView] = useState("TABLE");

  const createTabTextStyles = (tabName) => {
    return {
      textAlignVertical: "center",
      textDecorationLine: tabView === tabName ? "underline" : null,
      fontWeight: tabView === tabName ? "bold" : null,
      fontSize: tabView === tabName ? 25 : 20,
      color: theme.dark ? "white" : "black",
    };
  };

  return (
    <ScrollView>
      <View>
        <View>
          <StatusBar barStyle={theme.dark ? "dark-content" : "light-content"} />
          <View
            style={{
              backgroundColor: theme.dark
                ? theme.colors.darkMode.background
                : "#D2EAFF",
              height: 50,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <Text
              style={createTabTextStyles("TABLE")}
              onPress={() => setTabView("TABLE")}
            >
              Table View
            </Text>
            <Text
              style={createTabTextStyles("CHART")}
              onPress={() => setTabView("CHART")}
            >
              Chart View
            </Text>
          </View>
        </View>
        {tabView === "TABLE" && (
          <View>
            <Text style={{ color: colors.text }}>Enter your weight today:</Text>
            <TextInput
              label="Weight"
              value={data}
              onChangeText={(text) => setData(text)}
              keyboardType="decimal-pad"
            />
            <Button mode="contained" onPress={() => saveData()}>
              Save Weight
            </Button>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title>Date</DataTable.Title>
                <DataTable.Title>Weight</DataTable.Title>
              </DataTable.Header>
              {tableData.map((x) => {
                return (
                  <DataTable.Row key={x.id}>
                    <DataTable.Cell>
                      {getDateString(epochToDate(x.id))}
                    </DataTable.Cell>
                    <DataTable.Cell>{x.weight}</DataTable.Cell>
                  </DataTable.Row>
                );
              })}
            </DataTable>
          </View>
        )}
        {tabView === "CHART" && <LineChart data={chartData} height={600} />}
      </View>
    </ScrollView>
  );
};

const TabStack2 = createStackNavigator();

const TabStackScreen2 = ({ navigation }) => {
  const { colors } = useTheme();
  const theme = useTheme();

  const color = theme.dark
    ? theme.colors.darkMode.status
    : theme.colors.lightMode.status;

  return (
    <TabStack2.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: color,
        },
        headerTintColor: colors.components.headerTintColor,
      }}
    >
      <TabStack2.Screen
        name="Tab2"
        component={TabScreen2}
        options={{
          title: "Weight",
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
    </TabStack2.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default TabStackScreen2;
