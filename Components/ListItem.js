import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import PropTypes from "prop-types";

const ListItem = ({ singleMedia }) => {
  return (
    <TouchableOpacity style={styles.card}>
      <Image
        style={{ width: 150, height: 220 }}
        source={{ uri: singleMedia.thumbnails.w160 }}
      />
      <View style={{ flex: 1 }}>
        <Text style={{ fontWeight: "bold", padding: 5 }}>
          {singleMedia.title}
        </Text>
        <Text style={{ padding: 5 }}>{singleMedia.description}</Text>
      </View>
    </TouchableOpacity>
  );
};

ListItem.propTypes = {
  singleMedia: PropTypes.object,
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    flexDirection: "row",
    padding: 10,
    margin: 2,
    backgroundColor: "lightgray",
  },
});

export default ListItem;
