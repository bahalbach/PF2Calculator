import React, { useState } from "react";

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
} from "../../Model/options";
import {
  DamageCond,
  DamageTrend,
  damageTrends,
  DamageType,
  DieTrend,
  whenConditions,
} from "../../Model/types";
import { RootState } from "../../App/store";
import {
  Button,
  Checkbox,
  Collapse,
  FormControl,
  FormControlLabel,
  IconButton,
  InputLabel,
  ListItemButton,
  Select,
  Slider,
  Switch,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box } from "@mui/material";
import { TooltipSelect } from "../../TooltipSelect";
import { Adjustment } from "../RoutineSlice/RoutineTypes";
import { damageTrendValues, dieTrendValues } from "../../Model/defaults";

// const useStyles = makeStyles({
//   transition: theme.transitions.create(["background", "background-color"], {
//     duration: theme.transitions.duration.complex,
//   }),
//   "&:hover": {
//     backgroundColor: "#BBB",
//   },
// });
export const Damage = ({ parentId, id }: { parentId: number; id: number }) => {
  const damage = useAppSelector((state: RootState) =>
    selectdamageById(state, id)
  );
  if (!damage) {
    return null;
  }
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
  } = damage;

  const [tempMultiplier, setTempMultiplier] = useState(multiplier.toString()); // Local state for TextField

  const dispatch = useAppDispatch();

  const [showContent, setShowContent] = useState(false);

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
      <Grid key={index}>
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
    <React.Fragment>
      <DamageDisplay
        damageInfo={{
          damageCondition,
          dieTrend,
          dieAdjustments,
          diceSize,
          fatal,
          fatalDie,
          damageTrend,
          damageAdjustments,
          persistent,
          damageType,
          multiplier,
        }}
        onClick={() => setShowContent(!showContent)}
        id={id}
        parentId={parentId}
      />
      <Collapse in={showContent}>
        <Box
          sx={{
            mt: 1,
            p: 1,
            mb: 1,
            "&:hover": { bgcolor: "rgb(50,50,50,.05)" },
          }}
        >
          {/* <Divider textAlign="left" sx={{ mt: 0, mb: 1 }}></Divider> */}
          <Grid container spacing={{ xs: 1, sm: 2 }} sx={{ mb: 1 }}>
            {/* <Grid item xs="auto">
              <Typography>Apply damage </Typography>
            </Grid> */}

            <Grid size="grow">
              <TooltipSelect
                fullWidth={true}
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
          <Grid container spacing={{ xs: 1, sm: 2 }}>
            <Grid>
              <Tooltip title="How much the damage is multiplied by. For example: if you want to average the damage of two different attacks, add both and set the multiplier to .5">
                <TextField
                  size="small"
                  label="Multiplier"
                  value={tempMultiplier}
                  onChange={(e) => {
                    setTempMultiplier(e.target.value);
                  }}
                  onBlur={() => {
                    let newVal = parseFloat(tempMultiplier);
                    if (Number.isNaN(newVal) || newVal < 0) newVal = 0;
                    setTempMultiplier(newVal.toString());
                    if (newVal !== multiplier) {
                      dispatch(
                        damageUpdated({
                          id,
                          changes: { multiplier: newVal },
                        })
                      );
                    }
                  }}
                  sx={{ width: "12ch" }}
                  slotProps={{
                    htmlInput: {
                      step: 0.1,
                      min: 0,
                      type: "number",
                    },
                  }}
                />
              </Tooltip>
            </Grid>
            <Grid>
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
            <Grid>
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
            <Grid>
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
          </Grid>
          <Divider textAlign="left" sx={{ mt: 1, mb: 1 }}>
            Dice
          </Divider>
          <Grid container spacing={{ xs: 1, sm: 2 }}>
            <Grid>
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
            <Grid>
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
                        changes: { diceSize: Number(e.target.value) },
                      })
                    )
                  }
                >
                  {diceSizeOptions}
                </Select>
              </FormControl>
            </Grid>
            <Grid>
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
              <Grid>
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
                          changes: { fatalDie: Number(e.target.value) },
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
            <Grid>
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
          {/* <Divider textAlign="left" sx={{ mt: 1, mb: 1 }}></Divider> */}
        </Box>
      </Collapse>
    </React.Fragment>
  );
};

interface PropsType {
  damageInfo: {
    damageCondition: DamageCond;
    dieTrend: DieTrend;
    dieAdjustments: Adjustment;
    diceSize: number;
    fatal: boolean;
    fatalDie: number;
    damageTrend: DamageTrend[];
    damageAdjustments: Adjustment;
    persistent: boolean;
    damageType: DamageType;
    multiplier: number;
  };
  onClick: any;
  id: number;
  parentId: number;
}
const DamageDisplay = ({
  damageInfo: {
    damageCondition,
    dieTrend,
    dieAdjustments,
    diceSize,
    fatal,
    fatalDie,
    damageTrend,
    damageAdjustments,
    persistent,
    damageType,
    multiplier,
  },
  onClick,
  id,
  parentId,
}: PropsType) => {
  const [level, setLevel] = useState(20);
  const dispatch = useAppDispatch();
  let diceNumber = dieTrendValues[dieTrend][level] + dieAdjustments[level];
  let staticDamage = damageAdjustments[level];
  for (let dt of damageTrend) {
    staticDamage += damageTrendValues[dt][level];
  }
  let averageDamage = staticDamage + ((diceSize + 1) / 2) * diceNumber;
  let fatalString =
    " (" + diceNumber.toString() + "d" + fatalDie.toString() + " on Crit)";

  let damageString =
    damageCondition +
    ": " +
    diceNumber.toString() +
    "d" +
    diceSize.toString() +
    (fatal ? fatalString : "") +
    (staticDamage ? " + " + staticDamage.toString() : "") +
    " (avg: " +
    averageDamage.toString() +
    ") " +
    (persistent ? "persistent " : "") +
    damageType +
    (multiplier !== 1 ? " x" + multiplier : "");

  return (
    <Grid container alignItems="center" columnSpacing={{ xs: 2 }}>
      <Grid size="auto">
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
      <Grid sx={{ ml: -2 }} size="auto">
        <ListItemButton onClick={onClick}>
          <Typography variant="h6">{"Damage "}</Typography>
        </ListItemButton>
      </Grid>
      <Grid sx={{ ml: -2, mt: 1, width: 100 }}>
        <Slider
          size="small"
          value={level}
          min={1}
          max={20}
          marks
          // @ts-ignore
          onChange={(_, nv) => setLevel(nv)}
          valueLabelDisplay="auto"
          // getAriaValueText={(v) => `${v}`}
        />
      </Grid>
      <Grid>
        <Typography component="span">
          {damageString + " at level " + level.toString()}
        </Typography>
      </Grid>
    </Grid>
  );
};
