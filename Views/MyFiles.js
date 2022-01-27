import React from "react";
import {SafeAreaView} from "react-native";
import List from "../Components/List";
import PropTypes from "prop-types";

const MyFiles = ({navigation}) => {
  const tab = "My Files"
  return (
    <SafeAreaView>
      <List navigation={navigation} tab={tab} />
    </SafeAreaView>
  );
};


MyFiles.propTypes = {
  navigation: PropTypes.object,
}

export default MyFiles;