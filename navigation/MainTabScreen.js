import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PedometerStackScreen from "../screens/loggedIn/tabs/PedometerScreen";
import WatchListStackScreen from "../screens/loggedIn/tabs/WatchListScreen";
import ApprovedStackScreen from "../screens/loggedIn/tabs/ApprovedScreen";
import DisapprovedStackScreen from "../screens/loggedIn/tabs/DisapprovedScreen";
import SeenStackScreen from "../screens/loggedIn/tabs/SeenScreen";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTheme } from "@react-navigation/native";
import TabBarContent from "./TabBarContent";
import FilterStackScreen from "../screens/loggedIn/drawer/FilterScreen";
import ProfileStackScreen from "../screens/loggedIn/drawer/ProfileScreen";
import SupportStackScreen from "../screens/loggedIn/drawer/SupportScreen";
import AboutStackScreen from "../screens/loggedIn/drawer/AboutScreen";

const Tab = createBottomTabNavigator();

const MainTabScreen = () => {
  const { colors } = useTheme();
  return (
    <Tab.Navigator
      initialRouteName="Pedometer"
      activeColor={colors.components.activeTab}
      tabBar={(props) => <TabBarContent {...props} />}
    >
      <Tab.Screen
        name="Pedometer"
        component={PedometerStackScreen}
        options={{
          tabBarLabel: "Pedometer",
          tabBarColor: colors.tabs.pedometer,
          tabBarIcon: ({ color }) => (
            <Icon name="cards-outline" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Approved"
        component={ApprovedStackScreen}
        options={{
          tabBarLabel: "Approved",
          tabBarColor: colors.tabs.approved,
          tabBarIcon: ({ color }) => (
            <Icon name="thumb-up-outline" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Disapproved"
        component={DisapprovedStackScreen}
        options={{
          tabBarLabel: "Disapproved",
          tabBarColor: colors.tabs.disapproved,
          tabBarIcon: ({ color }) => (
            <Icon name="thumb-down-outline" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Seen"
        component={SeenStackScreen}
        options={{
          tabBarLabel: "Seen",
          tabBarColor: colors.tabs.seen,
          tabBarIcon: ({ color }) => (
            <Icon name="television-off" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="WatchList"
        component={WatchListStackScreen}
        options={{
          tabBarLabel: "Watch List",
          tabBarColor: colors.tabs.watchlist,
          tabBarIcon: ({ color }) => (
            <Icon name="television-guide" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen name="Filter" component={FilterStackScreen} />
      <Tab.Screen name="Profile" component={ProfileStackScreen} />
      <Tab.Screen name="Support" component={SupportStackScreen} />
      <Tab.Screen name="About" component={AboutStackScreen} />
    </Tab.Navigator>
  );
};

export default MainTabScreen;
