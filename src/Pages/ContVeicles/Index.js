import React, { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import { View, Text, Button, StyleSheet, SafeAreaView } from "react-native";
import ButtonCount from "./../../Components/ButtonComponent/ButtonCount";

const Timer = () => {
  const [time, setTime] = useState(900); //  inicial time equals 15 min
  const [countdownSpeed, setCountdownSpeed] = useState(1); // initial speed
  const [isCounting, setIsCounting] = useState(false); // determines whether the counter is running or not
  const [initialTime, setInitialTime] = useState(900); // initial time

  const route = useRoute();
  const CliendId = route.params.CliendId; // Customer ID being served

  // Atualiza o tempo a cada segundo
  useEffect(() => {
    const interval = setInterval(() => {
      if (isCounting) {
        setTime((prevTime) => prevTime - 1); // subtracts a second from the current time
      }
    }, 1000 / countdownSpeed);

    // Clears range when component is unmounted
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

  // Stop countdown and back to start time
  const stopCountdown = () => {
    setIsCounting(false);
    setTime(initialTime);
  };

  // Formats time in minutes and seconds
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
      {/* Botão de contagem */}
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
