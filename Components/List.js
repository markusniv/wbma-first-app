import { FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import ListItem from "./ListItem";

const List = () => {
  const [mediaArray, setMediaArray] = useState({ hits: [] });
  const url =
    "https://raw.githubusercontent.com/mattpe/wbma/master/docs/assets/test.json";
  useEffect(() => {
    const loadMedia = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setMediaArray(json);
        console.log(json);
      } catch (e) {
        console.error(e);
      }
    };
    loadMedia();
  }, []);

  return (
    <FlatList
      data={mediaArray}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => <ListItem singleMedia={item} />}
    />
  );
};

export default List;
