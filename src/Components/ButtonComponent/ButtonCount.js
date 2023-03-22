import React, { useState } from "react";
import * as SecureStore from "expo-secure-store";
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  SafeAreaView,
} from "react-native";

import { db } from "../../../Config/Config";
// Componente reutilizável para os botões
const Button = ({ position, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}> AUTO </Text>
    </TouchableOpacity>
  );
};

// Componente reutilizável para as linhas de botões
const Row = ({ buttons, onPress }) => {
  return (
    <View style={styles.row}>
      {buttons.map((button, index) => (
        <Button key={index} position={button} onPress={() => onPress(button)} />
      ))}
    </View>
  );
};

// Componente da tela de contagem
const CountScreen = ({ startCount, stopCount, CliendId }) => {
  const [count1, setCount1] = useState({});
  const [count2, setCount2] = useState({});
  const [count3, setCount3] = useState({});
  const [count4, setCount4] = useState({});

  const data = {
    MOV1: {
      AUTO1: count1[1] || 0,
      AUTO2: count1[2] || 0,
      AUTO3: count1[3] || 0,
      AUTO4: count1[4] || 0,
    },
    MOV2: {
      AUTO5: count2[5] || 0,
      AUTO6: count2[6] || 0,
      AUTO7: count2[7] || 0,
      AUTO8: count2[8] || 0,
    },
    MOV3: {
      AUTO9: count3[9] || 0,
      AUTO10: count3[10] || 0,
      AUTO11: count3[11] || 0,
      AUTO12: count3[12] || 0,
    },
    MOV4: {
      AUTO13: count4[13] || 0,
      AUTO14: count4[14] || 0,
      AUTO15: count4[15] || 0,
      AUTO16: count4[16] || 0,
    },
  };

  const saveAction = async () => {
    const userId = await SecureStore.getItemAsync("user");
    db.collection(`user/${userId}/ClientListbyUser/`)
      .doc(CliendId)
      .collection("countData")
      .add({
        data: { data },
      })
      .then(() => {
        alert("Dados de contagem salvos com sucesso!");
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
    } else if (row === 2) {
      setCount2((prevState) => ({
        ...prevState,
        [button]: (prevState[button] || 0) + 1,
      }));
    } else if (row === 3) {
      setCount3((prevState) => ({
        ...prevState,
        [button]: (prevState[button] || 0) + 1,
      }));
    } else if (row === 4) {
      setCount4((prevState) => ({
        ...prevState,
        [button]: (prevState[button] || 0) + 1,
      }));
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Row
          buttons={[1, 2, 3, 4]}
          onPress={(button) => handlePress(button, 1)}
          count={count1}
        />
        <Row
          buttons={[5, 6, 7, 8]}
          onPress={(button) => handlePress(button, 2)}
          count={count2}
        />
        <Row
          buttons={[9, 10, 11, 12]}
          onPress={(button) => handlePress(button, 3)}
          count={count3}
        />
        <Row
          buttons={[13, 14, 15, 16]}
          onPress={(button) => handlePress(button, 4)}
          count={count4}
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
    width: "20%",
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
});

export default CountScreen;
