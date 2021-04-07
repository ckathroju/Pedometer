import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View, StatusBar } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTheme } from "@react-navigation/native";
import * as SQLite from "expo-sqlite";
import {
  DB_FILE,
  DB_WEIGHT_TABLE,
  DB_PEDOMETER_TABLE,
} from "../../../constants";
import LineChart from "../../../components/LineChart";
import {
  DataTable,
  Subheading,
  Menu,
  Button as RNPButton,
  Caption,
  Paragraph,
} from "react-native-paper";

import {
  epochToDate,
  dateToEpoch,
  getPreviousDate,
  getDateString,
  getDateMonthString,
} from "../../../utils/datetime";
import { ScrollView } from "react-native-gesture-handler";

const db = SQLite.openDatabase(DB_FILE);

export const TabScreen3 = () => {
  const theme = useTheme();

  const [data, setData] = useState([]);
  const [weight, setWeight] = useState([]);
  const [steps, setSteps] = useState([]);
  const [visibleView, setVisibleView] = useState("ALL"); // 'ALL', 'BMI', 'WEIGHT', 'STEPS'
  const [sortBy, setSortBy] = useState("DATE");
  const [sortDirMenuVisible, setSortDirMenuVisible] = React.useState(false);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    getData();
  }, [sortDir, sortBy]);

  const getData = (dir) => {
    let sortString = null;
    if (sortBy === "STEPS") {
      sortString = `ORDER BY CAST(${DB_PEDOMETER_TABLE}.steps as unsigned) ${
        dir || sortDir
      }`;
    } else if (sortBy === "BMI" || sortBy === "WEIGHT") {
      sortString = `ORDER BY CAST(${DB_WEIGHT_TABLE}.weight as unsigned) ${
        dir || sortDir
      }`;
    } else if (sortBy === "DATE") {
      sortString = `ORDER BY ${DB_PEDOMETER_TABLE}.id ${dir || sortDir}`;
    }
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM ${DB_PEDOMETER_TABLE} LEFT JOIN ${DB_WEIGHT_TABLE} on ${DB_PEDOMETER_TABLE}.id=${DB_WEIGHT_TABLE}.id ${sortString}`,
        [],
        (_, { rows }) => {
          setTableData(rows["_array"]);
        }
      );
    });
  };

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(`select * from ${DB_WEIGHT_TABLE}`, [], (_, { rows }) => {
        setData(
          rows["_array"].map((x) => ({
            // bmi formula is kg/m^2
            y: Number(
              Math.floor((Number(x.weight * 0.453592) / (1.75 * 1.75)) * 100) /
                100
            ),
            x: getDateMonthString(epochToDate(x["id"])),
            // labels: x.steps,
          }))
        );
      });
    });
  }, []);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(`select * from ${DB_WEIGHT_TABLE}`, [], (_, { rows }) => {
        setWeight(
          rows["_array"].map((x) => ({
            y: Number(x.weight),
            x: getDateMonthString(epochToDate(x["id"])),
          }))
        );
      });
    });
  }, []);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        `select * from ${DB_PEDOMETER_TABLE}`,
        [],
        (_, { rows }) => {
          setSteps(
            rows["_array"].map((x) => ({
              y: Number(x.steps),
              x: getDateMonthString(epochToDate(x["id"])),
              // labels: x.steps,
            }))
          );
        }
      );
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

  const [showMenuVisible, setShowMenuVisible] = React.useState(false);
  const [visibleColumns, setVisibleColumns] = React.useState({
    BMI: true,
    WEIGHT: true,
    STEPS: true,
  });
  const openShowMenu = () => setShowMenuVisible(true);
  const closeShowMenu = () => setShowMenuVisible(false);

  const handleShowMenuPress = (key) => {
    setVisibleColumns((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
    closeShowMenu();
  };
  useEffect(() => {
    if (sortBy !== "DATE" && visibleColumns[sortBy] === false) {
      setSortBy("DATE");
    }
  }, [visibleColumns]);

  const [sortMenuVisible, setSortMenuVisible] = React.useState(false);
  const [sortDir, setSortDir] = useState("DESC");
  const openSortMenu = () => setSortMenuVisible(true);
  const closeSortMenu = () => setSortMenuVisible(false);

  const handleSortMenuPress = (key) => {
    setSortBy(key);
    closeSortMenu();
  };

  const openSortDirMenu = () => setSortDirMenuVisible(true);
  const closeSortDirMenu = () => setSortDirMenuVisible(false);

  const handleSortDirMenuPress = (key) => {
    setSortDir(key);
    getData(key);
    closeSortDirMenu();
  };

  return (
    <ScrollView>
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
      {tabView === "CHART" && (
        <View style={styles.container}>
          <View style={styles.buttons}>
            <RNPButton onPress={() => setVisibleView("ALL")} mode="contained">
              All
            </RNPButton>
            <RNPButton
              onPress={() => setVisibleView("BMI")}
              mode="contained"
              style={{ marginLeft: 10 }}
            >
              BMI
            </RNPButton>
            <RNPButton
              onPress={() => setVisibleView("WEIGHT")}
              mode="contained"
              style={{ marginHorizontal: 10 }}
            >
              Weight
            </RNPButton>
            <RNPButton onPress={() => setVisibleView("STEPS")} mode="contained">
              Steps
            </RNPButton>
          </View>
          {visibleView === "ALL" && (
            <>
              <Subheading>Displaying all data over the past week</Subheading>
              <Caption>*Uses a square root scale*</Caption>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    height: 10,
                    width: 10,
                    backgroundColor: "red",
                    marginRight: 5,
                  }}
                />
                <Paragraph>BMI</Paragraph>
                <View
                  style={{
                    height: 10,
                    width: 10,
                    backgroundColor: "green",
                    marginHorizontal: 5,
                  }}
                />
                <Paragraph>Weight</Paragraph>
                <View
                  style={{
                    height: 10,
                    width: 10,
                    backgroundColor: "orange",
                    marginHorizontal: 5,
                  }}
                />
                <Paragraph>Steps</Paragraph>
              </View>
              <LineChart
                multiLine={true}
                multiData={[
                  { data: data, color: "red" },
                  { data: weight, color: "green" },
                  { data: steps, color: "orange" },
                ]}
                height={500}
              />
            </>
          )}
          {visibleView === "BMI" && (
            <>
              <Subheading>Displaying BMI over the past week</Subheading>
              <LineChart data={data} height={500} />
            </>
          )}
          {visibleView === "WEIGHT" && (
            <>
              <Subheading>Displaying weight over the week</Subheading>
              <LineChart data={weight} height={500} />
            </>
          )}
          {visibleView === "STEPS" && (
            <>
              <Subheading>Displaying steps throughout the day</Subheading>
              <LineChart data={steps} height={500} />
            </>
          )}
        </View>
      )}
      {tabView === "TABLE" && (
        <View>
          <View style={styles.buttons}>
            <Menu
              visible={showMenuVisible}
              onDismiss={closeShowMenu}
              anchor={
                <RNPButton onPress={openShowMenu}>Toggle columns</RNPButton>
              }
            >
              <Menu.Item
                onPress={() => handleShowMenuPress("WEIGHT")}
                title="Weight"
                titleStyle={{
                  textDecorationLine: visibleColumns.WEIGHT
                    ? null
                    : "line-through",
                }}
              />
              <Menu.Item
                onPress={() => handleShowMenuPress("BMI")}
                title="BMI"
                titleStyle={{
                  textDecorationLine: visibleColumns.BMI
                    ? null
                    : "line-through",
                }}
              />
              <Menu.Item
                onPress={() => handleShowMenuPress("STEPS")}
                title="Steps"
                titleStyle={{
                  textDecorationLine: visibleColumns.STEPS
                    ? null
                    : "line-through",
                }}
              />
            </Menu>
            <Menu
              visible={sortMenuVisible}
              onDismiss={closeSortMenu}
              anchor={
                <RNPButton onPress={openSortMenu}>Sort by: {sortBy}</RNPButton>
              }
            >
              <Menu.Item
                onPress={() => handleSortMenuPress("DATE")}
                title="Date"
              />
              {visibleColumns.WEIGHT && (
                <Menu.Item
                  onPress={() => handleSortMenuPress("WEIGHT")}
                  title="Weight"
                />
              )}
              {visibleColumns.BMI && (
                <Menu.Item
                  onPress={() => handleSortMenuPress("BMI")}
                  title="BMI"
                />
              )}
              {visibleColumns.STEPS && (
                <Menu.Item
                  onPress={() => handleSortMenuPress("STEPS")}
                  title="Steps"
                />
              )}
            </Menu>
            <Menu
              visible={sortDirMenuVisible}
              onDismiss={closeSortDirMenu}
              anchor={
                <RNPButton onPress={openSortDirMenu}>
                  Sort dir: {sortDir}
                </RNPButton>
              }
            >
              <Menu.Item
                onPress={() => handleSortDirMenuPress("ASC")}
                title="Asc"
              />
              <Menu.Item
                onPress={() => handleSortDirMenuPress("DESC")}
                title="Desc"
              />
            </Menu>
          </View>
          <View>
            <View>
              <DataTable>
                <DataTable.Header>
                  <DataTable.Title>Date</DataTable.Title>
                  {visibleColumns.WEIGHT && (
                    <DataTable.Title>Weight</DataTable.Title>
                  )}
                  {visibleColumns.BMI && <DataTable.Title>BMI</DataTable.Title>}
                  {visibleColumns.STEPS && (
                    <DataTable.Title>Steps</DataTable.Title>
                  )}
                </DataTable.Header>
                {tableData.map((x) => {
                  const bmi = Number(
                    Math.floor(
                      (Number(x.weight * 0.453592) / (1.75 * 1.75)) * 100
                    ) / 100
                  );
                  return (
                    <DataTable.Row key={x.id}>
                      <DataTable.Cell>
                        {getDateString(epochToDate(x.id))}
                      </DataTable.Cell>
                      {visibleColumns.WEIGHT && (
                        <DataTable.Cell>{x.weight}</DataTable.Cell>
                      )}
                      {visibleColumns.BMI && (
                        <DataTable.Cell>
                          {bmi === 0 ? null : bmi}
                        </DataTable.Cell>
                      )}
                      {visibleColumns.STEPS && (
                        <DataTable.Cell>{x.steps}</DataTable.Cell>
                      )}
                    </DataTable.Row>
                  );
                })}
              </DataTable>
            </View>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const TabStack3 = createStackNavigator();

const TabStackScreen3 = ({ navigation }) => {
  const { colors } = useTheme();
  const theme = useTheme();

  const color = theme.dark
    ? theme.colors.darkMode.status
    : theme.colors.lightMode.status;

  return (
    <TabStack3.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: color,
        },
        headerTintColor: colors.components.headerTintColor,
      }}
    >
      <TabStack3.Screen
        name="Trends"
        component={TabScreen3}
        options={{
          title: "Trends",
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
  buttons: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 10,
  },
});
