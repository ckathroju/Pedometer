import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PedometerStackScreen from "../screens/loggedIn/tabs/PedometerScreen";
import TabStackScreen3 from "../screens/loggedIn/tabs/TabScreen3";
import TabStackScreen4 from "../screens/loggedIn/tabs/TabScreen4";
import TabStackScreen2 from "../screens/loggedIn/tabs/TabScreen2";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTheme } from "@react-navigation/native";
import TabBarContent from "./TabBarContent";
import DrawerStackScreen2 from "../screens/loggedIn/drawer/DrawerScreen2";
import DrawerStackScreen1 from "../screens/loggedIn/drawer/DrawerScreen1";

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
        name="Tab2"
        component={TabStackScreen2}
        options={{
          tabBarLabel: "Tab2",
          tabBarColor: colors.tabs.tab2,
          tabBarIcon: ({ color }) => (
            <Icon name="thumb-up-outline" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Tab3"
        component={TabStackScreen3}
        options={{
          tabBarLabel: "Tab4",
          tabBarColor: colors.tabs.tab3,
          tabBarIcon: ({ color }) => (
            <Icon name="thumb-up-outline" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Tab4"
        component={TabStackScreen4}
        options={{
          tabBarLabel: "Tab4",
          tabBarColor: colors.tabs.tab4,
          tabBarIcon: ({ color }) => (
            <Icon name="thumb-down-outline" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen name="Drawer1" component={DrawerStackScreen1} />
      <Tab.Screen name="Drawer2" component={DrawerStackScreen2} />
    </Tab.Navigator>
  );
};

export default MainTabScreen;
