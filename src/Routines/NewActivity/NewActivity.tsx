import React, { useState } from "react";

import { useAppDispatch } from "../../App/hooks";
import {
  Paper,
  Grid,
  Box,
  Typography,
  Select,
  FormControl,
  InputLabel,
  Chip,
  FormControlLabel,
  Switch,
  Slider,
  Button,
} from "@mui/material";
import { diceSizeOptions, makeOptions } from "../../Model/options";
import {
  diceSizes,
  DieTrend,
  dieTrends,
  StatTrend,
  statTrends,
} from "../../Model/types";
import { activityPathCreated } from "../RoutineSlice/routineSlice";
import {
  activityTypes,
  cantrips,
  strikeActivities,
  classes,
  critSpecs,
  runeTrends,
  StrikeInfo,
  weaponTraits,
  classOptions,
} from "../../Model/newActivityInfo";

/*
  get activity type: strike, skill, cantrip, spell

  if type is strike 
    choose class
    choose activity
    attak score, damage score, cantrip score for ea/magus
    choose weapon die and traits
    choose number of attacks

*/
export default function NewActivity({
  routineId,
  parentId,
}: {
  routineId?: number;
  parentId?: number;
}): JSX.Element {
  const [activityType, setActivityType] = useState<string>(
    activityTypes.Strike
  );

  return (
    <Paper sx={{ my: 2, p: 1 }}>
      <Grid container spacing={{ xs: 1, sm: 2 }} sx={{ m: 2, p: 2 }}>
        <Grid item>
          <Typography>Enter activity information</Typography>
        </Grid>
        <Grid item>
          <FormControl>
            <InputLabel>Activity Type</InputLabel>
            <Select
              value={activityType}
              label="Activity Type"
              onChange={(e) => {
                setActivityType(e.target.value);
              }}
            >
              {makeOptions(activityTypes)}
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          {activityTypes.Strike === activityType ? (
            <StrikeSelection />
          ) : activityTypes.Skill === activityType ? (
            <SkillSelection />
          ) : activityTypes.Cantrip === activityType ? (
            <CantripSelection />
          ) : activityTypes.Spell === activityType ? (
            <SpellSelection />
          ) : (
            ""
          )}
        </Grid>
      </Grid>
    </Paper>
  );
}

function StrikeSelection() {
  const [runes, setRunes] = useState<DieTrend>(dieTrends.RUNE);
  const [cClass, setCClass] = useState<typeof classes[number]>(classes[7]);
  const [activity, setActivity] = useState<string>("Strike");
  const [cantrip, setCantrip] = useState<string>(cantrips[0]);
  const [classOption, setClassOption] = useState<string>("");
  const [attackScore, setAttackScore] = useState<StatTrend>(statTrends.AS18a);
  const [damageScore, setDamageScore] = useState<StatTrend>(statTrends.AS18a);
  const [cantripScore, setCantripScore] = useState<StatTrend>(
    statTrends.AS16pp
  );
  const [dieSize, setDieSize] = useState<number>(diceSizes[8]);
  const [numStrikes, setNumStrikes] = useState<number>(1);
  const [traits, setTraits] = useState(
    // Array.from(weaponTraits, () => false)
    Object.fromEntries(weaponTraits.map((trait) => [trait, false]))
  );
  const [deadlySize, setDeadlySize] = useState<number>(diceSizes[8]);
  const [fatalSize, setFatalSize] = useState<number>(diceSizes[10]);
  const [critSpec, setCritSpec] = useState<boolean>(false);
  const [critSpecLevel, setCritSpecLevel] = useState<number>(5);
  const [critSpecType, setCritSpecType] = useState<string>(critSpecs[0]);

  const strikeInfo: StrikeInfo = {
    runes,
    cClass,
    classOption,
    activity,
    cantrip,
    attackScore,
    damageScore,
    cantripScore,
    dieSize,
    numStrikes,
    traits,
    deadlySize,
    fatalSize,
    critSpec,
    critSpecLevel,
    critSpecType,
  };

  const dispatch = useAppDispatch();

  const setClass = (className: typeof classes[number]) => {
    setCClass(className);
    if (classOptions[className].length > 0) {
      setClassOption(classOptions[className][0]);
    } else {
      setClassOption("");
    }
  };
  const showClassOptions = (): boolean => {
    return classOptions[cClass].length > 0;
  };
  const showCantrip = (): boolean => {
    return false;
  };
  const showCantripScore = (): boolean => {
    if (cClass === "Inventor") return true;
    return false;
  };

  return (
    <Grid container spacing={{ xs: 1, sm: 2 }}>
      <Grid item>
        <FormControl>
          <InputLabel>Damage Rune Levels</InputLabel>
          <Select
            value={runes}
            label="Damage Rune Levels"
            onChange={(e) => {
              setRunes(e.target.value as DieTrend);
            }}
          >
            {makeOptions(runeTrends)}
          </Select>
        </FormControl>
      </Grid>
      <Grid item>
        <FormControl>
          <InputLabel>Class</InputLabel>
          <Select
            value={cClass}
            label="Class"
            onChange={(e) => {
              setClass(e.target.value as typeof classes[number]);
            }}
          >
            {makeOptions(classes)}
          </Select>
        </FormControl>
      </Grid>

      {showClassOptions() ? (
        <Grid item>
          <FormControl>
            <InputLabel>Class Option</InputLabel>
            <Select
              value={classOption}
              label="Class Option"
              onChange={(e) => {
                setClassOption(e.target.value);
              }}
            >
              {makeOptions(classOptions[cClass])}
            </Select>
          </FormControl>
        </Grid>
      ) : (
        ""
      )}

      <Grid item>
        <FormControl>
          <InputLabel>Activity</InputLabel>
          <Select
            value={activity}
            label="Activity"
            onChange={(e) => {
              setActivity(e.target.value);
            }}
          >
            {
              // @ts-ignore
              makeOptions(strikeActivities)
            }
          </Select>
        </FormControl>
      </Grid>
      {showCantrip() ? (
        <Grid item>
          <FormControl>
            <InputLabel>Cantrip</InputLabel>
            <Select
              value={cantrip}
              label="Cantrip"
              onChange={(e) => {
                setCantrip(e.target.value);
              }}
            >
              {makeOptions(cantrips)}
            </Select>
          </FormControl>
        </Grid>
      ) : (
        ""
      )}
      <Grid item>
        <FormControl>
          <InputLabel>Attack Abilitiy Score</InputLabel>
          <Select
            value={attackScore}
            label="Attack Abilitiy Score"
            onChange={(e) => {
              setAttackScore(e.target.value as StatTrend);
            }}
          >
            {
              // @ts-ignore
              makeOptions(statTrends)
            }
          </Select>
        </FormControl>
      </Grid>
      <Grid item>
        <FormControl>
          <InputLabel>Damage Abilitiy Score</InputLabel>
          <Select
            value={damageScore}
            label="Damage Abilitiy Score"
            onChange={(e) => {
              setDamageScore(e.target.value as StatTrend);
            }}
          >
            {
              // @ts-ignore
              makeOptions(statTrends)
            }
          </Select>
        </FormControl>
      </Grid>
      {showCantripScore() ? (
        <Grid item>
          <FormControl>
            <InputLabel>Mental Abilitiy Score</InputLabel>
            <Select
              value={cantripScore}
              label="Cantrip Abilitiy Score"
              onChange={(e) => {
                setCantripScore(e.target.value as StatTrend);
              }}
            >
              {
                // @ts-ignore
                makeOptions(statTrends)
              }
            </Select>
          </FormControl>
        </Grid>
      ) : (
        ""
      )}
      <Grid item>
        <FormControl>
          <InputLabel>Damage Die</InputLabel>
          <Select
            value={dieSize}
            label="Damage Die"
            onChange={(e) => {
              setDieSize(Number(e.target.value));
            }}
          >
            {diceSizeOptions}
          </Select>
        </FormControl>
      </Grid>

      {/* Weapon Traits */}
      <Grid item>
        <Paper
          variant="outlined"
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            listStyle: "none",
            p: 0.5,
            my: 1,
          }}
          component="ul"
        >
          {weaponTraits.map((traitName, index) => (
            <Box component="li" key={traitName} sx={{ margin: 0.5 }}>
              <Chip
                label={traitName}
                size="small"
                color="secondary"
                variant={traits[traitName] ? "filled" : "outlined"}
                onClick={() => {
                  const newTraits = {
                    ...traits,
                    [traitName]: !traits[traitName],
                  };
                  // newTraits[traitName] = !traits[traitName];
                  setTraits(newTraits);
                }}
              />
            </Box>
          ))}
        </Paper>
      </Grid>
      {traits["deadly"] ? (
        <Grid item>
          <FormControl>
            <InputLabel>Deadly Die</InputLabel>
            <Select
              value={deadlySize}
              label="Deadly Die"
              onChange={(e) => {
                setDeadlySize(Number(e.target.value));
              }}
            >
              {diceSizeOptions}
            </Select>
          </FormControl>
        </Grid>
      ) : (
        ""
      )}
      {traits["fatal"] ? (
        <Grid item>
          <FormControl>
            <InputLabel>Fatal Die</InputLabel>
            <Select
              value={fatalSize}
              label="Fatal Die"
              onChange={(e) => {
                setFatalSize(Number(e.target.value));
              }}
            >
              {diceSizeOptions}
            </Select>
          </FormControl>
        </Grid>
      ) : (
        ""
      )}

      <Grid item>
        <FormControlLabel
          control={
            <Switch
              checked={critSpec}
              onChange={(e) => setCritSpec(e.target.checked)}
            />
          }
          label="Critical Specialization"
        />
      </Grid>
      {/* crit spec level slider */}
      {critSpec ? (
        <Grid item>
          <Typography align="center">At Level {critSpecLevel}</Typography>
          <Slider
            value={critSpecLevel}
            min={1}
            max={20}
            marks
            onChange={(e, nv) => setCritSpecLevel(Number(nv))}
          />
        </Grid>
      ) : (
        ""
      )}
      {critSpec ? (
        <Grid item>
          <FormControl>
            <InputLabel>Weapon Group</InputLabel>
            <Select
              value={critSpecType}
              label="Weapon Group"
              onChange={(e) => setCritSpecType(e.target.value)}
            >
              {makeOptions(critSpecs)}
            </Select>
          </FormControl>
        </Grid>
      ) : (
        ""
      )}

      <Grid item xs={6} sm={3} md={4} lg={2}>
        <FormControl fullWidth>
          <InputLabel>Number of Strikes</InputLabel>
          <Select
            value={numStrikes}
            label="Number of Strikes"
            onChange={(e) => {
              setNumStrikes(Number(e.target.value));
            }}
          >
            {makeOptions([0, 1, 2, 3, 4, 5, 6])}
          </Select>
        </FormControl>
      </Grid>

      {/* Add Strike button */}
      <Grid item>
        <Button
          variant="contained"
          onClick={() => dispatch(activityPathCreated({ strikeInfo }))}
        >
          Creat New Activity
        </Button>
      </Grid>
    </Grid>
  );
}

function SkillSelection() {
  return <React.Fragment>select prof</React.Fragment>;
}

function CantripSelection() {
  return <React.Fragment>select cantrip/prof/ascore/dscore</React.Fragment>;
}

function SpellSelection() {
  return <React.Fragment>select spell/prof/ascore</React.Fragment>;
}
