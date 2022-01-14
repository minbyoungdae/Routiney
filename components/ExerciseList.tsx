import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  SafeAreaView,
  TouchableWithoutFeedback,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

interface Iprops {
  list: Array<Object>;
  deleteList: Function;
}
const { width: SCREEN_WIDTH } = Dimensions.get("window");

const ExerciseList = (props: Iprops) => {
  return (
    <SafeAreaView>
      <ScrollView>
        {props.list !== []
          ? props.list.map((e: any, index: number) => {
              return (
                <TouchableWithoutFeedback>
                  <View style={styles.textContainer} key={index}>
                    <Text
                      style={{ ...styles.text, width: 70 }}
                    >{`${e.minute}분`}</Text>
                    <Text style={{ ...styles.text, width: SCREEN_WIDTH / 2 }}>
                      {e.exercise}
                    </Text>
                    <AntDesign
                      name="delete"
                      size={24}
                      color="black"
                      onPress={() => props.deleteList(index)}
                    />
                  </View>
                </TouchableWithoutFeedback>
              );
            })
          : null}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  text: {
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
