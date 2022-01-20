import React, {useContext} from "react";
import {Text, View, TextInput, Button, StyleSheet} from "react-native";
import {MainContext} from '../Contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useForm, Controller} from "react-hook-form";
import {useUser} from '../hooks/ApiHooks';
import {Input} from "react-native-elements";

const RegisterForm = () => {
  const {control, handleSubmit, formState: {errors}} = useForm({
    defaultValues: {
      username: '',
      password: '',
      email: '',
      full_name: '',
    }
  });
  const {postUser} = useUser();
  const onSubmit = data => register(data);

  const register = async (userData) => {

    const data = {username: userData.username, password: userData.password, email: userData.email, full_name: userData.full_name};
    try {
      const response = await postUser(data);
      console.log(response);
      if (!response) {
        return new Error('Failed to create a user!');
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
          <Input
            containerStyle={{width: 300}}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Username*"
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
          <Input
            containerStyle={{width: 300}}
            secureTextEntry={true}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Password*"
          />
        )}
        name="password"
      />

      {errors.password && <Text>This is required.</Text>}

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            containerStyle={{width: 300}}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Email*"
          />
        )}
        name="email"
      />
      {errors.username && <Text>This is required.</Text>}

      <Controller
        control={control}
        rules={{
          required: false,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            containerStyle={{width: 300}}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Full name"
          />
        )}
        name="full_name"
      />
      {errors.username && <Text>This is required.</Text>}
      <Button title="Register" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}

export default RegisterForm;