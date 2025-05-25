import React, { useState } from "react";
// import { graphTypeOptions, levelOptions } from "../Model/options";
import { graphTypes } from "../Model/types";
import { ByLevelInput } from "./ByLevelInput";

import {
  Collapse,
  FormControlLabel,
  Paper,
  Select,
  Switch,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Grid from "@mui/material/Grid";

import { useGenerateGraphs } from "./useGenerateGraphs";
import { makeOptions } from "../Model/options";
import { Box } from "@mui/material";
import { SingleLevelInput } from "./SingleLevelInput";
import { JointInput } from "./JointInput";
import { ShareExport } from "../Sharing/Upload";

const Display = () => {
  // evaluates routines and displays appropriate graphs
  const [showByLevel, setShowByLevel] = useState<boolean>(true);
  const [showSingleLevel, setShowSingleLevel] = useState<boolean>(false);
  // const [addPersistent, setAddPersistent] = useState(false);
  const [graphType, setGraphType] = useState<string>(graphTypes.DISTRIBUTION);
  // const [displayLevel, setDisplayLevel] = useState(1);
  const {
    expectedDamages,
    // expectedPersistentDamages,
    damageChart,
    // persistentDamageChart,
    byLevelDamageChart,
    // byLevelPerDamageChart,
  } = useGenerateGraphs(graphType);
  // const [perMulti, setPerMulti] = useState(2);
  const isBigEnough = useMediaQuery((theme: any) => {
    return theme.breakpoints.up("sm");
  });

  let height = 500 + expectedDamages.length * 19;
  let singleLevelHeight = height;
  if (graphType === graphTypes.DISTRIBUTION) {
    singleLevelHeight += expectedDamages.length * 19;
  }

  return (
    <React.Fragment>
      <Paper sx={{ p: 1, my: 2 }}>
        <Grid container>
          <Grid size="grow">
            <FormControlLabel
              control={
                <Switch
                  checked={showByLevel}
                  onChange={() => setShowByLevel(!showByLevel)}
                />
              }
              label={isBigEnough ? "Display By Level Graph" : "By Level Graph"}
              // sx={{ background: "lightgrey", width: 1 }}
            />
          </Grid>
          <Grid>
            <ShareExport byLevel={true} />
          </Grid>
        </Grid>
        <Collapse in={showByLevel}>
          <ByLevelInput />
          <JointInput />
          <Box sx={{ height }}>{byLevelDamageChart}</Box>
        </Collapse>
      </Paper>
      <Paper sx={{ p: 1, my: 2 }}>
        <Grid container>
          <Grid size="grow">
            <FormControlLabel
              control={
                <Switch
                  checked={showSingleLevel}
                  onChange={() => setShowSingleLevel(!showSingleLevel)}
                />
              }
              label={
                isBigEnough
                  ? "Display Single Level Graph"
                  : "Single Level Graph"
              }
            />
          </Grid>
          <Grid>
            <ShareExport byLevel={false} />
          </Grid>
        </Grid>
        <Collapse in={showSingleLevel}>
          <SingleLevelInput />
          {/* <JointInput /> */}
          <Typography>Expected damage: </Typography>
          {expectedDamages}
          <Select
            value={graphType}
            onChange={(e) => setGraphType(e.target.value)}
          >
            {makeOptions(graphTypes)}
          </Select>

          <Box sx={{ height: singleLevelHeight }}>{damageChart}</Box>
        </Collapse>
      </Paper>
    </React.Fragment>
  );
};

export default Display;
