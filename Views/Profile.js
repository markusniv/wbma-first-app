import React, {useContext} from 'react';
import {StyleSheet, SafeAreaView, Text, Button, View} from 'react-native';
import {MainContext} from '../Contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = ({navigation}) => {
  const {user, setIsLoggedIn} = useContext(MainContext);
  console.log(user);
  const logout = async () => {
    setIsLoggedIn(false);
    await AsyncStorage.clear();
    navigation.navigate('Login');
  };
  let name = user.full_name ? user.full_name : 'Not set';
  return (
    <SafeAreaView style={styles.container}>
      <Text>Profile</Text>
      <View style={styles.information}>
        <Text>Username: {user.username}</Text>
        <Text>Email: {user.email}</Text>
        <Text>Name: {name}</Text>
        <Text></Text>
      </View>
      <Button title={'Logout'} onPress={logout} />
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
  information: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    width: '95%',
    margin: 20,
  }
});

export default Profile;