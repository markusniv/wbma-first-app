import React from 'react';
import {StyleSheet, SafeAreaView, Text, View} from 'react-native';
import {Image} from 'react-native-elements';
import PropTypes from 'prop-types';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const Single = ({route}) => {
  const url = "https://media.mw.metropolia.fi/wbma/uploads/";
  const {media} = route.params;
  const singleMedia = media.singleMedia;
  console.log(singleMedia);

  return (
    <SafeAreaView style={styles.container}>
      <Image containerStyle={{aspectRatio: 1, width: '90%', alignSelf: 'center'}}
        source={
          {uri: `${url}${singleMedia.filename}`}
        }
      />
      <View style={styles.bottom}>
        <MaterialCommunityIcons style={{alignSelf: 'center', padding: 10}} name="image" color="black" size={30} />
        <View style={styles.bottomText}>
          <Text style={{fontSize: 20}}>{singleMedia.title}</Text>
          <Text style={{fontSize: 18}}>{singleMedia.description}</Text>
          <Text style={{fontSize: 20}}>By {singleMedia.user_id}</Text>
        </View>
      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
  },
  bottom: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    paddingTop: 30,
    alignItems: 'center',
  },
  bottomText: {
    flex: 1,
    flexDirection: 'column',
  }
});

Single.propTypes = {
  route: PropTypes.object,
}

export default Single;