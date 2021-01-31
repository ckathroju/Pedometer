import React from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTheme } from "@react-navigation/native";

export const SeenScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <StatusBar barStyle={theme.dark ? "dark-content" : "light-content"} />
      <Text style={{ color: colors.text }}>Seen screen</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default SeenStackScreen;
