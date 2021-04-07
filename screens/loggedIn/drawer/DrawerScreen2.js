import React, { useState } from "react";
import { StyleSheet, Text, View, StatusBar, Platform } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTheme } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Button } from "react-native-paper";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export const DrawerScreen2 = ({ navigation }) => {
  const { colors } = useTheme();
  const theme = useTheme();
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
    setNotifications(currentDate);
  };

  const setNotifications = (date) => {
    Notifications.cancelAllScheduledNotificationsAsync();
    Notifications.scheduleNotificationAsync({
      content: {
        title: "Pedometer",
        body: "Enter your weight for today!",
      },
      trigger: {
        repeats: true,
        hour: date.getHours(),
        minute: date.getMinutes(),
      },
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle={theme.dark ? "dark-content" : "light-content"} />
      <Text style={{ color: colors.text }}>
        Set the time you want to be reminded to enter your weight daily:
      </Text>
      <Button onPress={() => setShow(true)} mode="contained">
        Set time
      </Button>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="time"
          is24Hour={false}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};

const DrawerStack2 = createStackNavigator();

const DrawerStackScreen2 = ({ navigation }) => {
  const theme = useTheme();

  const color = theme.dark
    ? theme.colors.darkMode.status
    : theme.colors.lightMode.status;

  return (
    <DrawerStack2.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: color,
        },
        headerTintColor: "#fff",
      }}
    >
      <DrawerStack2.Screen
        name="Drawer2"
        component={DrawerScreen2}
        options={{
          title: "Notifications",
          headerLeft: () => (
            <Icon.Button
              name="menu"
              size={25}
              backgroundColor={color}
              onPress={() => navigation.openDrawer()}
            ></Icon.Button>
          ),
        }}
      />
    </DrawerStack2.Navigator>
  );
};

export default DrawerStackScreen2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
