import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, StatusBar, ScrollView } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTheme } from "@react-navigation/native";
import * as SQLite from "expo-sqlite";
import {
  getCurrentDateInEpoch,
  epochToDate,
  getDateString,
} from "../../../utils/datetime";
import { TextInput, Button, DataTable } from "react-native-paper";
import { DB_FILE, DB_HEIGHT_TABLE } from "../../../constants";
const db = SQLite.openDatabase(DB_FILE);

export const DrawerScreen1 = ({ navigation }) => {
  const { colors } = useTheme();
  const theme = useTheme();
  const [data, setData] = useState(null);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    db.transaction((tx) => {
      tx.executeSql(`SELECT * FROM ${DB_HEIGHT_TABLE}`, [], (_, { rows }) => {
        setTableData(rows["_array"]);
      });
    });
  };

  //look at line 23
  const saveData = () => {
    const id = getCurrentDateInEpoch();
    db.transaction((tx) => {
      tx.executeSql(
        `REPLACE INTO ${DB_HEIGHT_TABLE}(id,height) VALUES(${id},${data});`
      );
    });
    getData();
  };

  return (
    <ScrollView>
      <View>
        <StatusBar barStyle={theme.dark ? "dark-content" : "light-content"} />
        <Text style={{ color: colors.text }}>User Health Information</Text>
        <Text style={{ color: colors.text }}>
          If this information changes, update it here so that we can continue to
          track your information.
        </Text>
        <TextInput
          label="Height"
          value={data}
          onChangeText={(text) => setData(text)}
          keyboardType="decimal-pad"
        />
        <Button mode="contained" onPress={() => saveData()}>
          Save Height
        </Button>
      </View>
      <View>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Date</DataTable.Title>
            <DataTable.Title>Height</DataTable.Title>
          </DataTable.Header>
          {tableData.map((x) => {
            return (
              <DataTable.Row key={x.id}>
                <DataTable.Cell>
                  {getDateString(epochToDate(x.id))}
                </DataTable.Cell>
                <DataTable.Cell>{x.height}</DataTable.Cell>
              </DataTable.Row>
            );
          })}
        </DataTable>
      </View>
    </ScrollView>
  );
};

const DrawerStack1 = createStackNavigator();

const DrawerStackScreen1 = ({ navigation }) => {
  const theme = useTheme();

  const color = theme.dark
    ? theme.colors.darkMode.status
    : theme.colors.lightMode.status;

  return (
    <DrawerStack1.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: color,
        },
        headerTintColor: "#fff",
      }}
    >
      <DrawerStack1.Screen
        name="Drawer1"
        component={DrawerScreen1}
        options={{
          title: "Health Information",
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
    </DrawerStack1.Navigator>
  );
};

export default DrawerStackScreen1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
