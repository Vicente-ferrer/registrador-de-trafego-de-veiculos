import React, { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import { View, Text, Button, StyleSheet, SafeAreaView } from "react-native";
import ButtonCount from "./../../Components/ButtonComponent/ButtonCount";

const Timer = () => {
  const [time, setTime] = useState(900); // 15 minutos em segundos
  const [countdownSpeed, setCountdownSpeed] = useState(1); // velocidade inicial
  const [isCounting, setIsCounting] = useState(false);
  const [initialTime, setInitialTime] = useState(900);

  const route = useRoute();
  const CliendId = route.params.CliendId;

  useEffect(() => {
    const interval = setInterval(() => {
      if (isCounting) {
        setTime((prevTime) => prevTime - 1);
      }
    }, 1000 / countdownSpeed);

    return () => clearInterval(interval);
  }, [countdownSpeed, isCounting]);

  useEffect(() => {
    if (time === 0) {
      setIsCounting(false);
      alert("O tempo acabou!");
    }
  }, [time]);

  const startCountdown = () => {
    setIsCounting(true);
    setInitialTime(time);
  };

  const stopCountdown = () => {
    setIsCounting(false);
    setTime(initialTime);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.time}>{formatTime(time)}</Text>
      <View style={styles.speedButtons}>
        <View style={styles.speedButton}>
          <Button title="Normal" onPress={() => setCountdownSpeed(1)} />
        </View>
        <View style={styles.speedButton}>
          <Button title="1.5x" onPress={() => setCountdownSpeed(1.5)} />
        </View>
        <View style={styles.speedButton}>
          <Button title="2x" onPress={() => setCountdownSpeed(2)} />
        </View>
        <View style={styles.speedButton}>
          <Button title="3x" onPress={() => setCountdownSpeed(3)} />
        </View>
      </View>
      <View style={styles.counterContainer}>
        <ButtonCount
          startCount={startCountdown}
          stopCount={stopCountdown}
          CliendId={CliendId}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f2f2f2",
  },
  time: {
    fontSize: 70,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: "3%",
  },
  speedButton: {
    marginHorizontal: 10,
  },
  counterContainer: {
    flex: 1,
    marginBottom: 10,
  },
  speedButtons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  speedButton: {
    marginHorizontal: 10,
  },
  counterContainer: {
    flex: 1,
    marginBottom: 10,
  },
});

export default Timer;
