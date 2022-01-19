import React from "react";
import {StyleSheet, SafeAreaView, Platform, StatusBar} from "react-native";
import List from "../Components/List";
import PropTypes from "prop-types";

const Home = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <List navigation={navigation} />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});

Home.propTypes = {
  navigation: PropTypes.object,
}

export default Home;
