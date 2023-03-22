import React from "react";
import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";

const HomeScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchArea}>
        <Text style={styles.txtWelcome}>Olá Vicente </Text>
        <TouchableOpacity style={styles.perfilIcon}>
          <Feather name="user" size={30} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.list}>
        <TouchableOpacity
          style={styles.btnAction}
          onPress={() => navigation.navigate("Feed_Screen")}
        >
          <Text>Ver seus Clientes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnAction}
          onPress={() => navigation.navigate("CreateClient")}
        >
          <Text>Adicionar Cliente</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2980b9",
  },
  txtWelcome: {
    fontSize: 24,
    marginLeft: 10,
    fontWeight: "bold",
  },
  searchArea: {
    width: "100%",
    height: "15%",
    paddingTop: "10%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#2980b9",
  },
  perfilIcon: {
    width: 32,
    marginRight: 30,
  },
  list: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "#FFFF",
    borderRadius: 20,
  },
  btnAction: {
    width: "80%",
    height: "8%",
    backgroundColor: "#2980b9",
    margin: "5%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
});

export default HomeScreen;
