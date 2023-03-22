import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../Pages/Login/Index";
import CreateClient from "../Pages/CreateClient/Index";
import ContVeicles from "../Pages/ContVeicles/Index";
import Preload from "../Pages/Preload/Index";
import MainTab from "./MainTab";
import HomeScreen from "../Pages/Home/Index";
import ClientInfo from "../Pages/Feed/ClientInfos/ClientInfo";
import GridList from "../Pages/Feed/ClientInfos/GridList";

const Stack = createStackNavigator();
// function to navigate the screens
const AppRoutes = () => {
  return (
    <Stack.Navigator initialRouteName="Preload">
      <Stack.Screen
        name="Preload"
        options={{ headerShown: false }}
        component={Preload}
      />
      <Stack.Screen
        name="Home_Screen"
        options={{ headerShown: false }}
        component={HomeScreen}
      />

      <Stack.Screen
        name="Login_Screen"
        options={{ headerShown: false }}
        component={LoginScreen}
      />
      <Stack.Screen
        name="CreateClient"
        options={{ headerShown: false }}
        component={CreateClient}
      />
      <Stack.Screen
        name="ContVeicles"
        options={{ headerShown: false }}
        component={ContVeicles}
      />
      <Stack.Screen
        name="MainTab"
        component={MainTab}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ClientInfo"
        component={ClientInfo}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="GridList"
        component={GridList}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AppRoutes;
