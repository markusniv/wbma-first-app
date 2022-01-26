import React, {useContext, useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import {MainContext} from '../Contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useUser} from '../hooks/ApiHooks';
import LoginForm from '../Components/LoginForm';
import RegisterForm from '../Components/RegisterForm';

const Login = ({navigation}) => { // props is needed for navigation
  const {setUser, isLoggedIn, setIsLoggedIn} = useContext(MainContext);
  const [register, setRegister] = useState(false);

  const checkToken = async () => {
    const {getUserByToken} = useUser();
    try {
      const token = await AsyncStorage.getItem('userToken');
      const user = await getUserByToken(token);
      if (!user) {
        return new Error('Failed to log in!');
      }
      setUser(user);
      setIsLoggedIn(true);
      navigation.navigate('Tabs');
    } catch (e) {
      return new Error(e.message);
    }
  }

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.keyboard}>
      <TouchableOpacity onPress={Keyboard.dismiss} style={{flex: 1}} activeOpacity={1}>
        <View style={styles.container}>

          {register ? (
            <>
              <Text style={{marginTop: 10}} >Register</Text>
              <RegisterForm setRegister={setRegister}></RegisterForm>
              <Text
                style={{
                  marginTop: 10,
                  color: '#2596be'
                }} onPress={() =>
                  setRegister(false)
                }>Back to login
              </Text>
            </>
          ) : (
            <>
              <Text>Login</Text>
              <LoginForm navigation={navigation} />
              <Text
                style={{
                  marginTop: 10,
                  color: '#2596be'
                }} onPress={() =>
                  setRegister(true)
                }>No account yet?
              </Text>
            </>
          )}

        </View>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboard: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
});

Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;