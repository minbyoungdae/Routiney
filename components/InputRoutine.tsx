import React, { useRef, useState, useEffect } from "react";
import {
  StyleSheet,
  Pressable,
  Text,
  View,
  TextInput,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ExerciseList from "./ExerciseList";
import * as TTS from "./TTS";

const InputRoutine = () => {
  const [list, setList] = useState<Array<Object>>([]);
  const [minute, setMinute] = useState<string>();
  const [exercise, setExercise] = useState<string>();
  const [breakTime, setBreakTime] = useState<string>();
  const [play, setPlay] = useState<Boolean>(false);
  const onPress = () => {
    if (!(minute && exercise)) {
      Alert.alert("시간과 운동 이름을 입력해주세요");
    } else if (!list.length) {
      setList([{ minute: minute, exercise: exercise }]);
    } else {
      setList([...list, { minute: minute, exercise: exercise }]);
    }
    setMinute("");
    setExercise("");
    inputRef.current.blur();
  };
  const inputRef = useRef<TextInput>();

  const deleteList = (index: number) => {
    setList(list.filter((e: Object, idx: number) => idx !== index));
  };

  const saveListData = async () => {
    try {
      await AsyncStorage.setItem("@list", JSON.stringify(list));
    } catch (err) {
      console.log(err);
    }
  };

  const saveBTData = async () => {
    try {
      await AsyncStorage.setItem("@BT", JSON.stringify(breakTime));
    } catch (err) {
      console.log(err);
    }
  };

  const getData = async () => {
    try {
      const listData: string = await AsyncStorage.getItem("@list");
      const JSONListData: Array<Object> = JSON.parse(listData);
      console.log(JSONListData);
      if (JSONListData !== null) {
        setList(JSONListData);
      } else {
        setList([]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getBTData = async () => {
    const breakTimeData: string = await AsyncStorage.getItem("@BT");
    const JSONBTData: string = JSON.parse(breakTimeData);
    if (JSONBTData !== null) {
      setBreakTime(JSONBTData);
    } else {
      setBreakTime("");
    }
  };

  useEffect(() => {
    getData();
    getBTData();
  }, []);

  useEffect(() => {
    saveListData();
  }, [list]);

  useEffect(() => {
    saveBTData();
  }, [breakTime]);

  return (
    <>
      <View
        style={{
          ...styles.container,
          justifyContent: "space-around",
          marginBottom: 30,
        }}
      >
        <Pressable
          style={play ? styles.activeButton : styles.playButton}
          onPress={() => {
            if (!play) {
              setPlay(true);
              TTS.startTTS(list, breakTime, setPlay);
            }
          }}
        >
          <Text>시작</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            setPlay(false);
            TTS.stopTTS();
          }}
          style={({ pressed }) => [
            pressed && styles.activeButton,
            styles.playButton,
          ]}
        >
          <Text>종료</Text>
        </Pressable>
      </View>
      <View style={styles.container}>
        <TextInput
          style={styles.breakTimeInput}
          placeholder="쉬는 시간(분)"
          ref={inputRef}
          value={String(breakTime) ?? ""}
          onChangeText={(text) => setBreakTime(text)}
          keyboardType="number-pad"
        ></TextInput>
      </View>
      <View
        style={{
          ...styles.container,
          justifyContent: "center",
          marginBottom: 40,
        }}
      >
        <TextInput
          style={styles.timeInput}
          placeholder="분"
          onChangeText={(text) => setMinute(text)}
          value={minute}
          ref={inputRef}
          keyboardType="number-pad"
        ></TextInput>
        <TextInput
          style={styles.exerciseInput}
          placeholder="운동 이름"
          onChangeText={(text) => setExercise(text)}
          value={exercise}
          ref={inputRef}
        ></TextInput>
        <Pressable style={styles.inputButton} onPress={onPress}>
          <Text style={styles.inputButtonText}>추가</Text>
        </Pressable>
      </View>
      <ExerciseList list={list} deleteList={deleteList} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  timeInput: {
    borderBottomWidth: 1,
    padding: 10,
    width: 100,
    marginRight: "5%",
    textAlign: "center",
  },
  exerciseInput: {
    borderBottomWidth: 1,
    padding: 10,
    width: 170,
    marginRight: "5%",
    textAlign: "center",
  },
  breakTimeInput: {
    borderBottomWidth: 1,
    padding: 10,
    width: 100,
    marginRight: "5%",
    textAlign: "center",
    marginBottom: 20,
  },
  inputButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 22,
    borderRadius: 4,
    backgroundColor: "black",
  },
  inputButtonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  playButton: {
    backgroundColor: "#eee",
    alignItems: "center",
    justifyContent: "center",
    width: 70,
    height: 50,
    borderRadius: 25,
    shadowColor: "black",
    shadowOffset: {
      width: 1,
      height: 4,
    },
    shadowOpacity: 1,
  },
  activeButton: {
    backgroundColor: "#eee",
    alignItems: "center",
    justifyContent: "center",
    width: 70,
    height: 50,
    borderRadius: 25,
    shadowColor: "black",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 1,
    position: "relative",
    top: 2,
  },
});

export default InputRoutine;
