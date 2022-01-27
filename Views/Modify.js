import React, {useState, useContext} from 'react';
import {StyleSheet, SafeAreaView, View, ActivityIndicator, Alert} from 'react-native';
import {Button, Image, Input} from 'react-native-elements';
import PropTypes from 'prop-types';
import {useForm, Controller} from 'react-hook-form';
import {useMedia} from '../hooks/ApiHooks';
import {MainContext} from '../Contexts/MainContext';
import {useFocusEffect} from '@react-navigation/native';

const Modify = ({navigation, route}) => {
  const url = 'https://media.mw.metropolia.fi/wbma/uploads/';
  const {media} = route.params;
  const singleMedia = media.singleMedia;

  const [activated, setActivated] = useState({
    title: false,
    description: false,
  });
  const [loading, setLoading] = useState(false);

  const {update, setUpdate} = useContext(MainContext);
  const {putMedia} = useMedia();
  const {control, handleSubmit, getValues, formState: {errors}} = useForm({
    mode: 'onBlur',
  });

  const [titleInput, setTitleInput] = useState('');
  const [descriptionInput, setDescriptionInput] = useState('');

  useFocusEffect(React.useCallback(() => reset(), []));

  const onSubmit = async (data) => {
    setLoading(true);
    const upload = await putMedia(data, singleMedia.file_id);
    if (upload) {
      setUpdate(!update);
      setTimeout(() => {
        setLoading(false);
        reset();
        navigation.navigate('My Files');
      }, 1000);
    }
  }

  const reset = () => {
    setTitleInput('');
    setDescriptionInput('');
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image source={{uri: `${url}${singleMedia.filename}`}} containerStyle={{width: 200, height: 200}} />
      <Controller
        control={control}
        rules={{
          required: {value: true, message: 'Title is required.'},
          minLength: {
            value: 5,
            message: 'Title must be atleast 5 characters',
          },
          onChange: (e) => {
            setTitleInput(e.target.value);
            if (e.target.value.length >= 5) {
              setActivated({
                title: true,
                description: activated.description,
              })
            } else {
              setActivated({
                title: false,
                description: activated.description,
              })
            }
          }
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            containerStyle={{width: 300}}
            onBlur={onBlur}
            onChangeText={onChange}
            value={titleInput}
            autoCapitalize="none"
            placeholder="Title*"
            errorMessage={errors.title && errors.title.message}
          />
        )}
        name="title"
      />
      <Controller
        control={control}
        rules={{
          required: false,
          minLength: {
            value: 10,
            message: 'Description must be atleast 10 characters',
          },
          onChange: (e) => {
            setDescriptionInput(e.target.value);
            if (e.target.value.length >= 10) {
              setActivated({
                title: activated.title,
                description: true,
              })
            } else {
              setActivated({
                title: activated.title,
                description: false,
              })
            }
          }
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            containerStyle={{width: 300}}
            onBlur={onBlur}
            onChangeText={onChange}
            value={descriptionInput}
            autoCapitalize="none"
            placeholder="Description*"
            errorMessage={errors.description && errors.description.message}
          />
        )}
        name="description"
      />
      <Button
        title="Upload"
        loading={loading}
        onPress={handleSubmit(onSubmit)}
        disabled={!(activated.title && activated.description)}
      />
      <Button
        title="Reset"
        onPress={reset}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
});

Modify.propTypes = {
  navigation: PropTypes.object,
};

export default Modify;