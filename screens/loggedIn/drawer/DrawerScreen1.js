import React from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTheme } from "@react-navigation/native";

export const DrawerScreen1 = ({ navigation }) => {
  const { colors } = useTheme();

  const theme = useTheme();

  return (
    <View style={styles.container}>
      <StatusBar barStyle={theme.dark ? "dark-content" : "light-content"} />
      <Text style={{ color: colors.text }}>Drawer1</Text>
    </View>
  );
};

const DrawerStack1 = createStackNavigator();

const DrawerStackScreen1 = ({ navigation }) => (
  <DrawerStack1.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "#8bc34a",
      },
      headerTintColor: "#fff",
    }}
  >
    <DrawerStack1.Screen
      name="Drawer1"
      component={DrawerScreen1}
      options={{
        title: "Drawer1",
        headerLeft: () => (
          <Icon.Button
            name="menu"
            size={25}
            backgroundColor="#8bc34a"
            onPress={() => navigation.openDrawer()}
          ></Icon.Button>
        ),
      }}
    />
  </DrawerStack1.Navigator>
);

export default DrawerStackScreen1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
