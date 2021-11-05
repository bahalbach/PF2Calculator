import React, { useEffect, useState } from "react";
import {
  FormControl,
  Select,
  InputLabel,
  TextField,
  Grid,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";

import { Dispatch } from "redux";
import { levelOptions } from "../Model/options";
import { Adjustment } from "./routineSlice";

type Adjustments = {
  [level: number]: number;
};
type Entry = [number, string];

export const generateEntries = (adjustments: Adjustments) => {
  let currentValue = 0;
  const entries: Entry[] = [];
  for (let level = 1; level <= 20; level++) {
    if (currentValue !== adjustments[level]) {
      currentValue = adjustments[level];
      entries.push([level, currentValue.toString()]);
    }
  }
  return entries;
};

const generateAdjustments = (entries: Entry[]) => {
  const adjustments: Adjustments = {};
  let currentValue = 0;
  let currentIndex = 0;
  // console.log(entries);
  for (let level = 1; level <= 20; level++) {
    if (entries[currentIndex] && entries[currentIndex][0] === level) {
      // console.log("here");
      currentValue = parseInt(entries[currentIndex][1]);
      if (!currentValue) currentValue = 0;
      currentIndex++;
    }
    adjustments[level] = currentValue;
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
  entries.push([lastValue[0] + 1, (parseInt(lastValue[1]) + 1).toString()]);
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
      <Grid item key={i}>
        <FormControl size="small">
          <InputLabel>Level</InputLabel>
          <Select
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
          </Select>
        </FormControl>
        <TextField
          size="small"
          label="Bonus"
          sx={{ width: "7ch" }}
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
                newEntries[i][0],
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
    <Grid item key="addButton">
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
    </Grid>
  );
  return levelList;
};
