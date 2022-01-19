import React from "react";
import {StyleSheet, SafeAreaView, Platform, StatusBar} from "react-native";
import Home from "./Views/Home";
import Navigator from './Navigators/Navigator';

const App = () => {
  return (
    <>
      <Navigator />
      <StatusBar style="auto" />
    </>
  );
};


export default App;
