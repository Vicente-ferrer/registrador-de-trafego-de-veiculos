import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import List from "../../../Components/FeedComponents/ClientInfoList";

const ClientInfo = () => {
  // Get the current route and extract the data passed in as a parameter
  const route = useRoute();
  const data = route.params.data;
  const navigation = useNavigation();

  // Define the renderItem function, which renders a List component with the given item as a prop
  const renderItem = ({ item }) => <List date={item} />;
  return (
    // Render a SafeAreaView with the specified styles as the container for the screen

    <SafeAreaView style={styles.container}>
      <FlatList
        data={[data]}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            navigation.navigate("ContVeicles", { CliendId: data.id });
          }}
        >
          <Text style={styles.addButtonText}>Conrinuar Contagem</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            navigation.navigate("GridList", { data: data.id });
          }}
        >
          <Text style={styles.addButtonText}>Ver dados de contagem</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    justifyContent: "center",
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  addButton: {
    width: "70%",
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1E90FF",
    padding: 10,
    borderRadius: 5,
    margin: 10,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ClientInfo;
