import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "../App/hooks";
import { exampleRoutines } from "../Model/exampleRoutines";
import { importStates } from "../Model/types";
import {
  importRoutine,
  selectImportState,
  selectSelectedRoutineObject,
} from "../Routines/RoutineSlice/routineSlice";
import { Upload } from "./Upload";
// import { useSelector } from "react-redux";

/* TODO: 
  Convert to mui
  Add save routines button
  Add load example routines button
*/
const ImportExport = () => {
  const routine = useAppSelector(selectSelectedRoutineObject);
  const importState = useAppSelector(selectImportState);
  // const textAreaRef: RefObject<HTMLTextAreaElement> = useRef(null);
  const [textValue, setTextValue] = useState("");
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (importState === importStates.Failure) {
      setTextValue("Import failed");
    } else if (importState === importStates.Successful) {
      setTextValue("Import successful");
    }
  }, [importState]);

  const tryToAddRoutine = () => {
    dispatch(importRoutine(textValue));
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
  const addExampleRoutines = () => {
    for (let r of exampleRoutines) {
      dispatch(importRoutine(r));
    }
  };
  // const copy = () => {
  //   if (textAreaRef.current) {
  //     textAreaRef.current.select();
  //     textAreaRef!.current.setSelectionRange(0, 99999); /* For mobile devices */
  //     navigator.clipboard.writeText(textAreaRef.current.value);
  //     // document.execCommand("copy");
  //   }
  // };
  return (
    <Paper sx={{ p: 1 }}>
      <Typography variant="h5">Import and Export Here:</Typography>
      <Grid container>
        <Grid item>
          <Button onClick={tryToAddRoutine}>Import</Button>
        </Grid>
        <Grid item>
          <Button onClick={paste}>Export</Button>
        </Grid>
        {/* <Grid item>
          <Button onClick={saveRoutines}>Save Routines</Button>
        </Grid> */}
        {/* <Grid item>
          <Button onClick={loadSavedRoutines}>Load Saved Routines</Button>
        </Grid> */}
        <Grid item>
          <Button onClick={addExampleRoutines}>Add example Routines</Button>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            multiline
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
