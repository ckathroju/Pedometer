import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTheme } from "@react-navigation/native";

export const DisapprovedScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Disapproved</Text>
      <Button
        title="Details screen"
        onPress={() => navigation.navigate("Details")}
      />
    </View>
  );
};

const DisapprovedStack = createStackNavigator();

const DisapprovedStackScreen = ({ navigation }) => {
  const { colors } = useTheme();

  return (
    <DisapprovedStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.tabs.disapproved,
        },
        headerTintColor: colors.components.headerTintColor,
      }}
    >
      <DisapprovedStack.Screen
        name="Disapproved"
        component={DisapprovedScreen}
        options={{
          title: "Disapproved",
          headerLeft: () => (
            <Icon.Button
              name="menu"
              size={25}
              backgroundColor={colors.tabs.disapproved}
              onPress={() => navigation.openDrawer()}
            ></Icon.Button>
          ),
        }}
      />
    </DisapprovedStack.Navigator>
  );
};

export default DisapprovedStackScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
