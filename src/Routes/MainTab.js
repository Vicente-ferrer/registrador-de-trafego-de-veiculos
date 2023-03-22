import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import HomeScreen from "../Pages/Home/Index";
import FeedScreen from "../Pages/Feed/Index";
const Tab = createBottomTabNavigator();

const MainTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Home_Screen"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Feed_Screen"
        component={FeedScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="list" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTab;
