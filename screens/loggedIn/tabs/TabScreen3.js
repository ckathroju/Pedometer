import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTheme } from "@react-navigation/native";
import * as SQLite from "expo-sqlite";
import { DB_FILE, DB_PEDOMETER_TABLE } from "../../../constants";

const db = SQLite.openDatabase(DB_FILE);

export const TabScreen3 = ({ navigation }) => {
  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(`select * from ${DB_PEDOMETER_TABLE}`, [], (_, { rows }) =>
        console.log(JSON.stringify(rows))
      );
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text>Tab3</Text>
    </View>
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
        name="Tab3"
        component={TabScreen3}
        options={{
          title: "Tab3",
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
