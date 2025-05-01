import { Button, Paper, TextField } from "@mui/material";
import Grid from "@mui/material/Grid";
import React, { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "../App/hooks";
// import { exampleRoutines } from "../Model/exampleRoutines";
import { importStates } from "../Model/types";
import {
  importRoutine,
  selectImportState,
  selectSelectedRoutineObject,
} from "../Routines/RoutineSlice/routineSlice";
// import { useSelector } from "react-redux";

/* TODO: 
  Convert to mui
  Add save routines button
  Add load example routines button
*/
const ImportExport = () => {
  const routine = useAppSelector(selectSelectedRoutineObject);
  const importState = useAppSelector(selectImportState);
  const [messageSeen, setMessageSeen] = useState(false);
  const [textValue, setTextValue] = useState("");

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!messageSeen) {
      if (importState === importStates.Failure) {
        setTextValue("Import failed");
        setMessageSeen(true);
      } else if (importState === importStates.Successful) {
        setTextValue("Import successful");
        setMessageSeen(true);
      }
    }
  }, [importState, messageSeen]);

  const tryToAddRoutine = () => {
    dispatch(importRoutine(textValue));
    setMessageSeen(false);
  };
  const paste = () => {
    setTextValue(JSON.stringify(routine));
  };

  //   const saveRoutines = () => {try {
  //       const serialState = JSON.stringify(state);
  //       localStorage.setItem('appState', serialState);
  //     } catch(err) {
  //         console.log(err);
  //     }
  // };
  // const loadSavedRoutines = () => {};
  // const addExampleRoutines = () => {
  //   for (let r of exampleRoutines) {
  //     dispatch(importRoutine(r));
  //   }
  // };
  const copy = () => {
    if (navigator.clipboard !== undefined) {
      // textAreaRef.current.select();
      // textAreaRef!.current.setSelectionRange(0, 99999); /* For mobile devices */
      navigator.clipboard.writeText(textValue);
      setTextValue("Copied");
      // document.execCommand("copy");
    }
  };
  return (
    <Paper sx={{ p: 1 }}>
      <Grid container>
        <Grid>
          <Button onClick={tryToAddRoutine}>Import</Button>
        </Grid>
        <Grid>
          <Button onClick={paste}>Export</Button>
        </Grid>
        <Grid>
          <Button onClick={copy}>Copy</Button>
        </Grid>
        {/* <Grid item>
          <Button onClick={saveRoutines}>Save Routines</Button>
        </Grid> */}
        {/* <Grid item>
          <Button onClick={loadSavedRoutines}>Load Saved Routines</Button>
        </Grid> */}
        {/* <Grid item>
          <Button onClick={addExampleRoutines}>Add example Routines</Button>
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

export default ImportExport;
