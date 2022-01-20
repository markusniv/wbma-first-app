import {useEffect, useState} from "react";
import {MainContext} from '../Contexts/MainContext';

const apiUrl = "https://media.mw.metropolia.fi/wbma/";

const useMedia = () => {

  const [mediaArray, setMediaArray] = useState({hits: []});

  const useMedia = async () => {
    const url = apiUrl + "media/";
    try {
      const response = await fetch(url);
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

  useEffect(async () => {
    await useMedia();
  }, []);
  return {mediaArray};
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
      const userData = response.json();
      if (response.ok) {
        return userData;
      } else {
        throw new Error(userData.message);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

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

  return {getUserByToken, postUser};
}

export {useMedia, useLogin, useUser, useAvatar};
