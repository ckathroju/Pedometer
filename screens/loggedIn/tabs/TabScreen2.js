import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTheme } from "@react-navigation/native";
import { getCurrentDateInEpoch, epochToDate } from "../../../utils/datetime";
import * as SQLite from "expo-sqlite";
import { TextInput, Button, DataTable } from "react-native-paper";
//imported this from constants
import { DB_FILE, DB_WEIGHT_TABLE } from "../../../constants";

const db = SQLite.openDatabase(DB_FILE);

export const TabScreen2 = ({ navigation }) => {
  const { colors } = useTheme();
  const theme = useTheme();
  const [data, setData] = useState(null);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    db.transaction((tx) => {
      tx.executeSql(`SELECT * FROM ${DB_WEIGHT_TABLE}`, [], (_, { rows }) => {
        console.log(JSON.stringify(rows["_array"]));
        setTableData(rows["_array"]);
      });
    });
  };

  const saveData = () => {
    const id = getCurrentDateInEpoch();
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO ${DB_WEIGHT_TABLE} (id, weight) VALUES (${id}, ${data})`,
        [],
        (_, { rows }) => console.log("success insert")
      );
    });
  };

  return (
    <View>
      <View>
        <StatusBar barStyle={theme.dark ? "dark-content" : "light-content"} />
        <Text style={{ color: colors.text }}>Enter your weight today.</Text>
        <TextInput
          label="Weight"
          value={data}
          onChangeText={(text) => setData(text)}
          keyboardType="decimal-pad"
        />
        <Button mode="contained" onPress={() => saveData()}>
          Save Weight
        </Button>
      </View>
      <View>
        <View>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Date</DataTable.Title>
              <DataTable.Title>Weight</DataTable.Title>
            </DataTable.Header>
            {tableData.map((x) => {
              return (
                <DataTable.Row key={x.id}>
                  <DataTable.Cell>
                    {epochToDate(x.id).toDateString()}
                  </DataTable.Cell>
                  <DataTable.Cell>{x.weight}</DataTable.Cell>
                </DataTable.Row>
              );
            })}
          </DataTable>
        </View>
      </View>
    </View>
  );
};

const TabStack2 = createStackNavigator();

const TabStackScreen2 = ({ navigation }) => {
  const { colors } = useTheme();

  return (
    <TabStack2.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.tabs.tab2,
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
              backgroundColor={colors.tabs.tab2}
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
