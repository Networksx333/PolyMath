import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Modal,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { COLORS } from "./constants";
// import { NavigationContainer } from "@react-navigation/native";
import { AppContext } from "./Context";
import { Ionicons } from "@expo/vector-icons";
import { Dimensions } from "react-native";

export const LoginScreen = ({ navigation }) => {
  const {
    state,
    exist,
    entered,
    login,
    password,
    register,
    changeLogin,
    changePassword,
    showWarningModal,
    loginInApp,
  } = useContext(AppContext);
  const [warning, setWarning] = useState(
    `Или такой пользователь уже есть, или пароль короче 6 символов, или имя короче 2-х`
  );

  useEffect(() => {
    if (entered) {
      navigation.navigate("Home");
    } else {
      navigation.navigate("Login");
    }
  }, [entered]);

  return (
    <View style={styles.container}>
      <Modal animationType="slide" transparent={false} visible={exist}>
        <View
          style={{
            paddingHorizontal: "15%",
            paddingTop: "50%",
            backgroundColor: COLORS.primary,
            height: "100%",
          }}
        >
          <Ionicons
            name="close-circle"
            size={34}
            color="red"
            style={{ marginTop: 20, textAlign: "center", marginBottom: 15 }}
            onPress={() => {
              showWarningModal(false);
              setWarning(
                "Или такой пользователь уже есть, или пароль короче 6 символов, или имя короче 2-х"
              );
            }}
          />
          <Text
            style={{
              textAlign: "center",
              color: COLORS.white,
              fontSize: 25,
              fontFamily: "Montserrat_700Bold",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {warning}
          </Text>
        </View>
      </Modal>
      <View style={styles.maskotContainer}>
        <Image
          source={require("./assets/bearOutline.png")}
          resizeMode="contain"
          style={styles.bear}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Никнейм"
          value={login}
          onChangeText={(text) => changeLogin(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Пароль"
          value={password}
          onChangeText={(text) => changePassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => {
            loginInApp(state);
            // if (!entered) {
            //   setWarning("Такого пользователя нет или неверный пароль");
            //   showWarningModal(true);
            // }
          }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Войти</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            register(state);
          }}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Зарегестрироваться</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="light" backgroundColor={COLORS.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:
      Dimensions.get("screen").height / Dimensions.get("screen").width > 2
        ? "4%"
        : "0%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.primary,
  },
  inputContainer: {
    width: "80%",
    // flex: 1,
  },
  input: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    fontFamily: "Montserrat_500Medium",
  },
  maskotContainer: {
    // backgroundColor: "white",
    width: "60%",
    height: "30%",
  },
  bear: {
    width: "100%",
    height: "100%",
  },
  buttonContainer: {
    // flex: 1,
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: COLORS.accent,
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontFamily: "Montserrat_700Bold",
    fontSize: 16,
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: COLORS.accent,
    borderWidth: 2,
  },
  buttonOutlineText: {
    color: COLORS.accent,
    fontFamily: "Montserrat_700Bold",
    fontSize: 16,
  },
});
