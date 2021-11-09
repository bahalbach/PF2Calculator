import React from "react";

import ReactGA from "react-ga4";
import { Adsense } from "@ctrl/react-adsense";

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
import { Container, Grid, Box } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
// import Header from "./Header";
import { ActivityPath } from "../Routines/Activity/ActivityPath";
import NewActivity from "../Routines/NewActivity/NewActivity";
import { useAppSelector } from "./hooks";

// Initialize google analytics
ReactGA.initialize("G-JR2YK097BG");

function PF2App() {
  const selectedRoutine = useAppSelector(selectSelectedRoutine);
  const selectedActivityPath = useAppSelector(selectSelectedActivityPath);
  const createNewActivity = useAppSelector(selectCreateNewActivity);

  const isBigEnough = useMediaQuery((theme: any) => {
    console.log(`Theme is ${theme}`);
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
            sx={{ height: "100vh" }} // "calc(100vh - 40px)"
          >
            <Grid
              id="container"
              item
              xs={12}
              md={6}
              sx={{ height: "100%", overflow: "auto" }}
            >
              <Box sx={{}}>
                {/* <TargetInput id={0} /> */}
                <Adsense client="ca-pub-8032326260699508" slot="3994991926" />
                <Routines />
                {selectedRoutine !== undefined ? (
                  <SelectedRoutine routineId={selectedRoutine} />
                ) : (
                  ""
                )}
                {selectedActivityPath !== undefined ? (
                  <ActivityPath id={selectedActivityPath} />
                ) : createNewActivity ? (
                  <NewActivity />
                ) : (
                  ""
                )}
                <Export />
                <Adsense client="ca-pub-8032326260699508" slot="3994991926" />
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              sx={{ mt: 0, height: 1, overflow: "hidden auto" }}
            >
              {/* <Box sx={{ height: 1 }}> */}
              <Display />
              {/* </Box> */}
            </Grid>
          </Grid>
        ) : (
          <React.Fragment>
            {/* <TargetInput id={0} /> */}
            <Adsense client="ca-pub-8032326260699508" slot="3994991926" />
            <Display />
            <Routines />
            {selectedRoutine !== undefined ? (
              <SelectedRoutine routineId={selectedRoutine} />
            ) : (
              ""
            )}
            {selectedActivityPath !== undefined ? (
              <ActivityPath id={selectedActivityPath} />
            ) : createNewActivity ? (
              <NewActivity />
            ) : (
              ""
            )}
            <Export />
            <Adsense client="ca-pub-8032326260699508" slot="3994991926" />
          </React.Fragment>
        )}
      </Container>
    </React.Fragment>
  );
}

export default PF2App;
