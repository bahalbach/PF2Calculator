import { Button, useMediaQuery } from "@mui/material";
import React from "react";

import ShareIcon from "@mui/icons-material/Share";
import { saveImgLink, selectGraphUrl } from "../Display/sharingSlice";
import { useAppDispatch, useAppSelector } from "../App/hooks";
import { selectRoutineDescriptions } from "../Routines/RoutineSlice/routineSlice";

const url = "https://api.imgur.com/3/image";
const auth = "Client-ID 9f68ffe6050491a";

export const Upload = () => {
  const graphUrl = useAppSelector(selectGraphUrl).split(";base64,")[1];
  const routineDescriptions = useAppSelector(selectRoutineDescriptions);
  const dispatch = useAppDispatch();

  const isBigEnough = useMediaQuery((theme: any) => {
    return theme.breakpoints.up("sm");
  });

  const title = "Graph from https://bahalbach.github.io/PF2Calculator/";
  let description =
    "Graph made with https://bahalbach.github.io/PF2Calculator/ ";
  for (let rd of routineDescriptions) {
    description += rd + "\n\n";
  }
  const fd = new FormData();
  fd.append("image", graphUrl);
  fd.append("title", title);
  fd.append("description", description);
  const requestOptions: RequestInit = {
    method: "POST",
    headers: { Authorization: auth },
    body: fd,
  };

  const uploadImage = () => {
    // console.log(description);
    // console.log(routineDescriptions);

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
  };
  return (
    <Button
      onClick={uploadImage}
      variant="contained"
      color="secondary"
      endIcon={<ShareIcon />}
    >
      {isBigEnough ? "Share with IMGUR" : "Share"}
    </Button>
  );
};
