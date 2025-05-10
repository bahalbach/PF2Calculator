import React, { useEffect } from "react";

import ReactGA from "react-ga4";

import Display from "../Display/Display";
import SelectedRoutine from "../Routines/SelectedRoutine";
import Routines from "../Routines/Routines";
import Export from "../Sharing/Export";

import "./PF2App.css";
import {
  selectCurrentTab,
  selectAllTabs,
  setCurrentTab,
  tabCreated,
} from "../Display/tabSlice";
import {
  selectSelectedRoutine,
  selectSelectedActivityPath,
  selectCreateNewActivity,
} from "../Routines/RoutineSlice/routineSlice";
import { Container, Box, Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import useMediaQuery from "@mui/material/useMediaQuery";
// import Header from "./Header";
import { ActivityPath } from "../Routines/Activity/ActivityPath";
import NewActivity from "../Routines/NewActivity/NewActivity";
import { useAppDispatch, useAppSelector } from "../App/hooks";

// Initialize google analytics
ReactGA.initialize("G-JR2YK097BG");

function TabSection() {
  const dispatch = useAppDispatch();
  const tabs = useAppSelector(selectAllTabs);
  const currentTab = useAppSelector(selectCurrentTab);

  const addTab = () => {
    dispatch(
      tabCreated({
        name: "New Tab",
        routineIds: [],
      })
    );
  };

  return (
    <Box
      sx={{
        borderBottom: 1,
        borderColor: "white",
        backgroundColor: "white",
      }}
    >
      <Tabs value={currentTab} variant="scrollable" scrollButtons="auto">
        {tabs.map((tab) => (
          <Tab
            key={tab.id}
            label={tab.name}
            value={tab.id}
            onClick={() => dispatch(setCurrentTab(tab.id))}
          />
        ))}
        <Tab label="+" value={"add tab"} onClick={addTab} />
      </Tabs>
    </Box>
  );
}

function PF2App() {
  const isBigEnough = useMediaQuery((theme: any) => {
    return theme.breakpoints.up("md");
  });

  ReactGA.send("pageview");

  return (
    <React.Fragment>
      {/* <Header /> */}
      <Container maxWidth="xl">
        <TabSection />
        {isBigEnough ? (
          <Grid
            container
            columnSpacing={{ xs: 2, md: 2, lg: 3, xl: 4 }}
            sx={{ height: "100vh" }}
          >
            <Grid
              id="container"
              sx={{ height: "100%", overflow: "auto" }}
              size={{
                xs: 12,
                md: 6,
              }}
            >
              <Controls />
            </Grid>
            <Grid
              sx={{ mt: 0, height: 1, overflow: "hidden auto" }}
              size={{
                xs: 12,
                md: 6,
              }}
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
        <Grid>
          <Donate />
        </Grid>
        <Grid>
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
