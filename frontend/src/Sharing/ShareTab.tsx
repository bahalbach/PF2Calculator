import { Button, Paper, TextField } from "@mui/material";
import Grid from "@mui/material/Grid";
import React, { useCallback, useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "../App/hooks";
// import { exampleRoutines } from "../Model/exampleRoutines";
import { importStates } from "../Model/types";
import {
  importRoutine,
  selectSelectedRoutineObject,
} from "../Routines/RoutineSlice/routineSlice";
import {
  selectCurrentTabRoutineObjects,
  selectCurrentTabEntity,
  importTabFromCode,
  Tab,
  selectImportError,
  selectIsImportingTab,
} from "../Display/tabSlice";
import { RoutineObject } from "../Routines/RoutineSlice/RoutineTypes";

const SHARE_TAB_URL = "https://r2-worker.bahalbach.workers.dev/tab";

const ShareTab = () => {
  const [textValue, setTextValue] = useState("");
  const currentTab = useAppSelector(selectCurrentTabEntity);
  const currentTabRoutines = useAppSelector(selectCurrentTabRoutineObjects);
  const isImportingTab = useAppSelector(selectIsImportingTab);
  const importError = useAppSelector(selectImportError);
  useEffect(() => {
    if (importError) {
      setTextValue(`Error importing tab: ${importError}`);
    }
  }, [importError]);
  const shareTab = useCallback(() => {
    // Logic to share the tab, e.g., via a link or API call
    console.log("Share Tab clicked with routines:", currentTabRoutines);
    const routinesToShare = JSON.stringify({
      tab: currentTab,
      routines: currentTabRoutines,
    });
    // Post the routines to the server or handle them as needed
    fetch(SHARE_TAB_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: routinesToShare,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Tab shared successfully:", data);
        const { tabId: code } = data;
        const currentUrl = new URL(window.location.href);
        // Update the URL with the new code
        currentUrl.searchParams.set("code", code);
        const shareUrl = currentUrl.toString();
        console.log("Share URL:", shareUrl);
        setTextValue(
          `Tab shared successfully! Use this URL to import: ${shareUrl}`
        );
      })
      .catch((error) => {
        console.error("Error sharing tab:", error);
        setTextValue("Failed to share tab");
      });
  }, [currentTab, currentTabRoutines]);

  const dispatch = useAppDispatch();
  // const importTabFromCode = useCallback(() => {
  //   const code = textValue.trim();
  //   if (code === "") {
  //     console.error("No routine code provided for import.");
  //     return;
  //   }
  //   dispatch(importTabFromCode(code))
  //   // fetch(`${SHARE_TAB_URL}/${code}`, {
  //   //   method: "GET",
  //   //   headers: {
  //   //     "Content-Type": "application/json",
  //   //   },
  //   // })
  //   //   .then((response) => {
  //   //     if (!response.ok) {
  //   //       throw new Error("Failed to import routine");
  //   //     }
  //   //     return response.json();
  //   //   })
  //   //   .then((data: { tab: Tab; routines: RoutineObject[] }) => {
  //   //     console.log("Routine imported successfully:", data);
  //   //     dispatch(importTab(data));
  //   //     setTextValue("Routine imported successfully");
  //   //   })
  //   //   .catch((error) => {
  //   //     console.error("Error importing routine:", error);
  //   //     setTextValue("Failed to import routine");
  //   //   });
  // }, [dispatch, textValue]);

  return (
    <Paper sx={{ p: 1 }}>
      <Grid container>
        <Grid>
          <Button onClick={shareTab}>Share Current Tab</Button>
        </Grid>
        {/* <Grid>
          <Button
            disabled={isImportingTab || textValue.trim() === ""}
            onClick={() => dispatch(importTabFromCode(textValue))}
          >
            Import Tab from Code
          </Button>
        </Grid> */}
        {/* <Grid>
          <Button onClick={paste}>Export</Button>
        </Grid>
        <Grid>
          <Button onClick={copy}>Copy</Button>
        </Grid> */}
        <Grid size={12}>
          <TextField
            fullWidth
            multiline
            maxRows={5}
            label="Routine code"
            placeholder="Enter routine code here to import."
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};
export default ShareTab;
