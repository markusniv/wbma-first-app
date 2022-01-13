import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  Platform,
  StatusBar,
  View,
  Text,
} from "react-native";

import {Settings} from "react-native-feather";
import List from "./Components/List";

const backgroundImage = {uri: "https://picsum.photos/720/360"};

const App = () => {
  return (
    <SafeAreaView style={styles.AndroidSafeArea}>
      <StatusBar backgroundColor="#182f3d" />
      <View style={styles.container}>
        <ImageBackground
          source={require('./953-720x360.jpg')}
          style={styles.image}
          backgroundColor="white"
        />
        <Text style={styles.text}>Amazing Media</Text>
        <Settings style={styles.icon} />
      </View>
      <List />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  AndroidSafeArea: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "#182f3d",
  },
  container: {
    width: "100%",
    height: 200,
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  text: {
    color: "white",
    backgroundColor: "#182f3d",
    position: "absolute",
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
    marginTop: 50,
    padding: 10,
    fontSize: 42,
  },
  icon: {
    color: "white",
    position: "absolute",
    right: 20,
    top: 20,
  }
});

export default App;
