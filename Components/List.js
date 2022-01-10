import { FlatList } from "react-native";
import React from "react";
import ListItem from "./ListItem";
import { useMedia } from "../hooks/ApiHooks";

const List = () => {
  const { mediaArray } = useMedia();

  return (
    <FlatList
      data={mediaArray}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => <ListItem singleMedia={item} />}
    />
  );
};

export default List;
