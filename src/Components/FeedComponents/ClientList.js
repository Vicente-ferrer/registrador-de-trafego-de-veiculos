import React from "react";
import {
  TouchableOpacity,
  View,
  SafeAreaView,
  Text,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
//reusable component to render flatlist data
const ClientList = ({ data }) => {
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <TouchableOpacity
        style={styles.item}
        onPress={() => {
          navigation.navigate("ClientInfo", { data });
        }}
      >
        <View style={styles.container}>
          <Text style={styles.itemP1}>{data.name}</Text>
          <Text style={styles.itemP2}>{data.email}</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  item: {
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 10,
    backgroundColor: "#2980b9",
    elevation: 5,
  },
  container: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  itemP1: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 5,
  },
  itemP2: {
    fontSize: 16,
    color: "#fff",
    opacity: 0.8,
  },
});

export default ClientList;
