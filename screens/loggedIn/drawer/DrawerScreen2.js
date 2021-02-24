import React from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTheme } from "@react-navigation/native";

export const DrawerScreen2 = ({ navigation }) => {
  const { colors } = useTheme();

  const theme = useTheme();

  return (
    <View style={styles.container}>
      <StatusBar barStyle={theme.dark ? "dark-content" : "light-content"} />
      <Text style={{ color: colors.text }}>Drawer2</Text>
    </View>
  );
};

const DrawerStack2 = createStackNavigator();

const DrawerStackScreen2 = ({ navigation }) => (
  <DrawerStack2.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "#8bc34a",
      },
      headerTintColor: "#fff",
    }}
  >
    <DrawerStack2.Screen
      name="Drawer2"
      component={DrawerScreen2}
      options={{
        title: "Drawer2",
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
  </DrawerStack2.Navigator>
);

export default DrawerStackScreen2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
