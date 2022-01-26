import React, {useState, useContext} from 'react';
import {StyleSheet, SafeAreaView, View, ActivityIndicator, Alert} from 'react-native';
import {Button, Image, Input} from 'react-native-elements';
import PropTypes from 'prop-types';
import {useForm, Controller} from 'react-hook-form';
import {useMedia} from '../hooks/ApiHooks';
import * as ImagePicker from 'expo-image-picker';
import {MainContext} from '../Contexts/MainContext';
import {useFocusEffect} from '@react-navigation/native';

const Upload = ({navigation}) => {
  const [activated, setActivated] = useState({
    title: false,
    description: false,
    file: false,
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState({});

  const {update, setUpdate} = useContext(MainContext);
  const {postMedia} = useMedia();
  const {control, handleSubmit, getValues, formState: {errors}} = useForm({
    mode: 'onBlur',
  });

  const [titleInput, setTitleInput] = useState('');
  const [descriptionInput, setDescriptionInput] = useState('');

  useFocusEffect(React.useCallback(() => reset(), []));

  const onSubmit = async (data) => {
    console.log(file);
    if (!file.uri) {
      Alert.alert(
        "Error!",
        "Please select an image!",
        [
          {
            text: "Ok",
          }
        ]
      )
      return;
    }
    const formData = new FormData();

    formData.append("title", data.title);
    if (data.description) formData.append("description", data.description);
    formData.append("file", {
      uri: file.uri,
      name: file.fileName,
      type: file.mimeType,
    })
    setLoading(true);
    const upload = await postMedia(formData);
    if (upload) {
      setUpdate(!update);
      setTimeout(() => {
        setLoading(false);
        reset();
        navigation.navigate('Home');
      }, 1000);
    }
  }

  const selectFile = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      const fileName = result.uri.split('/').pop();
      let mimeType = fileName.split('.').pop();
      if (mimeType === 'jpg') mimeType = 'jpeg';
      setFile({
        uri: result.uri,
        fileName: fileName,
        mimeType: `${result.type}/${mimeType}`,
      })
      setImage(result.uri);
      setActivated({
        title: activated.title,
        description: activated.description,
        file: true,
      })
    }
  }

  const reset = () => {
    setTitleInput('');
    setDescriptionInput('');
    setImage(null);
  }

  return (
    <SafeAreaView style={styles.container}>
      {image && <Image source={{uri: image}} containerStyle={{width: 200, height: 200}} />}
      <Button title="Select file..." onPress={selectFile} />
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
                file: activated.file,
              })
            } else {
              setActivated({
                title: false,
                description: activated.description,
                file: activated.file,
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
                file: activated.file,
              })
            } else {
              setActivated({
                title: activated.title,
                description: false,
                file: activated.file,
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
        disabled={!(activated.title && activated.description && activated.file)}
      />
      <Button
        title="Reset"
        loading={loading}
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

Upload.propTypes = {
  navigation: PropTypes.object,
};

export default Upload;