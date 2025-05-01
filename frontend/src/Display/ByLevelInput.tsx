import React, { useState } from "react";

import { useAppDispatch, useAppSelector } from "../App/hooks";
import { selecttargetById, targetUpdated } from "./targetSlice";
import { RootState } from "../App/store";
import { ACOptions, makeOptions, SaveOptions } from "../Model/options";
import {
  FormControl,
  InputLabel,
  Select,
  TextField,
  Slider,
  Typography,
  Box,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { HPTrends } from "../Model/types";

function ByLevelInput() {
  const id = 0;
  const {
    name,
    levelDiff,
    ACTrend,
    FortTrend,
    RefTrend,
    WillTrend,
    PerTrend,
    HPTrend,
    percentHP,
  } = useAppSelector((state: RootState) => selecttargetById(state, id)!);

  const [tempName, setTempName] = useState(name);
  const dispatch = useAppDispatch();

  return (
    <Grid container spacing={{ xs: 1, sm: 2 }} sx={{ my: 0, py: 1 }}>
      <Grid
        size={{
          xs: 12,
          sm: 6,
          md: 12,
          lg: 6
        }}>
        <TextField
          fullWidth
          label="Graph Name"
          placeholder="Enter the name that will display on the graph"
          value={tempName}
          onChange={(e) => {
            setTempName(e.target.value);
          }}
          onBlur={() =>
            dispatch(targetUpdated({ id, changes: { name: tempName } }))
          }
        />
      </Grid>
      <Grid
        size={{
          xs: 6,
          sm: 3,
          md: 6,
          lg: 3
        }}>
        <Typography>Level Diff: {levelDiff}</Typography>
        <Slider
          value={levelDiff}
          step={1}
          min={-5}
          max={5}
          marks
          onChange={(e, nv) => {
            dispatch(
              targetUpdated({
                id,
                changes: {
                  levelDiff: nv,
                },
              })
            );
          }}
        />
      </Grid>
      <Grid
        size={{
          xs: 6,
          sm: 3,
          md: 6,
          lg: 3
        }}>
        <FormControl fullWidth>
          <InputLabel id="AC-input">AC</InputLabel>
          <Select
            labelId="AC-input"
            id="AC"
            value={ACTrend}
            label="AC"
            onChange={(e) =>
              dispatch(
                targetUpdated({ id, changes: { ACTrend: e.target.value } })
              )
            }
          >
            {ACOptions}
          </Select>
        </FormControl>
      </Grid>
      <Grid
        size={{
          xs: 3,
          sm: 3,
          md: 3,
          lg: 3
        }}>
        <FormControl fullWidth>
          <InputLabel id="Fort-input">Fort</InputLabel>
          <Select
            labelId="Fort-input"
            id="Fort"
            value={FortTrend}
            label="Fort"
            onChange={(e) =>
              dispatch(
                targetUpdated({ id, changes: { FortTrend: e.target.value } })
              )
            }
          >
            {SaveOptions}
          </Select>
        </FormControl>
      </Grid>
      <Grid
        size={{
          xs: 3,
          sm: 3,
          md: 3,
          lg: 3
        }}>
        <FormControl fullWidth>
          <InputLabel id="Ref-input">Reflex</InputLabel>
          <Select
            labelId="Ref-input"
            id="Ref"
            value={RefTrend}
            label="Reflex"
            onChange={(e) =>
              dispatch(
                targetUpdated({ id, changes: { RefTrend: e.target.value } })
              )
            }
          >
            {SaveOptions}
          </Select>
        </FormControl>
      </Grid>
      <Grid
        size={{
          xs: 3,
          sm: 3,
          md: 3,
          lg: 3
        }}>
        <FormControl fullWidth>
          <InputLabel id="Will-input">Will</InputLabel>
          <Select
            labelId="Will-input"
            id="Will"
            value={WillTrend}
            label="Will"
            onChange={(e) =>
              dispatch(
                targetUpdated({ id, changes: { WillTrend: e.target.value } })
              )
            }
          >
            {SaveOptions}
          </Select>
        </FormControl>
      </Grid>
      <Grid
        size={{
          xs: 3,
          sm: 3,
          md: 3,
          lg: 3
        }}>
        <FormControl fullWidth>
          <InputLabel id="Per-input">Perception</InputLabel>
          <Select
            labelId="Per-input"
            id="Per"
            value={PerTrend}
            label="Perception"
            onChange={(e) =>
              dispatch(
                targetUpdated({ id, changes: { PerTrend: e.target.value } })
              )
            }
          >
            {SaveOptions}
          </Select>
        </FormControl>
      </Grid>
      <Grid size={6}>
        <FormControl fullWidth>
          <InputLabel id="HP-input">Hit Points</InputLabel>
          <Select
            labelId="HP-input"
            id="HP"
            value={HPTrend}
            label="Hit Points"
            onChange={(e) =>
              dispatch(
                targetUpdated({ id, changes: { HPTrend: e.target.value } })
              )
            }
          >
            {makeOptions(HPTrends)}
          </Select>
        </FormControl>
      </Grid>
      <Grid container justifyContent="center" size={6}>
        <Typography id="percent-HP">Remaining HP: {percentHP}%</Typography>

        <Box sx={{ px: 2, width: 1 }}>
          <Slider
            aria-labelledby="percent-HP"
            valueLabelDisplay="auto"
            value={percentHP}
            min={0}
            max={100}
            step={1}
            onChange={(_, nv) => {
              let newPercentHP = Number(nv);
              dispatch(
                targetUpdated({
                  id,
                  changes: {
                    percentHP: newPercentHP,
                  },
                })
              );
            }}
          />
        </Box>
      </Grid>
    </Grid>
  );
}

export { ByLevelInput };
