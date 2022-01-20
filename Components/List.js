import {FlatList} from "react-native";
import React from "react";
import ListItem from "./ListItem";
import {useMedia} from "../hooks/ApiHooks";
import PropTypes from "prop-types";

const List = ({navigation}) => {
  const {mediaArray} = useMedia();

  return (
    <FlatList
      style={{backgroundColor: "white"}}
      data={mediaArray}
      keyExtractor={(item, index) => index.toString()}
      renderItem={
        ({item}) => <ListItem
          navigation={navigation}
          singleMedia={item} />}
    />
  );
};

List.propTypes = {
  navigation: PropTypes.object,
}

export default List;
