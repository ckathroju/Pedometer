import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  Platform,
  StyleSheet,
  TouchableOpacity,
  Alert,
  StatusBar,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as Animatable from "react-native-animatable";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import { useTheme } from "@react-navigation/native";
import { AuthContext } from "../../contexts/context";
import { validateEmail, validatePassword } from "../../utils/validator";

const SignInScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const theme = useTheme();
  const styles = getStyles(colors);
  const [data, setData] = useState({
    email: "",
    password: "",
    check_emailInputChange: false,
    secureTextEntry: true,
    isValidEmail: true,
    isValidPassword: true,
  });
  const { signIn } = useContext(AuthContext);

  const handleEmailChange = (val) => {
    if (validateEmail(val)) {
      setData((prevState) => ({
        ...prevState,
        email: val,
        check_emailInputChange: true,
        isValidEmail: true,
      }));
    } else {
      setData((prevState) => ({
        ...prevState,
        email: val,
        check_emailInputChange: false,
        isValidEmail: false,
      }));
    }
  };

  const handlePasswordChange = (val) => {
    if (validatePassword(val)) {
      setData((prevState) => ({
        ...prevState,
        password: val,
        isValidPassword: true,
      }));
    } else {
      setData((prevState) => ({
        ...prevState,
        password: val,
        isValidPassword: false,
      }));
    }
  };

  const updateSecureTextEntry = () => {
    setData((prevState) => ({
      ...prevState,
      secureTextEntry: !prevState.secureTextEntry,
    }));
  };

  const handleLogin = () => {
    if (data.email.length === 0 || data.password.length === 0) {
      Alert.alert("Empty fields", "Email or password cannot be empty.", [
        { text: "Cancel", style: "cancel" },
      ]);
    } else if (!data.isValidEmail || !data.isValidPassword) {
      Alert.alert("Invalid details", "Email or password is invalid.", [
        { text: "Cancel", style: "cancel" },
      ]);
    } else {
      signIn(data.email, data.password);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle={theme.dark ? "dark-content" : "light-content"} />
      <View style={styles.header}>
        <Text style={styles.text_header}>Welcome!</Text>
      </View>
      <Animatable.View
        animation="fadeInUpBig"
        style={[styles.footer, { backgroundColor: colors.background }]}
      >
        <Text style={[styles.text_footer, { color: colors.text }]}>Email</Text>
        <View style={styles.action}>
          <FontAwesome name="envelope-o" color={colors.text} size={20} />
          <TextInput
            placeholder="Email address"
            style={[styles.textInput, { color: colors.text }]}
            autoCapitalize="none"
            onChangeText={(val) => handleEmailChange(val)}
          />
          {data.check_emailInputChange ? (
            <Animatable.View animation="bounceIn">
              <Feather name="check-circle" color="green" size={20} />
            </Animatable.View>
          ) : null}
        </View>
        {data.isValidEmail ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Must be a valid email address.</Text>
          </Animatable.View>
        )}
        <Text
          style={[styles.text_footer, { color: colors.text, marginTop: 35 }]}
        >
          Password
        </Text>
        <View style={styles.action}>
          <Feather name="lock" color={colors.text} size={20} />
          <TextInput
            placeholder="Password"
            secureTextEntry={data.secureTextEntry}
            style={[styles.textInput, { color: colors.text }]}
            autoCapitalize="none"
            onChangeText={(val) => handlePasswordChange(val)}
          />
          <TouchableOpacity onPress={() => updateSecureTextEntry()}>
            {data.secureTextEntry ? (
              <Feather name="eye-off" color="grey" size={20} />
            ) : (
              <Feather name="eye" color="grey" size={20} />
            )}
          </TouchableOpacity>
        </View>
        {data.isValidPassword ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>
              Password must be 8 characters long.
            </Text>
          </Animatable.View>
        )}

        <TouchableOpacity>
          <Text style={{ color: "#8bc34a", marginTop: 15 }}>
            Forgot password?
          </Text>
        </TouchableOpacity>
        <View style={styles.button}>
          <TouchableOpacity
            style={styles.signIn}
            onPress={() => {
              handleLogin();
            }}
          >
            <LinearGradient
              colors={["#08d4c4", "#01ab9d"]}
              style={styles.signIn}
            >
              <Text style={[styles.textSign, { color: "#fff" }]}>Sign In</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("SignUpScreen")}
            style={[
              styles.signIn,
              { borderColor: "#8bc34a", borderWidth: 1, marginTop: 15 },
            ]}
          >
            <Text style={[styles.textSign, { color: "#8bc34a" }]}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

export default SignInScreen;

const getStyles = (colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.components.base,
    },
    header: {
      flex: 1,
      justifyContent: "flex-end",
      paddingHorizontal: 20,
      paddingBottom: 50,
    },
    footer: {
      flex: 3,
      backgroundColor: colors.components.bgColor,
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingHorizontal: 20,
      paddingVertical: 30,
    },
    text_header: {
      color: colors.components.headerText,
      fontWeight: "bold",
      fontSize: 30,
    },
    text_footer: {
      fontSize: 18,
    },
    action: {
      flexDirection: "row",
      marginTop: 10,
      borderBottomWidth: 1,
      borderBottomColor: colors.components.actionBorderBottom,
      paddingBottom: 5,
    },
    textInput: {
      flex: 1,
      marginTop: Platform.OS === "ios" ? 0 : -12,
      paddingLeft: 10,
    },
    errorMsg: {
      color: colors.components.errorText,
      fontSize: 14,
    },
    button: {
      alignItems: "center",
      marginTop: 50,
    },
    signIn: {
      width: "100%",
      height: 50,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 10,
    },
    textSign: {
      fontSize: 18,
      fontWeight: "bold",
    },
  });
