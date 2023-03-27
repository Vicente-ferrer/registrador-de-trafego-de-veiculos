import React, { useState, useEffect, useCallback } from "react";
import {
  FlatList,
  RefreshControl,
  View,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import * as SecureStore from "expo-secure-store"; // A library for storing encrypted data on the device
import { db } from "../../../Config/Config"; // An external configuration file for Firebase

import ClientList from "../../Components/FeedComponents/ClientList"; // Import a custom component

const FeedScreen = () => {
  // Declare the FeedScreen component
  const [clients, setClients] = useState([]); // Declare a state variable to hold the list of clients and initialize it with an empty array
  const [refreshing, setRefreshing] = useState(false); // Declare a state variable to indicate whether the list is currently being refreshed and initialize it with false

  const fetchClients = useCallback(async () => {
    // Declare a callback function to fetch the list of clients
    const userId = await SecureStore.getItemAsync("user"); // Retrieve the user id from the encrypted storage
    const collectionRef = db.collection(`user/${userId}/ClientListbyUser`); // Get a reference to the collection in Firebase

    try {
      const querySnapshot = await collectionRef.get(); // Execute the query to get all documents in the collection
      const clientsData = querySnapshot.docs.map((doc) => {
        // Map the results to an array of objects with the document id and data
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setClients(clientsData); // Update the state with the array of client objects
    } catch (error) {
      console.log("Error fetching clients: ", error); // Log an error message if there is an error fetching the clients
    }
  }, []);

  useEffect(() => {
    // Declare a side effect to fetch the list of clients when the component mounts
    fetchClients();
  }, [fetchClients]);

  const handleRefresh = useCallback(() => {
    // Declare a callback function to handle the pull-to-refresh functionality
    setRefreshing(true); // Set the refreshing state variable to true
    fetchClients(); // Fetch the list of clients again
    setTimeout(() => {
      // Add a delay of 2 seconds before setting the refreshing state variable back to false
      setRefreshing(false);
    }, 2000);
  }, [fetchClients]);

  const renderClientItem = ({ item }) => <ClientList data={item} />; // Declare a function to render each client item using the custom component

  return (
    <SafeAreaView style={styles.container}>
      {" "}
      // Render a SafeAreaView component with a style defined by the styles
      object
      <FlatList
        data={clients} // Pass the array of clients to the FlatList component
        renderItem={renderClientItem} // Pass the renderClientItem function to the FlatList component to render each client item
        keyExtractor={(item) => item.id} // Provide a unique key for each item in the list
        refreshControl={
          // Add the RefreshControl component to the FlatList component to enable pull-to-refresh functionality
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
});

export default FeedScreen;
