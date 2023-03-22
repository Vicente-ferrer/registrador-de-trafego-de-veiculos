import React, { useState, useEffect, useCallback } from "react";
import {
  FlatList,
  RefreshControl,
  View,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import { db } from "../../../Config/Config";
import ClientList from "../../Components/FeedComponents/ClientList";

const FeedScreen = () => {
  const [clients, setClients] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchClients = useCallback(async () => {
    const userId = await SecureStore.getItemAsync("user");
    const collectionRef = db.collection(`user/${userId}/ClientListbyUser`);

    try {
      const querySnapshot = await collectionRef.get();
      const clientsData = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setClients(clientsData);
    } catch (error) {
      console.log("Error fetching clients: ", error);
    }
  }, []);

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    fetchClients();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, [fetchClients]);

  const renderClientItem = ({ item }) => <ClientList data={item} />;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={clients}
        renderItem={renderClientItem}
        keyExtractor={(item) => item.id}
        refreshControl={
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
