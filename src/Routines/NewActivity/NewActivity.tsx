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
  ItemTrend,
  itemTrends,
  ProfTrend,
  profTrends,
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
  skillProfTrends,
  skillActivities,
  SkillInfo,
  CantripInfo,
  spells,
  SpellInfo,
  spellProfTrends,
} from "../../Model/newActivityInfo";
import { TooltipSelect } from "../../TooltipSelect";

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
      {/* <Grid container spacing={{ xs: 1, sm: 2 }} sx={{ m: 2, p: 2 }}>
        <Grid item xs="auto">
          <Typography>Enter activity information</Typography>
        </Grid> */}
      {/* <Grid item xs="auto"> */}
      <FormControl fullWidth sx={{ my: 2, p: 1 }}>
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
      {/* </Grid> */}
      {/* <Grid item> */}
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
      {/* </Grid> */}
      {/* </Grid> */}
    </Paper>
  );
}

function StrikeSelection() {
  const [runes, setRunes] = useState<DieTrend>(dieTrends.RUNE2);
  const [cClass, setCClass] = useState<typeof classes[number]>(classes[6]);
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
  const [numPrevStrikes, setNumPrevStrikes] = useState<number>(0);
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
    numPrevStrikes,
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
    <Grid container spacing={{ xs: 1, sm: 2 }} id="create-new-activity">
      <Grid item>
        <TooltipSelect
          title="Which class's proficiency and weapon specialization to use."
          value={cClass}
          label="Class"
          onChange={(e) => {
            setClass(e.target.value as typeof classes[number]);
          }}
        >
          {makeOptions(classes)}
        </TooltipSelect>
      </Grid>

      {showClassOptions() ? (
        <Grid item>
          <TooltipSelect
            title="Which abilities are applied"
            value={classOption}
            label="Class Option"
            onChange={(e) => {
              setClassOption(e.target.value);
            }}
          >
            {makeOptions(classOptions[cClass])}
          </TooltipSelect>
        </Grid>
      ) : (
        ""
      )}

      <Grid item>
        <TooltipSelect
          title="Which activity to use"
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
        </TooltipSelect>
      </Grid>
      {showCantrip() ? (
        <Grid item>
          <TooltipSelect
            title="Which spell to add to the strike"
            value={cantrip}
            label="Spell"
            onChange={(e) => {
              setCantrip(e.target.value);
            }}
          >
            {makeOptions(cantrips)}
          </TooltipSelect>
        </Grid>
      ) : (
        ""
      )}
      <Grid item>
        <TooltipSelect
          title="What ability score bonus progression to add to the attack roll."
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
        </TooltipSelect>
      </Grid>
      <Grid item>
        <TooltipSelect
          title="What ability score bonus progression to add to the damage roll. Not applied to ranged attacks."
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
        </TooltipSelect>
      </Grid>
      {showCantripScore() ? (
        <Grid item>
          <TooltipSelect
            title="What ability score bonus progression to add to the damage roll."
            value={cantripScore}
            label="Mental Abilitiy Score"
            onChange={(e) => {
              setCantripScore(e.target.value as StatTrend);
            }}
          >
            {
              // @ts-ignore
              makeOptions(statTrends)
            }
          </TooltipSelect>
        </Grid>
      ) : (
        ""
      )}
      <Grid item>
        <TooltipSelect
          title="Weapon damage die"
          value={dieSize}
          label="Damage Die"
          onChange={(e) => {
            setDieSize(Number(e.target.value));
          }}
        >
          {diceSizeOptions}
        </TooltipSelect>
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
          <TooltipSelect
            title="Deadly damage die."
            value={deadlySize}
            label="Deadly Die"
            onChange={(e) => {
              setDeadlySize(Number(e.target.value));
            }}
          >
            {diceSizeOptions}
          </TooltipSelect>
        </Grid>
      ) : (
        ""
      )}
      {traits["fatal"] ? (
        <Grid item>
          <TooltipSelect
            title="Fatal damage die."
            value={fatalSize}
            label="Fatal Die"
            onChange={(e) => {
              setFatalSize(Number(e.target.value));
            }}
          >
            {diceSizeOptions}
          </TooltipSelect>
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
          <Typography align="center" id="crit-spec-level">
            At Level {critSpecLevel}
          </Typography>
          <Slider
            aria-labelledby="crit-spec-level"
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
          <TooltipSelect
            title="What weapon group's effect to apply on a critical hit."
            value={critSpecType}
            label="Weapon Group"
            onChange={(e) => setCritSpecType(e.target.value)}
          >
            {makeOptions(critSpecs)}
          </TooltipSelect>
        </Grid>
      ) : (
        ""
      )}

      <Grid item>
        <TooltipSelect
          title="What levels the damages from property runes such as 'flaming' are applied."
          value={runes}
          label="Damage Rune Levels"
          onChange={(e) => {
            setRunes(e.target.value as DieTrend);
          }}
        >
          {makeOptions(runeTrends)}
        </TooltipSelect>
      </Grid>

      <Grid item xs="auto">
        <TooltipSelect
          title="Select the number of previous attacks."
          value={numPrevStrikes}
          label="Previous Attacks"
          onChange={(e) => {
            setNumPrevStrikes(Number(e.target.value));
          }}
        >
          {makeOptions([0, 1, 2])}
        </TooltipSelect>
      </Grid>
      <Grid item xs="auto">
        <TooltipSelect
          title="Select the number of attacks to make with the selected options."
          value={numStrikes}
          label="Number of Strikes"
          onChange={(e) => {
            setNumStrikes(Number(e.target.value));
          }}
        >
          {makeOptions([1, 2, 3, 4, 5, 6])}
        </TooltipSelect>
      </Grid>

      {/* Add Strike button */}
      <Grid item xs="auto">
        <Button
          variant="contained"
          onClick={() => dispatch(activityPathCreated({ strikeInfo }))}
        >
          Create New Activity
        </Button>
      </Grid>
    </Grid>
  );
}

function SkillSelection() {
  const [proficiency, setProficiency] = useState<ProfTrend>(
    profTrends.MAXSKILL
  );
  const [abilityScore, setAbilityScore] = useState<StatTrend>(statTrends.AS18a);
  const [itemBonus, setItemBonus] = useState<ItemTrend>(itemTrends.SKILL);
  const [skillActivity, setSkillActivity] = useState<
    typeof skillActivities[number]
  >(skillActivities[0]);

  const skillInfo: SkillInfo = {
    proficiency,
    abilityScore,
    itemBonus,
    skillActivity,
  };

  const dispatch = useAppDispatch();

  return (
    <Grid container spacing={{ xs: 1, sm: 2 }}>
      <Grid item>
        <TooltipSelect
          title="Select which proficiency progression to apply."
          label="Proficiency"
          value={proficiency}
          onChange={(e) => {
            setProficiency(e.target.value as ProfTrend);
          }}
        >
          {makeOptions(skillProfTrends)}
        </TooltipSelect>
      </Grid>
      <Grid item>
        <TooltipSelect
          title="Select which ability score progression to apply."
          label="Ability Score"
          value={abilityScore}
          onChange={(e) => {
            setAbilityScore(e.target.value as StatTrend);
          }}
        >
          {makeOptions(statTrends)}
        </TooltipSelect>
      </Grid>
      <Grid item>
        <TooltipSelect
          title="Select which item bonus progression to apply."
          label="Item Bonus"
          value={itemBonus}
          onChange={(e) => {
            setItemBonus(e.target.value as ItemTrend);
          }}
        >
          {makeOptions(itemTrends)}
        </TooltipSelect>
      </Grid>
      <Grid item>
        <TooltipSelect
          title="Select which skill activity to use."
          label="Activity"
          value={skillActivity}
          onChange={(e) => {
            setSkillActivity(e.target.value as typeof skillActivities[number]);
          }}
        >
          {makeOptions(skillActivities)}
        </TooltipSelect>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          onClick={() => dispatch(activityPathCreated({ skillInfo }))}
        >
          Create New Activity
        </Button>
      </Grid>
    </Grid>
  );
}

function CantripSelection() {
  const [proficiency, setProficiency] = useState<ProfTrend>(
    profTrends.CASTERSPELL
  );
  const [abilityScore, setAbilityScore] = useState<StatTrend>(statTrends.AS18a);
  const [cantrip, setCantrip] = useState<typeof cantrips[number]>(cantrips[0]);

  const cantripInfo: CantripInfo = {
    proficiency,
    abilityScore,
    cantrip,
  };

  const dispatch = useAppDispatch();

  return (
    <Grid container spacing={{ xs: 1, sm: 2 }}>
      <Grid item>
        <TooltipSelect
          title="Select which proficiency progression to apply."
          label="Proficiency"
          value={proficiency}
          onChange={(e) => {
            setProficiency(e.target.value as ProfTrend);
          }}
        >
          {makeOptions(spellProfTrends)}
        </TooltipSelect>
      </Grid>
      <Grid item>
        <TooltipSelect
          title="Select which ability score progression to apply."
          label="Ability Score"
          value={abilityScore}
          onChange={(e) => {
            setAbilityScore(e.target.value as StatTrend);
          }}
        >
          {makeOptions(statTrends)}
        </TooltipSelect>
      </Grid>
      <Grid item>
        <TooltipSelect
          title="Select which cantrip to use."
          label="Cantrip"
          value={cantrip}
          onChange={(e) => {
            setCantrip(e.target.value as typeof cantrips[number]);
          }}
        >
          {makeOptions(cantrips)}
        </TooltipSelect>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          onClick={() => dispatch(activityPathCreated({ cantripInfo }))}
        >
          Create New Activity
        </Button>
      </Grid>
    </Grid>
  );
}

function SpellSelection() {
  const [proficiency, setProficiency] = useState<ProfTrend>(
    profTrends.CASTERSPELL
  );
  const [abilityScore, setAbilityScore] = useState<StatTrend>(statTrends.AS18a);
  const [spell, setSpell] = useState<typeof spells[number]>(spells[0]);

  const spellInfo: SpellInfo = {
    proficiency,
    abilityScore,
    spell,
  };

  const dispatch = useAppDispatch();

  return (
    <Grid container spacing={{ xs: 1, sm: 2 }}>
      <Grid item>
        <TooltipSelect
          title="Select which proficiency progression to apply."
          label="Proficiency"
          value={proficiency}
          onChange={(e) => {
            setProficiency(e.target.value as ProfTrend);
          }}
        >
          {makeOptions(spellProfTrends)}
        </TooltipSelect>
      </Grid>
      <Grid item>
        <TooltipSelect
          title="Select which ability score progression to apply."
          label="Ability Score"
          value={abilityScore}
          onChange={(e) => {
            setAbilityScore(e.target.value as StatTrend);
          }}
        >
          {makeOptions(statTrends)}
        </TooltipSelect>
      </Grid>
      <Grid item>
        <TooltipSelect
          title="Select which spell to use."
          label="Spell"
          value={spell}
          onChange={(e) => {
            setSpell(e.target.value as typeof spells[number]);
          }}
        >
          {makeOptions(spells)}
        </TooltipSelect>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          onClick={() => dispatch(activityPathCreated({ spellInfo }))}
        >
          Create New Activity
        </Button>
      </Grid>
    </Grid>
  );
}
