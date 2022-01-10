import { useEffect, useState } from "react";

const apiUrl = "https://media.mw.metropolia.fi/wbma/";
const useMedia = () => {
  const [mediaArray, setMediaArray] = useState({ hits: [] });
  const useMedia = async () => {
    const url = apiUrl + "media/";
    try {
      const response = await fetch(url);
      const array = await response.json();
      console.log(array);
      const json = await Promise.all(
        array.map(async (item) => {
          console.log(url + item.file_id);
          const response = await fetch(url + item.file_id);
          console.log(response);
          const json = await response.json();
          console.log(json);
          return json;
        })
      );
      console.log(json);
      setMediaArray(json);
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(async () => {
    await useMedia();
  }, []);
  return { mediaArray };
};

export { useMedia };
