import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { AppContext } from "../Context";
import { COLORS } from "../constants";

export default function Statics({ navigation }) {
  const {
    setLoggedIn,
    heartInterval,
    file,
    login,
    numberInRating,
    setStateDefault,
    setNumberInRating,
  } = useContext(AppContext);

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          // backgroundColor: "white",
          width: "100%",
          marginBottom: 30,
        }}
      >
        <Text
          style={{
            color: "white",
            fontFamily: "Montserrat_300Light",
            fontSize: 18,
          }}
        >
          {login}, ваш номер в рейтинге {numberInRating}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          // backgroundColor: "white",
          width: "100%",
          marginBottom: 10,
        }}
      >
        <Text
          style={{
            color: "white",
            fontFamily: "Montserrat_500Medium",
            fontSize: 18,
          }}
        >
          Рейтинг
        </Text>
        <TouchableOpacity
          // title="Выход"
          onPress={() => {
            setLoggedIn(false);
            setStateDefault();
            setNumberInRating("пока не известен");
            // clearInterval(heartInterval);
          }}
        >
          <View
            style={{
              backgroundColor: COLORS.accent,
              width: "100%",
              paddingVertical: 10,
              paddingHorizontal: 25,
              borderRadius: 10,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "white",
                fontFamily: "Montserrat_500Medium",
                fontSize: 15,
              }}
            >
              Выход
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <FlatList
        style={{ width: "100%", marginBottom: "30%", overflow: "hidden" }}
        data={file}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              display: "flex",
              flexDirection: "row",
              marginTop: 20,
              marginRight: 0,
              borderWidth: 3,
              borderColor: "#4285f4",
              borderRadius: 15,
              width: "100%",
              backgroundColor: "#fff",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* <Image
              source={item.img}
              style={{
                width: 120,
                height: 120,
                borderRadius: 10,
              }}
            /> */}
            <Text
              style={{
                padding: 10,
                flexShrink: 1,
                fontFamily: "Montserrat_700Bold",
                fontSize: 20,
              }}
            >
              {item.key}
            </Text>
            <Text
              style={{
                padding: 10,
                flexShrink: 1,
                fontFamily: "Montserrat_500Medium",
                fontSize: 20,
              }}
            >
              {item.points}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    alignItems: "center",
    alignContent: "center",
    backgroundColor: "#252c4a",
  },
});
