import React from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTheme } from "@react-navigation/native";

export const ProfileScreen = ({ navigation }) => {
  const { colors } = useTheme();

  const theme = useTheme();

  return (
    <View style={styles.container}>
      <StatusBar barStyle={theme.dark ? "dark-content" : "light-content"} />
      <Text style={{ color: colors.text }}>Profile Screen</Text>
    </View>
  );
};

const ProfileStack = createStackNavigator();

const ProfileStackScreen = ({ navigation }) => (
  <ProfileStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "#8bc34a",
      },
      headerTintColor: "#fff",
    }}
  >
    <ProfileStack.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        title: "Profile",
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
  </ProfileStack.Navigator>
);

export default ProfileStackScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
