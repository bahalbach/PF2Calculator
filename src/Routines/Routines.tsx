import {
  Chip,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  FormControl,
  Grid,
  Button,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

import { useAppDispatch, useAppSelector } from "../App/hooks";

import {
  routineCreated,
  routineRemoved,
  routineUpdated,
  selectAllRoutines,
  selectSelectedRoutine,
  setRoutine,
} from "./RoutineSlice/routineSlice";

const Routines = () => {
  const routines = useAppSelector(selectAllRoutines);
  const selectedRoutine = useAppSelector(selectSelectedRoutine);
  const dispatch = useAppDispatch();

  const routineOptions: JSX.Element[] = [];
  const routineDisplays: JSX.Element[] = [];
  routines.forEach((routine) => {
    routineOptions.push(
      <MenuItem value={routine.id} key={routine.id}>
        {routine.name}
      </MenuItem>
    );
    routineDisplays.push(
      <Box component="li" key={routine.id} sx={{ margin: 0.5 }}>
        <Chip
          label={routine.name}
          variant={routine.display ? "filled" : "outlined"}
          size="small"
          color="secondary"
          onClick={() => {
            dispatch(
              routineUpdated({
                id: routine.id,
                changes: { display: !routine.display },
              })
            );
            dispatch(setRoutine(routine.id));
          }}
          onDelete={() => dispatch(routineRemoved(routine.id))}
        />
      </Box>
    );
  });

  return (
    <React.Fragment>
      <Paper
        variant="outlined"
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          listStyle: "none",
          p: 0.5,
          my: 2,
        }}
        component="ul"
      >
        {routineDisplays}
      </Paper>
      <Paper sx={{ my: 2, p: 1 }}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6} md={12} lg={6}>
            <FormControl fullWidth>
              <InputLabel id="select-routine-label">Select Routine</InputLabel>
              <Select
                labelId="select-routine-label"
                id="select-routine"
                value={selectedRoutine}
                label="Select Routine"
                onChange={(e) => dispatch(setRoutine(e.target.value))}
              >
                {routineOptions}
              </Select>
            </FormControl>
          </Grid>
          <Grid
            item
            container
            xs={6}
            sm={3}
            md={6}
            lg={3}
            justifyContent="center"
          >
            <Button
              variant="contained"
              onClick={() => dispatch(routineCreated({ copy: false }))}
            >
              Create New Routine
            </Button>
          </Grid>
          <Grid
            item
            container
            xs={6}
            sm={3}
            md={6}
            lg={3}
            justifyContent="center"
          >
            <Button
              variant="outlined"
              onClick={() => dispatch(routineCreated({ copy: true }))}
            >
              Copy Selected Routine
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </React.Fragment>
  );
};

export default Routines;
