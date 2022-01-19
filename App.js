import React from "react";
import {StyleSheet, SafeAreaView, Platform, StatusBar} from "react-native";
import Home from "./Views/Home";
import Navigator from './Navigators/Navigator';
import {MainProvider} from "./Contexts/MainContext";

const App = () => {
  return (
    <>
      <MainProvider>
        <Navigator />
        <StatusBar style="auto" />
      </MainProvider>
    </>
  );
};


export default App;
