import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React from "react";
import PropTypes from "prop-types";

const ListItem = ({singleMedia}) => {
  const url = "https://media.mw.metropolia.fi/wbma/uploads/";

  console.log(singleMedia.thumbnails);
  if (singleMedia.thumbnails) {

    return (
      <TouchableOpacity style={styles.card}>
        <Image
          style={{width: 160, height: 160}}
          source={{
            uri: `${url}${singleMedia.thumbnails.w160}`,
          }}
        />
        <View style={{flex: 1}}>
          <Text
            style={{
              fontWeight: "bold",
              padding: 5,
              color: "#FFFFFF",
            }}
          >
            {singleMedia.title}
          </Text>
          <Text
            style={{
              padding: 5,
              color: "#989898",
            }}
          >
            {singleMedia.description}
          </Text>
        </View>
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity style={styles.card}>
        <View style={{flex: 1}}>
          <Text
            style={{
              fontWeight: "bold",
              padding: 5,
              color: "#FFFFFF",
            }}
          >
            {singleMedia.title}
          </Text>
          <Text
            style={{
              padding: 5,
              color: "#989898",
            }}
          >
            {singleMedia.description}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }
};

ListItem.propTypes = {
  singleMedia: PropTypes.object,
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    flexDirection: "row",
    padding: 10,
    margin: 5,
    backgroundColor: "#26465e",
  },
});

export default ListItem;
