import React, { useEffect, useState } from "react";
import { TextField, IconButton, Tooltip } from "@mui/material";
import Grid from "@mui/material/Grid2";
import AddIcon from "@mui/icons-material/Add";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";

import { Dispatch } from "redux";
import { levelOptions } from "../../Model/options";
import { Adjustment } from "../RoutineSlice/RoutineTypes";
import { TooltipSelect } from "../../TooltipSelect";

type Adjustments = {
  [level: number]: number;
};
type Entry = [number, string];

export const generateEntries = (adjustments: Adjustments) => {
  let currentValue = 0;
  const entries: Entry[] = [];
  for (let level = 1; level <= 20; level++) {
    if (currentValue !== adjustments[level]) {
      entries.push([level, (adjustments[level] - currentValue).toString()]);
      currentValue = adjustments[level];
    }
  }
  return entries;
};

const generateAdjustments = (entries: Entry[]) => {
  const adjustments: Adjustments = {};
  let currentValue = 0;
  let total = 0;
  let currentIndex = 0;
  // console.log(entries);
  for (let level = 1; level <= 20; level++) {
    if (entries[currentIndex] && entries[currentIndex][0] === level) {
      // console.log("here");
      currentValue = parseInt(entries[currentIndex][1]);
      if (!currentValue) currentValue = 0;
      currentIndex++;
      total += currentValue;
    }
    adjustments[level] = total;
  }
  return adjustments;
};

export const adjustmentsFromLevelChange = (
  entries: Entry[],
  index: number,
  newLevel: number
) => {
  entries[index] = [newLevel, entries[index][1]];
  entries.sort((a, b) => a[0] - b[0]);
  return generateAdjustments(entries);
};

export const adjustmentsFromValueChange = (
  entries: Entry[],
  index: number,
  newValue: string
) => {
  entries[index] = [entries[index][0], newValue];
  return generateAdjustments(entries);
};

export const adjustmentsFromNewEntry = (entries: Entry[]) => {
  let lastValue: Entry =
    entries.length > 0 ? entries[entries.length - 1] : [0, "0"];
  entries.push([lastValue[0] + 1, (0).toString()]);
  return generateAdjustments(entries);
};

export const LevelList = (
  name: string,
  dispatch: Dispatch<any>,
  action: ActionCreatorWithPayload<any, string>,
  id: number,
  adjustments: Adjustment
) => {
  const baseEntries = generateEntries(adjustments);
  let [entries, setEntries] = useState(baseEntries);
  let be = JSON.stringify(baseEntries);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setEntries(baseEntries), [be]);
  let levelList = [];

  for (let i = 0; i < entries.length; i++) {
    levelList.push(
      <Grid key={i}>
        <TooltipSelect
          title="The level where this bonus is added, all later levels will have this bonus added. Please only add 1 bonus per level. Bonuses of 0 are removed."
          label="Level"
          value={entries[i][0]}
          onChange={(e) =>
            dispatch(
              action({
                id,
                changes: {
                  [name]: adjustmentsFromLevelChange(
                    entries,
                    i,
                    Number(e.target.value)
                  ),
                },
              })
            )
          }
        >
          {levelOptions}
        </TooltipSelect>

        <TextField
          size="small"
          label="Bonus"
          sx={{ width: "9ch" }}
          value={entries[i][1]}
          onChange={(e) => {
            let newEntries = entries.slice();
            newEntries[i] = [newEntries[i][0], e.target.value];
            setEntries(newEntries);
            e.target.focus();
          }}
          onBlur={() => {
            let newEntries = entries.slice();
            for (let ni = 0; ni < entries.length; ni++) {
              newEntries[ni] = [
                newEntries[ni][0],
                parseInt(newEntries[ni][1]).toString(),
              ];
            }
            setEntries(newEntries);
            dispatch(
              action({
                id,
                changes: {
                  [name]: generateAdjustments(entries),
                },
              })
            );
          }}
          slotProps={{
            htmlInput: {
              step: 1,
              min: -100,
              max: 100,
              type: "number",
            },
          }}
        />
        {/* <input
          type="number"
          value={entries[i][1]}
          onChange={(e) => {
            let newEntries = entries.slice();
            newEntries[i][1] = e.target.value;
            setEntries(newEntries);
            e.target.focus();
          }}
          onBlur={(e) =>
            dispatch(
              action({
                id,
                changes: {
                  [name]: generateAdjustments(entries),
                },
              })
            )
          }
        /> */}
      </Grid>
    );
  }
  levelList.push(
    <Grid key="addButton">
      <Tooltip title="Add a bonus at a specified level.">
        <IconButton
          color="primary"
          aria-label="Add button"
          onClick={() =>
            dispatch(
              action({
                id,
                changes: {
                  [name]: adjustmentsFromNewEntry(entries),
                },
              })
            )
          }
        >
          <AddIcon />
        </IconButton>
      </Tooltip>
    </Grid>
  );
  return levelList;
};
