import {FlatList} from "react-native";
import React, {useContext} from "react";
import ListItem from "./ListItem";
import MyListItem from "./MyListItem";
import {useMedia} from "../hooks/ApiHooks";
import PropTypes from "prop-types";
import {MainContext} from '../Contexts/MainContext';

const List = ({navigation, tab}) => {
  const {update} = useContext(MainContext);
  const {mediaArray} = useMedia(update);
  const {userMediaArray} = useMedia(update);

  return (
    <>
      {(tab === "Home") ? (
        <FlatList
          style={{backgroundColor: "white"}}
          data={mediaArray}
          keyExtractor={(item, index) => index.toString()}
          renderItem={
            ({item}) => <ListItem
              navigation={navigation}
              singleMedia={item} />}
        />
      ) : (
        <FlatList
          style={{backgroundColor: "white"}}
          data={userMediaArray}
          keyExtractor={(item, index) => index.toString()}
          renderItem={
            ({item}) => <MyListItem
              navigation={navigation}
              singleMedia={item} />}
        />
      )}
    </>
  );
};

List.propTypes = {
  navigation: PropTypes.object,
}

export default List;
