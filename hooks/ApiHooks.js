import {useEffect, useState} from "react";

const apiUrl = "https://media.mw.metropolia.fi/wbma/";
const useMedia = () => {
  const [mediaArray, setMediaArray] = useState({hits: []});
  const useMedia = async (start = 0, limit = 10) => {
    const url = apiUrl + "media/";
    try {
      const response = await fetch(`${url}?start=${start}&limit=${limit}`);
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
      console.error(e);
    }
  };
  useEffect(async () => {
    await useMedia();
  }, []);
  return {mediaArray};
};

export {useMedia};
