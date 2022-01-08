import { StyleSheet, Pressable, Text, View } from "react-native";
import * as Speech from "expo-speech";

const Tts = async (list: any, breakTime: number) => {
  let sleep = (ms: any) =>
    new Promise((resolve) => setTimeout(resolve, Number(ms)));
  const speakWord = (word: string) => {
    Speech.speak(word, { rate: 0.7 });
  };
  speakWord("루틴 시작");

  const doSomething = async () => {
    for (const e of list) {
      speakWord(`${e.minute}분 ${e.exercise}`);
      await sleep(e.minute * 10000);
      speakWord("쉬는 시간");
      await sleep(breakTime * 10000);
    }
  };

  doSomething();
};

export default Tts;
