import React from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTheme } from "@react-navigation/native";

export const TabScreen2 = ({ navigation }) => {
  const { colors } = useTheme();
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <StatusBar barStyle={theme.dark ? "dark-content" : "light-content"} />
      <Text style={{ color: colors.text }}>Tab2</Text>
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
