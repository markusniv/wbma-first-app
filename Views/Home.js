import React from "react";
import {StyleSheet, SafeAreaView, Platform, StatusBar} from "react-native";
import List from "../Components/List";
import PropTypes from "prop-types";

const Home = ({navigation}) => {
  return (
    <SafeAreaView>
      <List navigation={navigation} />
    </SafeAreaView>
  );
};


Home.propTypes = {
  navigation: PropTypes.object,
}

export default Home;
