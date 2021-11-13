import React, { useState } from "react";
// import { graphTypeOptions, levelOptions } from "../Model/options";
import { graphTypes } from "../Model/types";
import { ByLevelInput } from "./ByLevelInput";

import {
  Collapse,
  FormControlLabel,
  Grid,
  Paper,
  Select,
  Switch,
  Typography,
  useMediaQuery,
} from "@mui/material";

import useGenerateGraphs from "./useGenerateGraphs";
import { makeOptions } from "../Model/options";
import { Box } from "@mui/system";
import { SingleLevelInput } from "./SingleLevelInput";
import { JointInput } from "./JointInput";
import { Upload } from "../Sharing/Upload";

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

  return (
    <React.Fragment>
      <Paper sx={{ p: 1, my: 2 }}>
        <Grid container>
          <Grid item xs>
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
          <Grid item>
            <Upload byLevel={true} />
          </Grid>
        </Grid>
        <Collapse in={showByLevel}>
          <ByLevelInput />
          <JointInput />
          <Box>{byLevelDamageChart}</Box>
        </Collapse>
      </Paper>

      <Paper sx={{ p: 1, my: 2 }}>
        <Grid container>
          <Grid item xs>
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
          <Grid item>
            <Upload byLevel={false} />
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

          <Box>{damageChart}</Box>
        </Collapse>
      </Paper>
      {/* <div className="box">
        {"Graph Type: "}
        <select
          value={graphType}
          onChange={(e) => setGraphType(e.target.value)}
        >
          {graphTypeOptions}
        </select>
        (
        <select
          value={displayLevel}
          onChange={(e) => setDisplayLevel(parseInt(e.target.value))}
        >
          {levelOptions}
        </select>
        ){" Show persistent damage: "}
        <input
          type="checkbox"
          checked={addPersistent}
          onChange={(e) => setAddPersistent(e.target.checked)}
        />
        {/* , persistent damage multiplier:
      <input
        type="number"
        value={perMulti ? perMulti : 0}
        onChange={(e) => setPerMulti(e.target.valueAsNumber)}
      /> */}
      {/* <div>
          Expected Damage:
          {expectedDamages}
        </div>
        {damageChart}
        {byLevelDamageChart}
        {!addPersistent ? (
          ""
        ) : (
          <div>
            <div>
              Expected Persistent Damage:
              {expectedPersistentDamages}
            </div>
            {persistentDamageChart}
            {byLevelPerDamageChart}
          </div>
        )}
      </div> */}
    </React.Fragment>
  );
};

export default Display;
