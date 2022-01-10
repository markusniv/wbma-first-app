import { FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import ListItem from "./ListItem";

const List = () => {
  const [mediaArray, setMediaArray] = useState({ hits: [] });
  const url = "https://media.mw.metropolia.fi/wbma/media/";
  useEffect(() => {
    const loadMedia = async () => {
      try {
        const response = await fetch(url);
        const array = await response.json();
        const json = await Promise.all(
          array.map(async (item) => {
            const response = await fetch(url + item.file_id);
            const json = await response.json();
            console.log(json);
            return json;
          })
        );
        setMediaArray(json);
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
