import { StyleSheet, Pressable, Text, View } from "react-native";
import * as Speech from "expo-speech";
import { useCallback, useState } from "react";

const Tts = async (
  type: string,
  setActiveButton?: any,
  list?: any,
  breakTime?: string
) => {
  let sleep = (ms: any) =>
    new Promise((resolve) => setTimeout(resolve, Number(ms)));
  const speakWord = (word: string) => {
    Speech.speak(word, { rate: 0.8 });
  };
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(!refreshing);
  };

  const doSomething = async () => {
    speakWord("루틴 시작");
    for (const [index, e] of list.entries()) {
      console.log(type);
      speakWord(`${e.minute}분`);
      speakWord(e.exercise);
      await sleep(e.minute * 10000);
      if (breakTime) {
        if (index !== list.length - 1) {
          speakWord("쉬는 시간");
          await sleep(Number(breakTime) * 10000);
        }
      }
      if (index === list.length - 1) {
        // speakWord("루틴 종료");
        setActiveButton(false);
      }
    }
  };

  if (type === "start") {
    setActiveButton(true);
    doSomething();
    speakWord("루틴 종료");
  } else if (type === "stop") {
    setActiveButton(false);
    Speech.stop();
    // onRefresh();
  }
};

export default Tts;
