import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useTheme } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const visibleTabs = ["Swipe", "Approved", "Disapproved", "Seen", "WatchList"];
const iconMap = {
  Swipe: "cards-outline",
  Approved: "thumb-up-outline",
  Disapproved: "thumb-down-outline",
  Seen: "television-off",
  WatchList: "television-guide",
};

const TabBarContent = ({ state, descriptors, navigation }) => {
  const { colors } = useTheme();
  const routes = state.routes.filter((x) => visibleTabs.includes(x.name));
  const currentTabKey = state.history[state.history.length - 1].key;
  const currentTab = currentTab
    ? "Swipe"
    : state.routes.filter((x) => x.key === currentTabKey)[0].name;
  const tabBackgroundColor = visibleTabs.includes(currentTab)
    ? colors.tabs[currentTab.toLowerCase()]
    : colors.components.base;
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        backgroundColor: tabBackgroundColor,
        paddingVertical: 5,
      }}
    >
      {routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityStates={isFocused ? ["selected"] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            style={{ flex: 1 }}
          >
            <View style={{ display: "flex", flexDirection: "column" }}>
              <Icon
                name={iconMap[route.name]}
                color={isFocused ? "#fff" : "grey"}
                size={26}
                style={{ textAlign: "center" }}
              />
              <Text
                style={{
                  color: isFocused ? "#fff" : "grey",
                  fontSize: 10,
                  textAlign: "center",
                }}
              >
                {label}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default TabBarContent;
