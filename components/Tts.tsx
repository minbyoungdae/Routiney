import * as Speech from "expo-speech";

let sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const speakWord = (word: string) => {
  Speech.speak(word, { rate: 0.8 });
};

let timer: ReturnType<typeof setInterval>;
let aaa = true;

export const startTTS = (
  list: Array<Object>,
  breakTime: string,
  setPlay: Function
) => {
  aaa = true;
  timer = setInterval(() => {
    rotineSpeak(0, list, breakTime, setPlay);
    clearInterval(timer);
  });
};

export const stopTTS = () => {
  clearInterval(timer);
  Speech.stop();
  aaa = false;
};

interface IObject {
  minute?: string;
  exercise?: string;
}

export const rotineSpeak = async (
  idx: number,
  list: Array<IObject>,
  breakTime: string,
  setPlay: Function
) => {
  if (idx === 0) {
    speakWord("루틴 시작");
  }
  if (idx === list.length) {
    return;
  }
  speakWord(`${list[idx].minute} 분`);
  speakWord(list[idx].exercise);
  await sleep(Number(list[idx].minute) * 60000).then(async () => {
    if (idx === list.length - 1) {
      speakWord("루틴 종료");
      setPlay(false);
      return;
    }
    if (aaa) {
      speakWord("쉬는 시간");
      await sleep(Number(breakTime) * 60000).then(() => {
        if (aaa) {
          return rotineSpeak(idx + 1, list, breakTime, setPlay);
        }
      });
    }
  });
};
