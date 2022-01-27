import {useEffect, useState} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

import data from '../global/tag.json'

const apiUrl = "https://media.mw.metropolia.fi/wbma/";
const tag = data.tag;

const useMedia = (update) => {

  const [mediaArray, setMediaArray] = useState({hits: []});

  const useMedia = async () => {
    const url = apiUrl + "media/";
    try {
      const response = await fetch(`${apiUrl}tags/${tag}`);
      const array = await response.json();
      const json = await Promise.all(
        array.map(async (item) => {
          const response = await fetch(url + item.file_id);
          const json = await response.json();
          return json;
        })
      );
      setMediaArray(json);
    } catch (e) {
      throw new Error(e.message);
    }
  };

  const postMedia = async (data) => {
    const token = await AsyncStorage.getItem('userToken');
    const options = {
      method: 'POST',
      headers: {
        'x-access-token': token,
      },
      body: data,
    };

    try {
      const response = await fetch(apiUrl + "media/", options);
      if (!response.ok) {
        return new Error('Failed to upload data!');
      }
      console.log("Succesfully uploaded, now adding tag...");

      const json = await response.json();

      const tBody = {
        file_id: json.file_id,
        tag: tag,
      };

      const tOptions = {
        method: 'POST',
        headers: {
          'x-access-token': token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tBody)
      };

      const tResponse = await fetch(apiUrl + "tags", tOptions);
      if (!tResponse.ok) {
        return new Error('Failed to create a tag!');
      }
      const tJson = tResponse.json();

      return tJson;
    } catch (e) {
      throw new Error(e.message);
    }
  };

  useEffect(async () => {
    await useMedia();
  }, [update]);
  return {mediaArray, postMedia};
};



const useAvatar = () => {

  const getAvatar = async (user) => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const uri = `${apiUrl}tags/avatar_${user.user_id}`;

      const response = await fetch(uri, options);
      const json = await response.json();

      const src = `${apiUrl}uploads/${json[0].filename}`;

      return src;
    } catch (e) {
      return new Error(e.message);
    }
  }
  return {getAvatar};
}

const useLogin = () => {

  const postLogin = async (userCredentials) => { // user credentials format: {username: 'someUsername', password: 'somePassword'}
    const options = {
      // TODO: add method, headers and body for sending json data with POST
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userCredentials)
    };
    try {
      // TODO: use fetch to send request to login endpoint and return the result as json, handle errors with try/catch and response.ok
      const response = await fetch(apiUrl + "login", options);
      if (!response.ok) {
        return new Error('Failed to retrieve data!');
      }
      return response.json();
    } catch (e) {
      throw new Error(e.message);
    }
  };

  return {postLogin};
};

const useUser = () => {
  const getUserByToken = async (token) => {
    try {
      const options = {
        method: 'GET',
        headers: {'x-access-token': token},
      };
      const response = await fetch(apiUrl + 'users/user', options);
      const userData = await response.json();
      if (response.ok) {
        return userData;
      } else {
        throw new Error(userData.message);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const getUserById = async (id) => {
    const token = await AsyncStorage.getItem('userToken');
    try {
      const options = {
        method: 'GET',
        headers: {'x-access-token': token},
      };
      const response = await fetch(apiUrl + 'users/' + id, options);
      const userData = await response.json();
      if (response.ok) {
        return userData.username;
      } else {
        throw new Error(userData.message);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  const postUser = async (data) => {
    console.log(data);
    const options = {
      // TODO: add method, headers and body for sending json data with POST
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };
    try {
      // TODO: use fetch to send request to login endpoint and return the result as json, handle errors with try/catch and response.ok
      const response = await fetch(apiUrl + "users", options);
      if (!response.ok) {
        return new Error('Failed to create a user!');
      }
      return response.json();
    } catch (e) {
      throw new Error(e.message);
    }
  }

  const checkUser = async (username) => {
    try {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const response = await fetch(apiUrl + 'users/username/' + username, options);
      const userData = await response.json();
      if (response.ok) {
        console.log(userData);
        return userData.available;
      } else {
        throw new Error(userData.message);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  return {getUserByToken, postUser, checkUser, getUserById};
}

export {useMedia, useLogin, useUser, useAvatar};
