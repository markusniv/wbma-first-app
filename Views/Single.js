import React from 'react';
import {StyleSheet, SafeAreaView, Text, Image} from 'react-native';

const Single = ({route}) => {
  const url = "https://media.mw.metropolia.fi/wbma/uploads/";
  const {media} = route.params;
  const singleMedia = media.singleMedia;

  return (
    <SafeAreaView style={styles.container}>
      <Text>{singleMedia.title}</Text>
      <Image style={{width: 320, height: 320}}
        source={
          {uri: `${url}${singleMedia.filename}`}
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
});

export default Single;