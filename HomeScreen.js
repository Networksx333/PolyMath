import React, { useContext, useEffect } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { COLORS } from "./constants";
import { StatusBar } from "expo-status-bar";
// import { NavigationContainer } from "@react-navigation/native";
import Tabs from "./navigation/tabs";
import { AppContext } from "./Context";
import { Dimensions } from "react-native";

export const HomeScreen = ({ navigation }) => {
  const { state, crown, heart, powers, database, updateCrown, updateHeart } =
    useContext(AppContext);
  useEffect(() => {
    // fetchPutchUser(state, state.id);
    fetch(database + `users/${state.id}.json`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ crown, heart, powers }),
    });
  }, [crown, powers]);
  return (
    <View
      style={{
        flex: 1,
        marginTop:
          Dimensions.get("screen").height / Dimensions.get("screen").width > 2
            ? "4%"
            : "0%",
      }}
    >
      <View
        style={{
          height: "10%",
          backgroundColor: COLORS.primary,
          borderBottomWidth: 2,
          borderBottomColor: COLORS.white,
          justifyContent: "space-around",
          alignItems: "center",
          flexDirection: "row",
          // paddingHorizontal: "3%",
          paddingTop: "7%",
          paddingBottom: "0%",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={require("./assets/bcrown.png")}
            resizeMode="contain"
            style={{
              width: 35,
              height: 35,
              marginRight: 10,
            }}
          />
          <Text
            style={{
              color: COLORS.white,
              fontFamily: "Montserrat_700Bold",
              fontSize: 18,
            }}
          >
            {crown}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            activeOpacity={0}
            onPress={() => {
              if (crown >= 50) {
                updateHeart(1);
                updateCrown(-50);
              }
            }}
          >
            <Image
              source={require("./assets/bheart.png")}
              resizeMode="contain"
              style={{
                width: 36,
                height: 36,
                marginRight: 10,
              }}
            />
          </TouchableOpacity>
          <Text
            style={{
              color: COLORS.white,
              fontFamily: "Montserrat_700Bold",
              fontSize: 18,
            }}
          >
            {heart}
          </Text>
        </View>
      </View>
      <Tabs navigation={navigation} />
      <StatusBar
        style="light"
        hidden={false}
        backgroundColor={COLORS.primary}
      />
    </View>
  );
};
