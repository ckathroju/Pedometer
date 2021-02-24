import React from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTheme } from "@react-navigation/native";
import PedometerView from "../../../components/PedometerView";
import DonutChart from "../../../components/DonutChart";
import { useSelector } from "react-redux";

export const PedometerScreen = ({ navigation }) => {
  const currentAppStepCount = useSelector(
    (state) => state.pedometer.currentAppStepCount
  );
  const currentDayStepCount = useSelector(
    (state) => state.pedometer.currentDayStepCount
  );
  const setYesterdayStepCount = useSelector(
    (state) => state.pedometer.yesterdayStepCount
  );
  const goal = useSelector((state) => state.pedometer.goal);

  return (
    <View style={styles.container}>
      <DonutChart
        value={currentAppStepCount + currentDayStepCount}
        goal={goal}
      />
      <PedometerView />
    </View>
  );
};

const PedometerStack = createStackNavigator();

const PedometerStackScreen = ({ navigation }) => {
  const { colors } = useTheme();

  return (
    <PedometerStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.tabs.pedometer,
        },
        headerTintColor: colors.components.headerTintColor,
      }}
    >
      <PedometerStack.Screen
        name="Pedometer"
        component={PedometerScreen}
        options={{
          title: "Pedometer",
          headerLeft: () => (
            <Icon.Button
              name="menu"
              size={25}
              backgroundColor={colors.tabs.pedometer}
              onPress={() => navigation.openDrawer()}
            ></Icon.Button>
          ),
        }}
      />
    </PedometerStack.Navigator>
  );
};

export default PedometerStackScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
