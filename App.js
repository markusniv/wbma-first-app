import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Platform,
} from "react-native";
import { StatusBar } from "expo-status-bar";

const mediaArray = [
  {
    key: "0",
    title: "Title 1",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sodales enim eget leo condimentum vulputate. Sed lacinia consectetur fermentum. Vestibulum lobortis purus id nisi mattis posuere. Praesent sagittis justo quis nibh ullamcorper, eget elementum lorem consectetur. Pellentesque eu consequat justo, eu sodales eros.",
    thumbnails: {
      w160: "http://placekitten.com/160/161",
    },
    filename: "http://placekitten.com/2048/1920",
  },
  {
    key: "1",
    title: "Title 2",
    description:
      "Donec dignissim tincidunt nisl, non scelerisque massa pharetra ut. Sed vel velit ante. Aenean quis viverra magna. Praesent eget cursus urna. Ut rhoncus interdum dolor non tincidunt. Sed vehicula consequat facilisis. Pellentesque pulvinar sem nisl, ac vestibulum erat rhoncus id. Vestibulum tincidunt sapien eu ipsum tincidunt pulvinar. ",
    thumbnails: {
      w160: "http://placekitten.com/160/164",
    },
    filename: "http://placekitten.com/2041/1922",
  },
  {
    key: "2",
    title: "Title 3",
    description:
      "Phasellus imperdiet nunc tincidunt molestie vestibulum. Donec dictum suscipit nibh. Sed vel velit ante. Aenean quis viverra magna. Praesent eget cursus urna. Ut rhoncus interdum dolor non tincidunt. Sed vehicula consequat facilisis. Pellentesque pulvinar sem nisl, ac vestibulum erat rhoncus id. ",
    thumbnails: {
      w160: "http://placekitten.com/160/167",
    },
    filename: "http://placekitten.com/2039/1920",
  },
];

const App = () => {
  return (
    <SafeAreaView style={styles.AndroidSafeArea}>
      <FlatList
        data={mediaArray}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity style={styles.card}>
              <Image
                style={{ width: 150, height: 220 }}
                source={{ uri: item.thumbnails.w160 }}
              />
              <SafeAreaView style={{ flex: 1 }}>
                <Text style={{ fontWeight: "bold", padding: 5 }}>
                  {item.title}
                </Text>
                <Text style={{ padding: 5 }}>{item.description}</Text>
              </SafeAreaView>
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    flexDirection: "row",
    padding: 10,
    margin: 3,
    backgroundColor: "lightgray",
  },
  AndroidSafeArea: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});

export default App;
