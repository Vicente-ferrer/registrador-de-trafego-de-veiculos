import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { ActivityIndicator, Alert } from "react-native";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../Config/Config";

function Preload() {
  const navigation = useNavigation();

  useEffect(() => {
    unsubscribe();
  }, []);

  const unsubscribe = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.navigate("MainTab");
      } else {
        Alert.alert("Ops! :(", "Parece que não está logado, faça o login!");
        navigation.navigate("Login_Screen");
      }
    });
  };

  return (
    <ActivityIndicator
      size="large"
      color="#00ff00"
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    ></ActivityIndicator>
  );
}
export default Preload;
