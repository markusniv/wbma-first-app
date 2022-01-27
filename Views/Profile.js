import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, SafeAreaView, View} from 'react-native';
import {MainContext} from '../Contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ListItem, Text, ListItemProps, Button, Image} from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import {useAvatar} from '../hooks/ApiHooks';

const Profile = ({navigation}) => {
  const {user, setIsLoggedIn} = useContext(MainContext);
  const [avatar, setAvatar] = useState('http://placekitten.com/640');

  const logout = async () => {
    setIsLoggedIn(false);
    await AsyncStorage.clear();
    navigation.navigate('Login');
  };
  let name = user.full_name ? user.full_name : 'Not set';

  const loadAvatar = async () => {
    const {getAvatar} = useAvatar();
    try {
      const avatarUri = await getAvatar(user);
      if (!avatarUri) return;
      setAvatar(avatarUri);
    } catch (e) {
      throw new Error(e.message);
    }
  }

  useEffect(() => {
    loadAvatar();
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.username}>
        <MaterialCommunityIcons name="account" color="black" size={30} />
        <Text style={{color: "#2596be", fontWeight: "bold", fontSize: 18}}>Username: {user.username}</Text>
      </View>
      <View style={styles.image}>
        <Image containerStyle={{aspectRatio: 1, width: '90%', alignSelf: 'center'}}
          source={{uri: `${avatar}`}}
        />
      </View>
      <View style={styles.user_info}>
        <Text>Fullname: {name}</Text>
        <Text>Email: {user.email}</Text>
      </View>
      <View style={styles.logout}>
        <Button containerStyle={{width: "90%"}} title={'Logout'} onPress={logout} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  username: {
    flex: 1,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'lightgray',
    alignItems: 'center',
    padding: 10,
  },
  image: {
    width: '100%',
    borderWidth: 1,
    borderColor: "lightgray",
    padding: 10,
  },
  user_info: {
    width: '100%',
    borderWidth: 1,
    borderColor: "lightgray",
    padding: 10,
  },
  logout: {
    flex: 1,
    width: '100%',
    borderWidth: 1,
    borderColor: "lightgray",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  }

});

export default Profile;