import React, { useState, useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../App/hooks";

import {
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  Select,
  Slider,
  TextField,
  Typography,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import { Box } from "@mui/system";

import {
  conditionOptions,
  effectTypeOptions,
  makeOptions,
} from "../../Model/options";
import { RootState } from "../../App/store";
import {
  effectRemoved,
  effectUpdated,
  selecteffectById,
} from "../RoutineSlice/routineSlice";
import { effectValueTypes, whenConditions } from "../../Model/types";

export const Effect = ({ parentId, id }: { parentId: number; id: number }) => {
  const {
    effectCondition,
    effectType,
    effectValue,
    startLevel,
    endLevel,
    damageWhen,
  } = useAppSelector((state: RootState) => selecteffectById(state, id)!);
  const dispatch = useAppDispatch();
  let [value, setValue] = useState(effectValue ? effectValue.toString() : "0");
  let [validLevels, setValidLevels] = useState([startLevel, endLevel]);
  useEffect(
    () => setValidLevels([startLevel, endLevel]),
    [startLevel, endLevel]
  );

  return (
    <Box sx={{ mt: 3, mb: 6 }}>
      <Grid container spacing={{ xs: 1, sm: 2 }} sx={{ my: 0 }}>
        <Grid item xs="auto">
          <IconButton
            aria-label="delete"
            color="primary"
            onClick={(e) => {
              dispatch(effectRemoved({ id, parentId }));
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Grid>
        <Grid item>
          <FormControl size="small" fullWidth>
            <InputLabel id="effect-condition-input">Condition</InputLabel>
            <Select
              labelId="effect-condition-input"
              id="effect-condition"
              value={effectCondition}
              label="Condition"
              onChange={(e) =>
                dispatch(
                  effectUpdated({
                    id,
                    changes: { effectCondition: e.target.value },
                  })
                )
              }
            >
              {conditionOptions}
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl size="small" fullWidth>
            <InputLabel id="effect-type-input">Effect</InputLabel>
            <Select
              labelId="effect-type-input"
              id="effect-type"
              value={effectType}
              label="Effect"
              onChange={(e) =>
                dispatch(
                  effectUpdated({
                    id,
                    changes: { effectType: e.target.value },
                  })
                )
              }
            >
              {effectTypeOptions}
            </Select>
          </FormControl>
        </Grid>

        {
          // @ts-ignore
          Object.values(effectValueTypes).includes(effectType) ? (
            <Grid item>
              <TextField
                size="small"
                label="Value"
                sx={{ width: "7ch" }}
                value={value}
                onChange={(e) => {
                  setValue(e.target.value);
                  e.target.focus();
                }}
                onBlur={() => {
                  let newVal = parseInt(value);
                  setValue(newVal.toString());
                  dispatch(
                    effectUpdated({
                      id,
                      changes: {
                        effectValue: newVal,
                      },
                    })
                  );
                }}
              />
            </Grid>
          ) : (
            ""
          )
        }

        <Grid item sx={{ px: 2 }}>
          <Typography align="center">
            Valid Levels: {startLevel} to {endLevel}
          </Typography>
          <Slider
            size="small"
            getAriaLabel={() => "Valid levels"}
            value={validLevels}
            min={1}
            max={20}
            marks
            // @ts-ignore
            onChange={(e, nv: number[]) => setValidLevels(nv)}
            onBlur={() =>
              dispatch(
                effectUpdated({
                  id,
                  changes: {
                    startLevel: validLevels[0],
                    endLevel: validLevels[1],
                  },
                })
              )
            }
            valueLabelDisplay="auto"
            getAriaValueText={(v) => `${v}`}
          />
        </Grid>
        <Grid item>
          <FormControl size="small">
            <InputLabel id="damage-when-input">When Target</InputLabel>
            <Select
              labelId="damage-when-input"
              id="damage-when"
              multiple
              value={damageWhen}
              label="When Target"
              renderValue={(selected) => selected.join(" or ")}
              onChange={(e) =>
                dispatch(
                  effectUpdated({
                    id,
                    changes: { damageWhen: e.target.value },
                  })
                )
              }
            >
              {makeOptions(whenConditions)}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
};
