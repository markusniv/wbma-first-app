import React, {useContext} from "react";
import {Text, View, TextInput, Button, StyleSheet} from "react-native";
import {MainContext} from '../Contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useForm, Controller} from "react-hook-form";
import {useLogin} from '../hooks/ApiHooks';

const LoginForm = () => {
  const {control, handleSubmit, formState: {errors}} = useForm({
    defaultValues: {
      username: '',
      password: ''
    }
  });
  const {setUser, isLoggedIn, user, setIsLoggedIn} = useContext(MainContext);
  const {postLogin} = useLogin();
  const onSubmit = data => logIn(data);

  const logIn = async (userData) => {

    const data = {username: userData.username, password: userData.password};
    try {
      const response = await postLogin(data);
      if (!response) {
        return new Error('Failed to retrieve data!');
      }
      console.log(response);
      try {
        await AsyncStorage.setItem('userToken', response.token);
        setUser(response.user);
        setIsLoggedIn(true);
        navigation.navigate('Tabs');
      } catch (e) {
        return new Error(e.message);
      }
    } catch (e) {
      return new Error(e.message);
    }
  }

  return (
    <View>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            style={styles.text}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Username"
          />
        )}
        name="username"
      />
      {errors.username && <Text>This is required.</Text>}

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            secureTextEntry={true}
            style={styles.text}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Password"
          />
        )}
        name="password"
      />
      {errors.password && <Text>This is required.</Text>}
      <Button title="Sign in" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    borderWidth: 1,
    padding: 5,
    margin: 5,
    textAlign: 'center',
    width: 200,
  },
});


export default LoginForm;