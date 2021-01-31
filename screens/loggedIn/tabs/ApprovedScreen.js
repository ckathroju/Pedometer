import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTheme } from "@react-navigation/native";

export const ApprovedScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Approved</Text>
      <Button
        title="Details screen"
        onPress={() => navigation.navigate("Details")}
      />
    </View>
  );
};

const ApprovedStack = createStackNavigator();

const ApprovedStackScreen = ({ navigation }) => {
  const { colors } = useTheme();

  return (
    <ApprovedStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.tabs.approved,
        },
        headerTintColor: colors.components.headerTintColor,
      }}
    >
      <ApprovedStack.Screen
        name="Approved"
        component={ApprovedScreen}
        options={{
          title: "Approved",
          headerLeft: () => (
            <Icon.Button
              name="menu"
              size={25}
              backgroundColor={colors.tabs.approved}
              onPress={() => navigation.openDrawer()}
            ></Icon.Button>
          ),
        }}
      />
    </ApprovedStack.Navigator>
  );
};

export default ApprovedStackScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
