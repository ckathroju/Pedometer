import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTheme } from "@react-navigation/native";

export const WatchListScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Watch List screen</Text>
    </View>
  );
};

const WatchListStack = createStackNavigator();

const WatchListStackScreen = ({ navigation }) => {
  const { colors } = useTheme();

  return (
    <WatchListStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.tabs.watchlist,
        },
        headerTintColor: colors.components.headerTintColor,
      }}
    >
      <WatchListStack.Screen
        name="WatchList"
        component={WatchListScreen}
        options={{
          headerLeft: () => (
            <Icon.Button
              name="menu"
              size={25}
              backgroundColor={colors.tabs.watchlist}
              onPress={() => navigation.openDrawer()}
            ></Icon.Button>
          ),
        }}
      />
    </WatchListStack.Navigator>
  );
};

export default WatchListStackScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
