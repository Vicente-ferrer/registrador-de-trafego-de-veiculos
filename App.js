import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import AppRoutes from "./src/Routes/Index";

const statusBarHeight = StatusBar.currentHeight
  ? StatusBar.currentHeight + 18
  : 45;

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1, paddingTop: statusBarHeight }}>
      <NavigationContainer>
        <AppRoutes />
      </NavigationContainer>
    </SafeAreaView>
  );
}
