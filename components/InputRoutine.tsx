import React, { useRef, useState, useCallback } from "react";
import {
  StyleSheet,
  Pressable,
  Text,
  View,
  TextInput,
  Alert,
  Button,
} from "react-native";
import ExerciseList from "./ExerciseList";
import Tts from "./Tts";

const InputRoutine = () => {
  const [list, setList] = useState<any | []>([
    {
      minute: "3",
      exercise: "팔굽혀펴기",
    },
    {
      minute: "5",
      exercise: "윗몸일으키기",
    },
    {
      minute: "3",
      exercise: "달리기",
    },
  ]);
  const [minute, setMinute] = useState<any>("");
  const [exercise, setExercise] = useState<any>("");
  const [breakTime, setBreakTime] = useState<number>();
  const onPress = () => {
    setList([...list, { minute: minute, exercise: exercise }]);
    setMinute("");
    setExercise("");
    inputRef.current.blur();
  };
  const inputRef = useRef<any>();

  const deleteList = (index: number) => {
    setList(list.filter((e: any, idx: number) => idx !== index));
  };
  return (
    <>
      <View>
        <Pressable onPress={() => Tts(list, breakTime)}>
          <Text>시작</Text>
        </Pressable>
      </View>
      <View style={styles.container}>
        <TextInput
          style={styles.breakTimeInput}
          placeholder="쉬는 시간"
          ref={inputRef}
          onChangeText={(text) => setBreakTime(Number(text))}
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
        <Pressable style={styles.button} onPress={onPress}>
          <Text style={styles.buttonText}>추가</Text>
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
    marginRight: "10%",
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 22,
    borderRadius: 4,
    backgroundColor: "black",
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});

export default InputRoutine;
