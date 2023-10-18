import { NavigationContainer } from "@react-navigation/native";
import Tabs from "./navigation/tabs";
import AppLoading from "expo-app-loading";
import {
  Montserrat_300Light,
  Montserrat_400Regular,
  Montserrat_700Bold,
  Montserrat_500Medium,
  useFonts,
} from "@expo-google-fonts/montserrat";
import { useState } from "react";
import { Text, View, Image, AppState } from "react-native";
import { COLORS } from "./constants/theme.js";
import { StatusBar } from "expo-status-bar";
import { AppContext } from "./Context";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "./HomeScreen";
import { LoginScreen } from "./LoginScreen";
import { PolyState } from "./PolyState";

const Stack = createNativeStackNavigator();

const App = () => {
  const [score, setScore] = useState(0);
  let [fontsLoaded, error] = useFonts({
    Montserrat_300Light,
    Montserrat_400Regular,
    Montserrat_700Bold,
    Montserrat_500Medium,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <PolyState>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            options={{ headerShown: false }}
            name="Login"
            component={LoginScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Home"
            component={HomeScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PolyState>
  );
};

export default App;
