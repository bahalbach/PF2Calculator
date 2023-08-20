import React, { useEffect } from "react";

import ReactGA from "react-ga4";

import Display from "../Display/Display";
import SelectedRoutine from "../Routines/SelectedRoutine";
import Routines from "../Routines/Routines";
import Export from "../Sharing/Export";

import "./PF2App.css";

import {
  selectSelectedRoutine,
  selectSelectedActivityPath,
  selectCreateNewActivity,
} from "../Routines/RoutineSlice/routineSlice";
import { Container, Grid, Box, Button } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
// import Header from "./Header";
import { ActivityPath } from "../Routines/Activity/ActivityPath";
import NewActivity from "../Routines/NewActivity/NewActivity";
import { useAppSelector } from "./hooks";

// Initialize google analytics
ReactGA.initialize("G-JR2YK097BG");

function PF2App() {
  const isBigEnough = useMediaQuery((theme: any) => {
    return theme.breakpoints.up("md");
  });

  ReactGA.send("pageview");

  return (
    <React.Fragment>
      {/* <Header /> */}
      <Container maxWidth="xl">
        {isBigEnough ? (
          <Grid
            container
            columnSpacing={{ xs: 2, md: 2, lg: 3, xl: 4 }}
            sx={{ height: "100vh" }}
          >
            <Grid
              id="container"
              item
              xs={12}
              md={6}
              sx={{ height: "100%", overflow: "auto" }}
            >
              <Controls />
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              sx={{ mt: 0, height: 1, overflow: "hidden auto" }}
            >
              <Display />
            </Grid>
          </Grid>
        ) : (
          <React.Fragment>
            <Display />
            <Controls />
          </React.Fragment>
        )}
      </Container>
    </React.Fragment>
  );
}

const Controls = () => {
  const selectedRoutine = useAppSelector(selectSelectedRoutine);
  const selectedActivityPath = useAppSelector(selectSelectedActivityPath);
  const createNewActivity = useAppSelector(selectCreateNewActivity);

  useEffect(() => {
    if (createNewActivity) {
      window.location.href = "#create-new-activity";
      ReactGA.event("select_content", {
        content_type: "new-activity",
        item_id: "create-new-activity",
      });
    }
  }, [createNewActivity]);

  return (
    <Box sx={{}}>
      <Routines />
      {selectedRoutine !== undefined ? (
        <SelectedRoutine routineId={selectedRoutine} />
      ) : (
        ""
      )}
      {selectedActivityPath !== undefined ? (
        <ActivityPath id={selectedActivityPath} open={true} />
      ) : createNewActivity ? (
        <NewActivity />
      ) : (
        ""
      )}
      <Export />
      <Grid
        container
        sx={{ mb: 2, mt: 0 }}
        justifyContent="space-evenly"
        alignItems="center"
        spacing={2}
      >
        <Grid item>
          <Donate />
        </Grid>
        <Grid item>
          <Contact />
        </Grid>
      </Grid>
    </Box>
  );
};

const Donate = () => {
  return (
    <Box
      sx={{ height: 60, width: 217 }}
      onClick={() =>
        ReactGA.event("select_content", {
          content_type: "buy-me-a-coffee",
        })
      }
    >
      <a
        href="https://www.buymeacoffee.com/bahalbach"
        target="_blank"
        rel="noreferrer"
      >
        <img
          src="https://cdn.buymeacoffee.com/buttons/v2/default-red.png"
          alt="Buy Me A Coffee"
          width="217px"
          height="60px"
        />
      </a>
    </Box>
  );
};

const Contact = () => {
  return (
    <Button
      sx={{ height: 60, width: 217 }}
      variant="contained"
      color="primary"
      href="mailto:bahalbach@gmail.com"
    >
      Contact Me
    </Button>
  );
};

export default PF2App;
