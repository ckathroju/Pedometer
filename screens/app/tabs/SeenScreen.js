import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTheme } from "@react-navigation/native";

export const SeenScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Seen</Text>
      <Button
        title="Details screen"
        onPress={() => navigation.navigate("Details")}
      />
    </View>
  );
};

const SeenStack = createStackNavigator();

const SeenStackScreen = ({ navigation }) => {
  const { colors } = useTheme();

  return (
    <SeenStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.tabs.seen,
        },
        headerTintColor: colors.components.headerTintColor,
      }}
    >
      <SeenStack.Screen
        name="Seen"
        component={SeenScreen}
        options={{
          title: "Seen",
          headerLeft: () => (
            <Icon.Button
              name="menu"
              size={25}
              backgroundColor={colors.tabs.seen}
              onPress={() => navigation.openDrawer()}
            ></Icon.Button>
          ),
        }}
      />
    </SeenStack.Navigator>
  );
};

export default SeenStackScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
