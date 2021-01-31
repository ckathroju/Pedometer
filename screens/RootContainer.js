import React, { useMemo, useEffect, useReducer, useState } from "react";
import { View, Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Provider as PaperProvider } from "react-native-paper";
import { CustomDefaultTheme, CustomDarkTheme } from "../theme/theme";
import { createDrawerNavigator } from "@react-navigation/drawer";
import MainTabScreen from "../navigation/MainTabScreen";
import DrawerContent from "../navigation/DrawerContent";
import RootStackScreen from "./loggedOut/RootStackScreen";
import { ActivityIndicator } from "react-native-paper";
import { AuthContext } from "../contexts/context";
import AsyncStorage from "@react-native-community/async-storage";
import Server from "../utils/Server";

const Drawer = createDrawerNavigator();

const RootContainer = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const initialLoginState = {
    isLoading: true,
    email: null,
    userToken: null,
  };

  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case "RETRIEVE_TOKEN":
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case "LOGIN":
        return {
          ...prevState,
          email: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case "LOGOUT":
        return {
          ...prevState,
          email: null,
          userToken: null,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = useReducer(loginReducer, initialLoginState);

  const authContext = useMemo(
    () => ({
      signIn: async (email, password) => {
        let userToken = null;
        await Server.post("/api/user/login", {
          email,
          password,
        })
          .then(async (response) => {
            if (response.data.emailVerified) {
              userToken = response.headers["auth-token"];
              await AsyncStorage.setItem("userToken", userToken);
              dispatch({ type: "LOGIN", id: email, token: userToken });
            } else {
              Alert.alert("Email not verified", response.data.message, [
                { text: "Cancel", style: "cancel" },
                {
                  text: "Resend",
                  onPress: () => {
                    Server.post("/api/verify/resend", { email })
                      .then((response) => {
                        Alert.alert("Success", response.data.message, [
                          { text: "Cancel", style: "cancel" },
                        ]);
                      })
                      .catch((err) => {
                        Alert.alert("Error", err.response.data.message, [
                          { text: "Cancel", style: "cancel" },
                        ]);
                      });
                  },
                },
              ]);
            }
          })
          .catch((err) => {
            Alert.alert("Error", err.response.data.message, [
              { text: "Cancel", style: "cancel" },
            ]);
          });
      },
      signOut: async () => {
        try {
          await AsyncStorage.removeItem("userToken");
        } catch (e) {
          console.log(e);
        }
        dispatch({ type: "LOGOUT" });
      },
      signUp: async (name, email, password) => {
        await Server.post("/api/user/register", {
          name,
          email,
          password,
        })
          .then(() => {
            Alert.alert(
              "Success",
              "Please check your email for a verification email.",
              [
                {
                  text: "Cancel",
                  style: "cancel",
                },
              ]
            );
            return true;
          })
          .catch((err) => {
            Alert.alert("Error", err.response.data.message, [
              { text: "Cancel", style: "cancel" },
            ]);
            return false;
          });
      },
      toggleTheme: async () => {
        await AsyncStorage.setItem("isDarkTheme", (!isDarkTheme).toString());
        setIsDarkTheme((isDarkTheme) => !isDarkTheme);
      },
    }),
    []
  );

  useEffect(() => {
    setTimeout(async () => {
      // Get Dark Theme Status
      const isDarkTheme = await AsyncStorage.getItem("isDarkTheme");
      setIsDarkTheme(isDarkTheme == "true");
      // Get User Token
      let userToken = null;
      try {
        userToken = await AsyncStorage.getItem("userToken");
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: "RETRIEVE_TOKEN", token: userToken });
    }, 1000);
  }, []);

  if (loginState.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <PaperProvider theme={theme}>
      <AuthContext.Provider value={authContext}>
        <NavigationContainer theme={theme}>
          {loginState.userToken !== null ? (
            <Drawer.Navigator
              drawerContent={(props) => <DrawerContent {...props} />}
            >
              <Drawer.Screen name="SwipeDrawer" component={MainTabScreen} />
            </Drawer.Navigator>
          ) : (
            <RootStackScreen />
          )}
        </NavigationContainer>
      </AuthContext.Provider>
    </PaperProvider>
  );
};

export default RootContainer;
