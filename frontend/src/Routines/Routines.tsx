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
import Menu from "@mui/material/Menu";
import React from "react";
import { selectAllTabs } from "../Display/tabSlice";

import { useAppDispatch, useAppSelector } from "../App/hooks";

import {
  routineCreated,
  routineRemoved,
  routineUpdated,
  selectSelectedRoutine,
  setRoutine,
} from "./RoutineSlice/routineSlice";
import {
  selectCurrentTabRoutines,
  selectCurrentTabId,
} from "../Display/tabSlice";

const Routines = () => {
  const routines = useAppSelector(selectCurrentTabRoutines);
  const selectedRoutine = useAppSelector(selectSelectedRoutine);
  const selectedTabId = useAppSelector(selectCurrentTabId);
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
        <Button
          variant="contained"
          onClick={() => {
            dispatch(routineCreated({ copy: false, tabId: selectedTabId }));
          }}
          sx={{ float: "inline-end" } as const}
        >
          Create New Routine
        </Button>
      </Paper>
      {routineOptions.length > 0 ? (
        <Paper sx={{ my: 2, p: 1 }}>
          <Grid container spacing={1}>
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
                  value={selectedRoutine ?? ""}
                  label="Select Routine"
                  onChange={(e) => dispatch(setRoutine(e.target.value))}
                >
                  {routineOptions}
                </Select>
              </FormControl>
            </Grid>
            {selectedRoutine !== undefined ? (
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
                <CopyMenu />
              </Grid>
            ) : (
              ""
            )}
          </Grid>
        </Paper>
      ) : (
        ""
      )}
    </React.Fragment>
  );
};

const CopyMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const tabs = useAppSelector(selectAllTabs);

  const dispatch = useAppDispatch();
  const handleCopyRoutine = (tabId: number) => {
    dispatch(routineCreated({ copy: true, tabId }));
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        Copy Routine to Tab
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: { "aria-labelledby": "basic-button" },
        }}
      >
        {tabs.map((tab) => (
          <MenuItem
            key={tab.id}
            onClick={() => {
              handleCopyRoutine(tab.id);
              handleClose();
            }}
          >
            {tab.name}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default Routines;
