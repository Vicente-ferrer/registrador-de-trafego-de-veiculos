import React from "react";
import { View, SafeAreaView, Text, StyleSheet } from "react-native";

//reusable component to render flatlist data

const ClientInfoList = ({ date }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Dados do Cliente</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.label}>Nome</Text>
        <Text style={styles.value}>{date.name}</Text>
        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>{date.email}</Text>
        <Text style={styles.label}>Endereço</Text>
        <Text style={styles.value}>{date.endereço}</Text>
        <Text style={styles.label}>Data de inicio</Text>
        <Text style={styles.value}>{date.dataInicio}</Text>
        <Text style={styles.label}>Data de finalização</Text>
        <Text style={styles.value}>{date.dataFinalização}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2980b9",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  content: {
    padding: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2980b9",
    marginTop: 20,
  },
  value: {
    fontSize: 16,
    color: "#666",
  },
});

export default ClientInfoList;
