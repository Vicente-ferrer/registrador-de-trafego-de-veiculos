import React, { useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { StyleSheet, Text, TextInput, View, Button, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { db } from "../../../Config/Config";

export default function CreateClientScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const dados = {
    name: name,
    email: email,
    endereço: address,
    dataInicio: startTime,
    dataFinalização: endTime,
  };

  useEffect(() => {
    SecureStore.getItemAsync("user").then((userId) => setUser(userId));
  }, []);

  const handleCreateClient = () => {
    db.collection("user")
      .doc(user)
      .collection("ClientListbyUser")
      .add(dados)
      .then((docRef) => {
        navigation.navigate("Feed_Screen");
      })
      .catch((error) => {
        console.error("Erro ao criar cliente: ", error);
      });
  };

  const cleanForm = () => {
    setName("");
    setEmail("");
    setAddress("");
    setStartTime("");
    setEndTime("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome:</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />
      <Text style={styles.label}>Email:</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} />
      <Text style={styles.label}>Local da contagem:</Text>
      <TextInput
        style={styles.input}
        value={address}
        onChangeText={setAddress}
      />
      <Text style={styles.label}>Data de Início:</Text>
      <TextInput
        style={styles.input}
        value={startTime}
        onChangeText={setStartTime}
      />
      <Text style={styles.label}>Data de Término:</Text>
      <TextInput
        style={styles.input}
        value={endTime}
        onChangeText={setEndTime}
      />
      <Button
        title="Criar Cliente"
        onPress={() => {
          if (
            (name !== "") &
            (email !== "") &
            (address !== "") &
            (startTime !== "") &
            (endTime !== "")
          ) {
            handleCreateClient();
            Alert.alert("Salvo com sucesso!");
            cleanForm();
          } else {
            Alert.alert(
              "Ops!",
              "Parece que esqueceu de preencher algum campo!"
            );
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
});
