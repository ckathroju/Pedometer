import React, { useState } from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTheme } from "@react-navigation/native";
import { dateToEpoch } from "../../../utils/datetime";
import * as SQLite from "expo-sqlite";
import { TextInput, Button } from "react-native-paper";
//imported this from constants
import { DB_FILE, DB_WEIGHT_TABLE } from "../../../constants";

const db = SQLite.openDatabase(DB_FILE);

export const TabScreen2 = ({ navigation }) => {
  const { colors } = useTheme();
  const theme = useTheme();
  const [data, setData] = useState(null);

  //look at line 23
  const saveData = () => {
    const dt = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate()
    );
    const id = dateToEpoch(dt);
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
      <StatusBar barStyle={theme.dark ? "dark-content" : "light-content"} />
      <Text style={{ color: colors.text }}>Enter your weight today.</Text>
      <TextInput
        label="Weight"
        value={data}
        onChangeText={(text) => setData(text)}
      />
      <Button mode="contained" onPress={() => saveData()}>
        Save Weight
      </Button>
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
          title: "Tab2",
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
