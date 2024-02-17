import React, { useState } from "react";

import { useAppDispatch, useAppSelector } from "../App/hooks";
import { selecttargetById, targetUpdated } from "./targetSlice";
// import { damageTypes } from "../Model/types";
// import {
//   selectweaknessById,
//   Weakness,
//   weaknessCreated,
//   weaknessRemoved,
//   weaknessUpdated,
// } from "./weaknessSlice";
// import { EntityId } from "@reduxjs/toolkit";
import { RootState } from "../App/store";
import { Grid, TextField, FormControlLabel, Switch } from "@mui/material";

const JointInput = () => {
  const id = 0;
  const {
    persistentMultiplier,
    flatfooted,
    percentSelectedRoutine,
    // weaknesses,
  } = useAppSelector((state: RootState) => selecttargetById(state, id)!);
  const [perMul, setPerMul] = useState(persistentMultiplier.toString());
  const dispatch = useAppDispatch();

  return (
    <Grid container spacing={{ xs: 1, sm: 2 }}>
      <Grid item xs={6} sm={3} md={6} lg={3}>
        <FormControlLabel
          control={
            <Switch
              checked={flatfooted}
              onChange={(e) =>
                dispatch(
                  targetUpdated({
                    id,
                    changes: { flatfooted: e.target.checked },
                  })
                )
              }
            />
          }
          label="Flatfooted"
        />
      </Grid>

      <Grid item xs={6} sm={3} md={6} lg={3}>
        <TextField
          fullWidth
          label="Persistent Damage Multiplier"
          value={perMul}
          onChange={(e) => {
            setPerMul(e.target.value);
            e.target.focus();
          }}
          onBlur={() => {
            let newVal = parseFloat(perMul);
            if (Number.isNaN(newVal)) newVal = 0;
            setPerMul(newVal.toString());
            dispatch(
              targetUpdated({
                id,
                changes: {
                  persistentMultiplier: newVal,
                },
              })
            );
          }}
          inputProps={{
            step: 0.1,
            min: 0,
            max: 10,
            type: "number",
          }}
        />
      </Grid>

      <Grid item xs={12} sm={6} md={12} lg={6}>
        <FormControlLabel
          control={
            <Switch
              checked={percentSelectedRoutine}
              onChange={(e) =>
                dispatch(
                  targetUpdated({
                    id,
                    changes: { percentSelectedRoutine: e.target.checked },
                  })
                )
              }
            />
          }
          label="% of Selected Routine"
        />
      </Grid>
    </Grid>
  );
};

export { JointInput };
