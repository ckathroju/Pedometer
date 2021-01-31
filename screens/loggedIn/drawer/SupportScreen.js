import React from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTheme } from "@react-navigation/native";

export const SupportScreen = ({ navigation }) => {
  const { colors } = useTheme();

  const theme = useTheme();

  return (
    <View style={styles.container}>
      <StatusBar barStyle={theme.dark ? "dark-content" : "light-content"} />
      <Text style={{ color: colors.text }}>Support Screen</Text>
    </View>
  );
};

const SupportStack = createStackNavigator();

const SupportStackScreen = ({ navigation }) => (
  <SupportStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "#8bc34a",
      },
      headerTintColor: "#fff",
    }}
  >
    <SupportStack.Screen
      name="Support"
      component={SupportScreen}
      options={{
        title: "Support",
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
  </SupportStack.Navigator>
);

export default SupportStackScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
