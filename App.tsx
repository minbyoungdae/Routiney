import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import InputRoutine from "./components/InputRoutine";

const App = () => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <FontAwesome5
          name="dumbbell"
          size={24}
          color="black"
          style={styles.title}
        />
        <Text style={styles.title}>Routiney</Text>
      </View>
      <View style={styles.mainContainer}>
        <InputRoutine />
      </View>
      <StatusBar></StatusBar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  titleContainer: {
    flex: 1,
    fontSize: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    fontWeight: "700",
    fontSize: 30,
    marginVertical: 10,
  },
  mainContainer: {
    flex: 2,
    alignItems: "center",
  },
});

export default App;
