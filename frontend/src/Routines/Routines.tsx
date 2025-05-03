import {
  Chip,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  FormControl,
  Button,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/material";
import React from "react";

import { useAppDispatch, useAppSelector } from "../App/hooks";

import {
  routineCreated,
  routineRemoved,
  routineUpdated,
  selectSelectedRoutine,
  setRoutine,
} from "./RoutineSlice/routineSlice";
import { selectCurrentTabRoutines } from "../Display/tabSlice";

const Routines = () => {
  const routines = useAppSelector(selectCurrentTabRoutines);
  const selectedRoutine = useAppSelector(selectSelectedRoutine);
  const dispatch = useAppDispatch();

  const handleCopyRoutine = () => {
    dispatch(routineCreated({ copy: true }));
  };

  const routineOptions: JSX.Element[] = [];
  const routineDisplays: JSX.Element[] = [];
  routines.forEach((routine) => {
    routineOptions.push(
      <MenuItem value={routine.id} key={routine.id}>
        {routine.name}
      </MenuItem>
    );
    routineDisplays.push(
      <Box component="li" key={routine.id} sx={{ margin: 0.5, maxWidth: 1 }}>
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
          sx={{ maxWidth: 1 }}
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
          {routineOptions.length > 0 ? (
            <Grid
              size={{
                xs: 12,
                sm: 8,
                md: 12,
                lg: 8,
              }}
            >
              <FormControl fullWidth>
                <InputLabel id="select-routine-label">
                  Select Routine
                </InputLabel>
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
          ) : (
            ""
          )}
          {/* <Grid
            container
            justifyContent="center"
            size={{
              xs: 6,
              sm: 3,
              md: 6,
              lg: 3,
            }}
          >
            <Button
              variant="contained"
              onClick={() => {
                dispatch(routineCreated({ copy: false }));
              }}
            >
              Create New Routine
            </Button>
          </Grid> */}
          <Grid
            container
            justifyContent="center"
            size={{
              xs: 12,
              sm: 4,
              md: 12,
              lg: 4,
            }}
          >
            <Button variant="outlined" onClick={handleCopyRoutine}>
              Copy Selected Routine to tab
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </React.Fragment>
  );
};

export default Routines;
