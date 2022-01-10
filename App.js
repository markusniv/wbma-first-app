import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  Platform,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import List from "./Components/List";

const App = () => {
  return (
    <SafeAreaView style={styles.AndroidSafeArea}>
      <List />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  AndroidSafeArea: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});

export default App;
