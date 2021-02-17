import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTheme } from "@react-navigation/native";

export const TabScreen4 = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Tab4</Text>
    </View>
  );
};

const TabStack4 = createStackNavigator();

const TabStackScreen4 = ({ navigation }) => {
  const { colors } = useTheme();

  return (
    <TabStack4.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.tabs.tab4,
        },
        headerTintColor: colors.components.headerTintColor,
      }}
    >
      <TabStack4.Screen
        name="Tab4"
        component={TabScreen4}
        options={{
          title: "Tab4",
          headerLeft: () => (
            <Icon.Button
              name="menu"
              size={25}
              backgroundColor={colors.tabs.tab4}
              onPress={() => navigation.openDrawer()}
            ></Icon.Button>
          ),
        }}
      />
    </TabStack4.Navigator>
  );
};

export default TabStackScreen4;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
