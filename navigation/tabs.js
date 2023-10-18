import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Animated,
  TouchableWithoutFeedback,
} from "react-native";
import { useState } from "react";
import Theory from "../screens/Theory";
import Practice from "../screens/Practice";
import Statistics from "../screens/Statistics";
import Icon_theory from "../assets/theory.png";
import { useEffect, useRef } from "react";

const Tab = createBottomTabNavigator();

const Tabs = ({ navigation }) => {
  const scale = useRef(new Animated.Value(1)).current;
  const upperPractice = useRef(new Animated.Value(0)).current;
  const upperTheory = useRef(new Animated.Value(0)).current;
  const upperStatistics = useRef(new Animated.Value(0)).current;
  const funcUpper = (upper) => {
    Animated.sequence([
      Animated.timing(upper, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(upper, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  useEffect(() => {
    Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.spring(scale, {
            toValue: 1.2,
            speed: 1,
            useNativeDriver: true,
          }),
          Animated.spring(scale, {
            toValue: 1,
            speed: 1,
            useNativeDriver: true,
          }),
        ]),
      ]),
      { iterations: 1 }
    ).start();
  }, []);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 25,
          left: 20,
          right: 20,
          elevation: 0,
          backgroundColor: "#ffffff",
          borderRadius: 15,
          height: 90,
          ...styles.shadow,
        },
      }}
    >
      <Tab.Screen
        name="Theory"
        component={Theory}
        options={{
          tabBarIcon: ({ focused }) => (
            <Animated.View
              style={{
                alignItems: "center",
                justifyContent: "center",
                transform: [{ scale }],
              }}
            >
              <TouchableWithoutFeedback
                onPress={() => {
                  navigation.navigate("Theory");
                  funcUpper(upperTheory);
                }}
              >
                <Animated.Image
                  source={Icon_theory}
                  resizeMode="contain"
                  style={{
                    width: 50,
                    height: 50,
                    transform: [
                      {
                        translateY: upperTheory.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0, -10],
                        }),
                      },
                    ],
                  }}
                />
              </TouchableWithoutFeedback>

              <Text
                style={{
                  color: focused ? "#4285f4" : "#748c94",
                  fontSize: 12,
                  fontFamily: "Montserrat_400Regular",
                }}
              >
                ТЕОРИЯ
              </Text>
            </Animated.View>
          ),
        }}
      />
      <Tab.Screen
        name="Practice"
        component={Practice}
        options={{
          tabBarIcon: ({ focused }) => (
            <Animated.View
              style={{
                alignItems: "center",
                justifyContent: "center",
                bottom: 30,
                transform: [{ scale }],
              }}
            >
              <TouchableWithoutFeedback
                onPress={() => {
                  navigation.navigate("Practice");
                  funcUpper(upperPractice);
                }}
              >
                <Animated.Image
                  source={require("../assets/practice.png")}
                  resizeMode="contain"
                  style={{
                    width: 100,
                    height: 100,
                    transform: [
                      {
                        translateY: upperPractice.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0, -10],
                        }),
                      },
                    ],
                  }}
                />
              </TouchableWithoutFeedback>
              <Text
                style={{
                  color: focused ? "#4285f4" : "#748c94",
                  fontSize: 16,
                  fontFamily: "Montserrat_700Bold",
                }}
              >
                ПРАКТИКА
              </Text>
            </Animated.View>
          ),
        }}
      />
      <Tab.Screen
        name="Statistics"
        component={Statistics}
        options={{
          navigation: navigation,
          tabBarIcon: ({ focused }) => (
            <Animated.View
              style={{
                alignItems: "center",
                justifyContent: "center",
                transform: [{ scale }],
              }}
            >
              <TouchableWithoutFeedback
                onPress={() => {
                  navigation.navigate("Statistics");
                  funcUpper(upperStatistics);
                }}
              >
                <Animated.Image
                  source={require("../assets/bstatistics.png")}
                  resizeMode="contain"
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 100,
                    transform: [
                      {
                        translateY: upperStatistics.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0, -10],
                        }),
                      },
                    ],
                  }}
                />
              </TouchableWithoutFeedback>
              <Text
                style={{
                  color: focused ? "#4285f4" : "#748c94",
                  fontSize: 12,
                  fontFamily: "Montserrat_400Regular",
                }}
              >
                СТАТИСТИКА
              </Text>
            </Animated.View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#7f5df0",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});

export default Tabs;
