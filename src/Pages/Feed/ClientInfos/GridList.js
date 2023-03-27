import React, { useCallback, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { useRoute } from "@react-navigation/native";
import { Text, View, StyleSheet } from "react-native";
import { db } from "../../../../Config/Config";

// define the component
const GridList = () => {
  // retrieve the route and ClientId from the navigation stack
  const route = useRoute();
  const ClientId = route.params.data;

  // initialize state for the data to be displayed
  const [data, setData] = useState([]);

  // define a function to fetch the client data
  const fetchClients = useCallback(async () => {
    // get the user ID from secure storage
    const userId = await SecureStore.getItemAsync("user");
    // specify the database collection to retrieve data from
    const collectionRef = db.collection(
      `user/${userId}/ClientListbyUser/${ClientId}/countData/`
    );
    try {
      // retrieve the data from the specified collection
      const querySnapshot = await collectionRef.get();
      // map the retrieved documents to create an array of data objects
      const countedData = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      // set the data state to the retrieved data
      setData(countedData);
    } catch (error) {
      console.log("Error fetching clients: ", error);
    }
  }, []);

  // call the fetchClients function when the component mounts
  useEffect(() => {
    fetchClients();
    console.log(data);
  }, [fetchClients]);

  // render the table to display the retrieved data
  return (
    <View style={styles.container}>
      <View style={styles.tableRow}>
        <View style={[styles.tableCell, styles.tableHeader]}>
          <Text>MOV</Text>
        </View>
        <View style={[styles.tableCell, styles.tableHeader]}>
          <Text>Data_contagem</Text>
        </View>
        <View style={[styles.tableCell, styles.tableHeader]}>
          <Text>Inicio</Text>
        </View>
        <View style={[styles.tableCell, styles.tableHeader]}>
          <Text>Fim</Text>
        </View>
        <View style={[styles.tableCell, styles.tableHeader]}>
          <Text>AUTO</Text>
        </View>
        <View style={[styles.tableCell, styles.tableHeader]}>
          <Text>MOTO</Text>
        </View>
        <View style={[styles.tableCell, styles.tableHeader]}>
          <Text>ÔNIBUS</Text>
        </View>
        <View style={[styles.tableCell, styles.tableHeader]}>
          <Text>CAMINHÃO</Text>
        </View>
        <View style={[styles.tableCell, styles.tableHeader]}>
          <Text>ADICIONAL</Text>
        </View>
      </View>
      {data.map((item, index) => (
        <View key={index} style={styles.tableRow}>
          <View style={styles.tableCell}>
            <Text>{item.MOV}</Text>
          </View>
          <View style={styles.tableCell}>
            <Text>{item.Data_contagem}</Text>
          </View>
          <View style={styles.tableCell}>
            <Text>{item.Inicio}</Text>
          </View>
          <View style={styles.tableCell}>
            <Text>{item.Fim}</Text>
          </View>
          <View style={styles.tableCell}>
            <Text>{item.AUTO}</Text>
          </View>
          <View style={styles.tableCell}>
            <Text>{item.MOTO}</Text>
          </View>
          <View style={styles.tableCell}>
            <Text>{item.ÔNIBUS}</Text>
          </View>
          <View style={styles.tableCell}>
            <Text>{item.CAMINHÃO}</Text>
          </View>
          <View style={styles.tableCell}>
            <Text>{item.ADICIONAL}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
    backgroundColor: "#fff",
  },
  tableRow: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    height: 40,
  },
  tableHeader: {
    fontWeight: "bold",
    backgroundColor: "#f2f2f2",
  },
  tableCell: {
    textAlign: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    flex: 1,
  },
});

export default GridList;
