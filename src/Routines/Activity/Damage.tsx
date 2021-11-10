import React from "react";

import { useAppDispatch, useAppSelector } from "../../App/hooks";
import { LevelList } from "./LevelList";
import {
  damageRemoved,
  damageUpdated,
  selectdamageById,
} from "../RoutineSlice/routineSlice";
import {
  damageConditionOptions,
  damageTrendOptions,
  damageTypeOptions,
  diceSizeOptions,
  dieTrendOptions,
  makeOptions,
  materialOptions,
  multiplierOptions,
} from "../../Model/options";
import { DamageTrend, damageTrends, whenConditions } from "../../Model/types";
import { RootState } from "../../App/store";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputLabel,
  Select,
  Switch,
  Tooltip,
} from "@mui/material";
import Divider from "@mui/material/Divider";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box } from "@mui/system";
import { StayPrimaryLandscape } from "@mui/icons-material";
import { TooltipSelect } from "../../TooltipSelect";

// const useStyles = makeStyles({
//   transition: theme.transitions.create(["background", "background-color"], {
//     duration: theme.transitions.duration.complex,
//   }),
//   "&:hover": {
//     backgroundColor: "#BBB",
//   },
// });
export const Damage = ({ parentId, id }: { parentId: number; id: number }) => {
  const {
    damageCondition,
    damageType,
    material,
    persistent,
    multiplier,
    damageWhen,

    dieTrend,
    dieAdjustments,
    diceSize,
    fatal,
    fatalDie,
    damageTrend,
    damageAdjustments,
  } = useAppSelector((state: RootState) => selectdamageById(state, id)!);
  const dispatch = useAppDispatch();

  const dieLevelList = LevelList(
    "dieAdjustments",
    dispatch,
    damageUpdated,
    id,
    dieAdjustments
  );

  const damageLevelList = LevelList(
    "damageAdjustments",
    dispatch,
    damageUpdated,
    id,
    damageAdjustments
  );

  const damageTrendList = damageTrend.map((dt, index) => {
    return (
      <Grid item key={index}>
        <TooltipSelect
          title="Adds bonus damage that applies the appropriate amount of damage at appropriate levels. For 'Weapon' and 'Precise Strike' the bonus is the number of dice."
          label="Damage Trend"
          value={dt}
          onChange={(e) => {
            let newdt = damageTrend.slice();
            if (e.target.value === damageTrends.NONE) {
              newdt.splice(index, 1);
            } else {
              newdt[index] = e.target.value as DamageTrend;
            }
            dispatch(
              damageUpdated({
                id,
                changes: { damageTrend: newdt },
              })
            );
          }}
        >
          {damageTrendOptions}
        </TooltipSelect>
      </Grid>
    );
  });

  return (
    <Box
      sx={{
        mt: 3,
        mb: 6,
        "&:hover": { bgcolor: "rgb(50,50,50,.2)" },
      }}
    >
      <Divider textAlign="left" sx={{ mt: 1, mb: 1 }}></Divider>
      <Grid container spacing={{ xs: 1, sm: 2 }} sx={{ my: 0 }}>
        <Grid item xs="auto">
          <IconButton
            color="primary"
            size="small"
            onClick={(e) => {
              dispatch(damageRemoved({ id, parentId }));
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Grid>

        <Grid item xs="auto">
          <TooltipSelect
            title="When this damage instance applies. For example: for extra damage on a critical hit, like with deadly or fatal weapons, use 'On Crit'. Don't forget to change when using a save instead of an attack."
            value={damageCondition}
            label="Condition"
            onChange={(e) =>
              dispatch(
                damageUpdated({
                  id,
                  changes: { damageCondition: e.target.value },
                })
              )
            }
          >
            {damageConditionOptions}
          </TooltipSelect>
        </Grid>
        {/* </Grid>
      <Grid container spacing={{ xs: 1, sm: 2 }}> */}
        <Grid item>
          <TooltipSelect
            title="How much the damage is multiplied by. For example: if you want to average the damage of two different attacks, add both and set the multiplier to .5"
            value={multiplier}
            label="Multiplier"
            onChange={(e) =>
              dispatch(
                damageUpdated({
                  id,
                  changes: { multiplier: Number(e.target.value) },
                })
              )
            }
          >
            {multiplierOptions}
          </TooltipSelect>
        </Grid>
        <Grid item>
          <FormControl size="small">
            <InputLabel id="damage-type-input">Type</InputLabel>
            <Select
              labelId="damage-type-input"
              id="damage-type"
              value={damageType}
              label="Type"
              onChange={(e) =>
                dispatch(
                  damageUpdated({
                    id,
                    changes: { damageType: e.target.value },
                  })
                )
              }
            >
              {damageTypeOptions}
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl size="small">
            <InputLabel id="damage-material-input">Material</InputLabel>
            <Select
              labelId="damage-material-input"
              id="damage-material"
              value={material}
              label="Material"
              onChange={(e) =>
                dispatch(
                  damageUpdated({
                    id,
                    changes: { material: e.target.value },
                  })
                )
              }
            >
              {materialOptions}
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <Tooltip title="If this damage is persistent. Persistent damage is multiplied by the 'Persistent Damage Multiplier' above the By Level graph.">
            <FormControlLabel
              control={
                <Checkbox
                  checked={persistent}
                  onChange={(e) =>
                    dispatch(
                      damageUpdated({
                        id,
                        changes: { persistent: e.target.checked },
                      })
                    )
                  }
                />
              }
              label="Persistent"
            />
          </Tooltip>
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
                  damageUpdated({
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
      <Divider textAlign="left" sx={{ mt: 1, mb: 1 }}>
        Dice
      </Divider>
      <Grid container spacing={{ xs: 1, sm: 2 }}>
        <Grid item>
          <TooltipSelect
            title="When dice are added to the damage. At each level in (), 1 die of the selected size is added to the damage"
            value={dieTrend}
            label="Damage Dice"
            onChange={(e) =>
              dispatch(
                damageUpdated({
                  id,
                  changes: { dieTrend: e.target.value },
                })
              )
            }
          >
            {dieTrendOptions}
          </TooltipSelect>
        </Grid>
        {dieLevelList}
        <Grid item>
          <FormControl size="small">
            <InputLabel id="dice-size-input">Die Size</InputLabel>
            <Select
              labelId="dice-size-input"
              id="dice-size"
              value={diceSize}
              label="Die Size"
              onChange={(e) =>
                dispatch(
                  damageUpdated({
                    id,
                    changes: { diceSize: e.target.value },
                  })
                )
              }
            >
              {diceSizeOptions}
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <Tooltip title="For Fatal. If this damage uses a different die size on a crit. For Fatal you still need to add another die with the 'On Crit' Condition.">
            <FormControlLabel
              control={
                <Switch
                  checked={fatal}
                  onChange={(e) =>
                    dispatch(
                      damageUpdated({
                        id,
                        changes: { fatal: e.target.checked },
                      })
                    )
                  }
                />
              }
              label="On Crit Die"
            />
          </Tooltip>
        </Grid>
        {fatal ? (
          <Grid item>
            <FormControl size="small">
              <InputLabel id="fatal-size-input">Die Size</InputLabel>
              <Select
                labelId="fatal-size-input"
                id="fatal-size"
                value={fatalDie}
                label="Die Size"
                onChange={(e) =>
                  dispatch(
                    damageUpdated({
                      id,
                      changes: { fatalDie: e.target.value },
                    })
                  )
                }
              >
                {diceSizeOptions}
              </Select>
            </FormControl>
          </Grid>
        ) : (
          ""
        )}
      </Grid>
      <Divider textAlign="left" sx={{ mt: 1, mb: 1 }}>
        Static Damage
      </Divider>
      <Grid container spacing={{ xs: 1, sm: 2 }}>
        {damageTrendList}
        <Grid item>
          <Tooltip title="Adds bonus damage that applies the appropriate amount of damage at appropriate levels. For 'Weapon' and 'Precise Strike' the bonus is the number of dice.">
            <Button
              onClick={() => {
                let newdt = damageTrend.slice();
                newdt.push(damageTrends.NONE);
                dispatch(
                  damageUpdated({
                    id,
                    changes: {
                      damageTrend: newdt,
                    },
                  })
                );
              }}
            >
              Add damage scaling
            </Button>
          </Tooltip>
        </Grid>
        {damageLevelList}
      </Grid>
      <Divider textAlign="left" sx={{ mt: 1, mb: 1 }}></Divider>
    </Box>
  );
};
