import React, { useState } from "react";
import * as SecureStore from "expo-secure-store";
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TextInput,
} from "react-native";

import { db } from "../../../Config/Config";
// reusable button component with the label "AUTO"
const Button = ({ position, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}> AUTO </Text>
    </TouchableOpacity>
  );
};

//  reusable component that creates a row of buttons using an array of button positions
// and an 'onPress' function

const Row = ({ buttons, onPress }) => {
  return (
    <View style={styles.row}>
      {buttons.map((button, index) => (
        <Button key={index} position={button} onPress={() => onPress(button)} />
      ))}
    </View>
  );
};

// component for counting traffic that includes input fields for time,
// a text input for adding a title, buttons for counting traffic,
// and buttons to start and stop counting

const CountScreen = ({ startCount, stopCount, CliendId }) => {
  const [count1, setCount1] = useState({});
  const [timeStart, setTimeStart] = useState("");
  const [timeEnd, setTimeEnd] = useState("");
  const [movTitle, setMovTitle] = useState();

  const date = new Date();

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  if (month < 10) {
    month = `0${month}`;
  }
  // const for format date to dd-mm-yy
  let currentDate = `${day}-${month}-${year}`;
  //function is called when the user stops counting and saves the count data to the Firebase database
  const saveAction = async () => {
    const userId = await SecureStore.getItemAsync("user");
    db.collection(`user/${userId}/ClientListbyUser/`)
      .doc(CliendId)
      .collection("countData")
      .add({
        MOV: movTitle,
        Data_contagem: currentDate,
        Inicio: timeStart,
        Fim: timeEnd,
        AUTO: count1[1] || 0,
        MOTO: count1[2] || 0,
        ÔNIBUS: count1[3] || 0,
        CAMINHÃO: count1[4] || 0,
        ADICIONAL: count1[5] || 0,
      })
      .then(() => {
        alert("Dados de contagem salvos com sucesso!");
        setMovTitle("");
        setTimeStart("");
        setTimeEnd("");
      })
      .catch((error) => {
        console.error("Erro ao salvar dados de contagem: ", error);
      });
  };

  const handlePress = (button, row) => {
    if (row === 1) {
      setCount1((prevState) => ({
        ...prevState,
        [button]: (prevState[button] || 0) + 1,
      }));
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={timeStart}
          onChangeText={(text) => setTimeStart(text)}
          placeholder="Ex: 7:00"
          placeholderTextColor="black"
          keyboardType="default"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TextInput
          style={styles.input}
          value={timeEnd}
          onChangeText={(text) => setTimeEnd(text)}
          placeholder="Ex: 7:15"
          placeholderTextColor="black"
          keyboardType="default"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TextInput
          style={styles.input}
          value={movTitle}
          onChangeText={(text) => setMovTitle(text)}
          placeholder="Movimento"
          placeholderTextColor="black"
          keyboardType="defaultl"
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>

      <View style={styles.container}>
        <Row
          buttons={[1, 2, 3, 4, 5]}
          onPress={(button) => handlePress(button, 1)}
          count={count1}
        />
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity style={styles.addButton} onPress={startCount}>
          <Text style={styles.addButtonText}>Iniciar contagem</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            stopCount();
            saveAction();
          }}
        >
          <Text style={styles.addButtonText}>Finalizar contagem</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: "10%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f2f2f2",
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
  button: {
    width: "15%",
    height: 60,
    backgroundColor: "#1E90FF",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    margin: 3,
    borderRadius: 5,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  addButton: {
    width: "20%",
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
  countText: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
  },
  countItem: {
    fontSize: 16,
    marginVertical: 5,
  },
  inputContainer: {
    width: "100%",
    height: "10%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "5%",
    marginRight: "-10%",
  },
  input: {
    width: "30%",
    height: "70%",
    backgroundColor: "#F2F2F2",
    padding: 10,
    borderRadius: 5,
    borderWidth: 3,
    borderColor: "#2980b9",
    marginRight: 10,
    fontSize: 16,
  },
});

export default CountScreen;
