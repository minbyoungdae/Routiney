import {
  StyleSheet,
  Pressable,
  Text,
  View,
  TextInput,
  Alert,
  Button,
  Dimensions,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

interface Iprops {
  list: Array<string>;
  deleteList: any;
}

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const ExerciseList = (props: Iprops) => {
  return (
    <View>
      {props.list !== []
        ? props.list.map((e: any, index: number) => {
            return (
              <View style={styles.textContainer} key={index}>
                <Text
                  style={{ ...styles.Text, width: 70 }}
                >{`${e.minute}분`}</Text>
                <Text style={{ ...styles.Text, width: SCREEN_WIDTH / 2 }}>
                  {e.exercise}
                </Text>
                <AntDesign
                  name="delete"
                  size={24}
                  color="black"
                  onPress={() => props.deleteList(index)}
                />
              </View>
            );
          })
        : null}
    </View>
  );
};

const styles = StyleSheet.create({
  Text: {
    color: "gray",
    padding: 5,
    fontSize: 16,
  },
  textContainer: {
    flexDirection: "row",
    width: SCREEN_WIDTH - 100,
    alignItems: "center",
  },
});

export default ExerciseList;
