import { useCallback } from "react";
import { saveImgLink, selectGraphUrl } from "../Display/sharingSlice";
import { useAppDispatch, useAppSelector } from "../App/hooks";
import { selectRoutineDescriptions } from "../Routines/RoutineSlice/routineSlice";
import { RootState } from "../App/store";

import ReactGA from "react-ga4";
ReactGA.initialize("G-JR2YK097BG");

const url = "https://api.imgur.com/3/image";
const auth = "Client-ID 9f68ffe6050491a";

const useShareWithImgur = (byLevel: boolean) => {
  const graphUrl = useAppSelector((state: RootState) =>
    selectGraphUrl(state, byLevel)
  ).split(";base64,")[1];
  const routineDescriptions = useAppSelector(selectRoutineDescriptions);
  const dispatch = useAppDispatch();

  const uploadImage = useCallback(() => {
    const title = "Graph from https://bahalbach.github.io/PF2Calculator/";
    let description = "";
    // "Graph made with https://bahalbach.github.io/PF2Calculator/ ";
    for (let rd of routineDescriptions) {
      description += rd + " \r\n";
    }
    description +=
      "\n Graph made with https://bahalbach.github.io/PF2Calculator/ ";
    const fd = new FormData();
    fd.append("image", graphUrl);
    fd.append("title", title);
    fd.append("description", description);
    const requestOptions: RequestInit = {
      method: "POST",
      headers: { Authorization: auth },
      body: fd,
    };
    // console.log(description);
    // console.log(routineDescriptions);
    ReactGA.event("share");

    const tab = window.open("about:blank");
    fetch(url, requestOptions)
      .then((response) => {
        // console.log(response);
        // if (response.ok) {
        //   alert("Image uploaded to album");
        // }
        return response.json();
      })
      .then((json) => {
        console.log(`description is ${json.data.description}`);
        dispatch(saveImgLink(json.data.link));
        if (tab !== null) {
          tab.location = json.data.link;
          tab.focus();
        }
        // window.open(url, "_blank").focus();
      })
      .catch((error) => {
        console.error(error);
        alert("Upload failed: " + error);
        tab?.close();
      });
  }, [graphUrl, dispatch, routineDescriptions]);
  return uploadImage;
};

export default useShareWithImgur;
