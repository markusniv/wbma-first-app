import React from "react";
import { StyleSheet, SafeAreaView, Platform, StatusBar } from "react-native";
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
