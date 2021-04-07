import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View, StatusBar } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTheme } from "@react-navigation/native";
import * as SQLite from "expo-sqlite";
import { DB_FILE, DB_WEIGHT_TABLE, DB_HEIGHT_TABLE, DB_PEDOMETER_TABLE } from "../../../constants";
import LineChart from "../../../components/LineChart"
import { Line } from "react-chartjs-2";
import { TextInput, DataTable } from "react-native-paper";

import { epochToDate, dateToEpoch, getPreviousDate, getCurrentDateInEpoch, getCurrentDate } from "../../../utils/datetime";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

const db = SQLite.openDatabase(DB_FILE);

export const TabScreen3 = ({ navigation }) => {
  const { colors } = useTheme();
  const theme = useTheme();

  const [data, setData] = useState([]);
  const [weight, setWeight] = useState([]);
  const [steps, setSteps] = useState([]);
  const [visibleView, setVisibleView] = useState('BMI') // 'BMI', 'WEIGHT', 'STEPS'

  const [tableData, setTableData] = useState([]);

  // const [tableData, setTableData] = useState({
  //   weight: [],
  //   steps: [],
  //   bmi: []
  // });

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    const id = getCurrentDateInEpoch();
    db.transaction((tx) => {
      tx.executeSql(`SELECT * FROM ${DB_PEDOMETER_TABLE} LEFT JOIN ${DB_WEIGHT_TABLE} on ${DB_PEDOMETER_TABLE}.id=${DB_WEIGHT_TABLE}.id`, [], (_, { rows }) => {
        setTableData(rows["_array"]);
      });
    });
  };

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
              y: Number((Math.floor((Number(x.weight * 0.453592) / (1.75 * 1.75) * 100))) / 100),
              x: epochToDate(x["id"]),
              // labels: x.steps,
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
        `select * from ${DB_WEIGHT_TABLE} WHERE id >= ${id}`,
        [],
        (_, { rows }) => {
          setWeight(
            rows["_array"].map((x) => ({

              y: Number(x.weight),
              x: epochToDate(x["id"]),

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
              x: epochToDate(x["id"]),
              // labels: x.steps,
            }))
          );
        }
      );
    });
  }, []);



  return (
    <ScrollView>
      <View>
        <StatusBar barStyle={theme.dark ? "dark-content" : "light-content"} />
      </View>
      <View style={styles.container}>
        <View style={styles.buttons}>
          <Button title="BMI" onPress={() => setVisibleView('BMI')}/>
          <Button title="Weight" onPress={() => setVisibleView('WEIGHT')} />
          <Button title="Steps" onPress={() => setVisibleView('STEPS')} />
        </View>
        
        {visibleView === 'BMI' &&
          <>
            <Text>Displaying BMI over the past week</Text>
            <LineChart data={data} />
          </>
        }
        {visibleView === 'WEIGHT' &&
          <>
            <Text>Displaying weight over the past week</Text>
            <LineChart data={weight} />
            
          </>
        }
        {visibleView === 'STEPS' &&
          <>
            <Text>Displaying steps over the past week</Text>
            <LineChart data={steps} />
          </>
        }
      </View>
      <View>
        <View>
          <View>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title>Date</DataTable.Title>
                <DataTable.Title>Weight</DataTable.Title>
                <DataTable.Title>BMI</DataTable.Title>
                <DataTable.Title>Steps</DataTable.Title>
              </DataTable.Header>
              {tableData.map((x) => {
                return (
                  <DataTable.Row key={x.id}>
                    <DataTable.Cell>
                      {epochToDate(x.id).toDateString()}
                    </DataTable.Cell>
                    <DataTable.Cell>{x.weight}</DataTable.Cell>
                    <DataTable.Cell>{Number((Math.floor((Number(x.weight * 0.453592) / (1.75 * 1.75) * 100))) / 100)}</DataTable.Cell>
                    <DataTable.Cell>{x.steps}</DataTable.Cell>
                  </DataTable.Row>
                );
              })}
            </DataTable>
          </View>
        </View>
      </View>
    </ScrollView>
    
  );
};

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
        name="Trends"
        component={TabScreen3}
        options={{
          title: "Trends",
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
  buttons: {

    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 10,
    paddingBottom: 20
  }
});
