import React, {useContext, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
} from 'react-native';
import PropTypes from 'prop-types';
import {MainContext} from '../Contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation}) => { // props is needed for navigation
  const [isLoggedIn, setIsLoggedIn] = useContext(MainContext);
  console.log('login isLoggedIn', isLoggedIn);

  const logIn = async () => {
    setIsLoggedIn(true);
    try {
      await AsyncStorage.setItem('userToken', 'abc');
      navigation.navigate('Tabs');
    } catch (e) {
      console.log(e);
    }

  }

  const checkToken = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (token === 'abc') {
        setIsLoggedIn(true);
        navigation.navigate('Tabs');
      }
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <Button title="Sign in!" onPress={logIn} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;