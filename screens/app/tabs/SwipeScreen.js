import React from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTheme } from "@react-navigation/native";

export const SwipeScreen = ({ navigation }) => {
  const { colors } = useTheme();

  const theme = useTheme();

  return (
    <View style={styles.container}>
      <StatusBar barStyle={theme.dark ? "dark-content" : "light-content"} />
      <Text style={{ color: colors.text }}>Swipe screen</Text>
    </View>
  );
};

const SwipeStack = createStackNavigator();

const SwipeStackScreen = ({ navigation }) => {
  const { colors } = useTheme();

  return (
    <SwipeStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.tabs.swipe,
        },
        headerTintColor: colors.components.headerTintColor,
      }}
    >
      <SwipeStack.Screen
        name="Swipe"
        component={SwipeScreen}
        options={{
          title: "Swipe",
          headerLeft: () => (
            <Icon.Button
              name="menu"
              size={25}
              backgroundColor={colors.tabs.swipe}
              onPress={() => navigation.openDrawer()}
            ></Icon.Button>
          ),
        }}
      />
    </SwipeStack.Navigator>
  );
};

export default SwipeStackScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
