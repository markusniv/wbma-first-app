import React, {useContext} from "react";
import {View} from "react-native";
import {useForm, Controller} from "react-hook-form";
import {useUser} from '../hooks/ApiHooks';
import {Input, Button, } from "react-native-elements";

const RegisterForm = ({setRegister}) => {
  const {control, handleSubmit, getValues, formState: {errors}} = useForm({
    defaultValues: {
      username: '',
      password: '',
      email: '',
      full_name: '',
    },
    mode: 'onBlur',
  });
  const {postUser} = useUser();
  const {checkUser} = useUser()
  const onSubmit = data => postRegister(data);

  const postRegister = async (userData) => {
    if (userData.password != userData.confirm_password) return;
    const data = {username: userData.username, password: userData.password, email: userData.email, full_name: userData.full_name};
    try {
      const response = await postUser(data);
      console.log(response);
      if (!response) {
        return new Error('Failed to create a user!');
      }
      setRegister(false);
    } catch (e) {
      return new Error(e.message);
    }
  }

  return (
    <View>
      <Controller
        control={control}
        rules={{
          required: {value: true, message: 'Username is required.'},
          minLength: {
            value: 3,
            message: 'Username must be atleast 3 characters',
          },
          validate: async (value) => {
            const res = await checkUser(value);
            console.log(res);
            if (!res) return 'Username is already taken'
            return true;
          }
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            containerStyle={{width: 300}}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
            placeholder="Username*"
            errorMessage={errors.username && errors.username.message}
          />
        )}
        name="username"
      />

      <Controller
        control={control}
        rules={{
          required: {value: true, message: 'Password is required.'},
          pattern: {
            value: /^(?=.{5,}$)(?=.*[A-Z])(?=.*[0-9]).*$/,
            message: 'Atleast 5 characters long, one capital and one number',
          },
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            containerStyle={{width: 300}}
            secureTextEntry={true}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Password*"
            errorMessage={errors.password && errors.password.message}
          />
        )}
        name="password"
      />

      <Controller
        control={control}
        rules={{
          required: {value: true, message: 'Confirm your password!'},
          validate: async (value) => {
            const password = getValues('password');
            console.log(password);
            if (password != value) return "Passwords do not match!";
            return true;
          },
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            containerStyle={{width: 300}}
            secureTextEntry={true}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Confirm password*"
            errorMessage={errors.confirm_password && errors.confirm_password.message}
          />
        )}
        name="confirm_password"
      />

      <Controller
        control={control}
        rules={{
          required: {value: true, message: 'Email is required.'},
          pattern: {
            value: /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
            message: 'Email not valid.',
          },
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            containerStyle={{width: 300}}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Email*"
            errorMessage={errors.email && errors.email.message}
          />
        )}
        name="email"
      />

      <Controller
        control={control}
        rules={{
          required: false,
          minLength: {
            value: 3,
            message: 'Name must be atleast 3 characters',
          },
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            containerStyle={{width: 300}}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Full name"
            errorMessage={errors.full_name && errors.full_name.message}
          />
        )}
        name="full_name"
      />
      <Button title="Register" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}

export default RegisterForm;