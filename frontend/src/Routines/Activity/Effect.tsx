import React, { useState, useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../App/hooks";

import {
  Collapse,
  FormControl,
  IconButton,
  InputLabel,
  ListItemButton,
  Select,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

import DeleteIcon from "@mui/icons-material/Delete";
import { Box } from "@mui/material";

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
import { TooltipSelect } from "../../TooltipSelect";

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
  // @ts-ignore
  const showValue = Object.values(effectValueTypes).includes(effectType);
  let [validLevels, setValidLevels] = useState([startLevel, endLevel]);
  useEffect(
    () => setValidLevels([startLevel, endLevel]),
    [startLevel, endLevel]
  );
  const [showContent, setShowContent] = useState(false);

  return (
    <React.Fragment>
      <Grid container columnSpacing={{ xs: 2 }} alignItems="center">
        <Grid size="auto">
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
        <Grid sx={{ ml: -2 }} size="auto">
          <ListItemButton onClick={() => setShowContent(!showContent)}>
            <Typography variant="h6">Effect</Typography>
          </ListItemButton>
        </Grid>
        <Grid>
          <Typography>
            {effectCondition} {": "}
            {effectType} {showValue ? effectValue : ""}
          </Typography>
        </Grid>
      </Grid>
      <Collapse in={showContent}>
        <Box
          sx={{
            p: 1,
            mb: 1,
            "&:hover": { bgcolor: "rgb(50,50,50,.05)" },
          }}
        >
          <Grid container spacing={{ xs: 1, sm: 2 }} sx={{ mb: 1 }}>
            <Grid size="grow">
              <TooltipSelect
                fullWidth={true}
                title="When this effect applies, depending on the result of this activities roll. For example the spell 'fear' should have 'On Success' 'Frightened' '1', 'On Failure' 'Frightened' '2' etc."
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
              </TooltipSelect>
            </Grid>
            <Grid size="grow">
              <FormControl size="small" fullWidth>
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
          <Grid container spacing={{ xs: 1, sm: 2 }}>
            <Grid>
              <TooltipSelect
                title="The effect that is applied to the target when 'Condition' is met."
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
              </TooltipSelect>
            </Grid>

            {showValue ? (
              <Grid>
                <TextField
                  size="small"
                  label="Value"
                  sx={{ width: "9ch" }}
                  value={value}
                  onChange={(e) => {
                    setValue(e.target.value);
                    e.target.focus();
                  }}
                  onBlur={() => {
                    let newVal = parseInt(value);
                    if (Number.isNaN(newVal)) newVal = 0;
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
                  slotProps={{
                    htmlInput: {
                      step: 1,
                      min: 0,
                      max: 10,
                      type: "number",
                    },
                  }}
                />
              </Grid>
            ) : (
              ""
            )}

            <Grid sx={{ px: 2 }}>
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
          </Grid>
        </Box>
      </Collapse>
    </React.Fragment>
  );
};
