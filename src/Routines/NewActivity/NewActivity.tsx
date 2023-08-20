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
  Stack,
  FormLabel,
  RadioGroup,
  Radio,
} from "@mui/material";
import { diceSizeOptions, makeOptions } from "../../Model/options";
import {
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
  attackSpells,
  WeaponInfo,
  impulses,
  impulseProfTrends,
  ImpulseInfo,
  blastTraits,
} from "../../Model/newActivityInfo";
import { TooltipSelect } from "../../TooltipSelect";
import ReactGA from "react-ga4";
ReactGA.initialize("G-JR2YK097BG");

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
      ) : activityTypes.Impulse === activityType ? (
        <ImpulseSelection />
      ) : (
        ""
      )}
      {/* </Grid> */}
      {/* </Grid> */}
    </Paper>
  );
}

function StrikeSelection() {
  const [strikeInfo, setStrikeInfo] = useState<StrikeInfo>({
    cClass: classes[6],
    classOption: "",
    activity: "Strike",
    spell: attackSpells[0],
    attackScore: statTrends.AS18a,
    damageScore: statTrends.AS18a,
    cantripScore: statTrends.AS16pp,

    numPrevStrikes: 0,
    numStrikes: 1,
    twf: false,
    isStrikeSecondaryWeapon: [false],
    previousHits: 0,

    weapon1: {
      dieSize: 8,
      traits: Object.fromEntries(weaponTraits.map((trait) => [trait, false])),
      deadlySize: 8,
      fatalSize: 10,
      critSpec: false,
      critSpecLevel: 5,
      critSpecType: critSpecs[0],
      runes: dieTrends.RUNE2,

      numPrevStrikes: 0,
    },
    weapon2: {
      dieSize: 8,
      traits: Object.fromEntries(weaponTraits.map((trait) => [trait, false])),
      deadlySize: 8,
      fatalSize: 10,
      critSpec: false,
      critSpecLevel: 5,
      critSpecType: critSpecs[0],
      runes: dieTrends.RUNE2,

      numPrevStrikes: 0,
    },
  });
  // const [cClass, setCClass] = useState<typeof classes[number]>(classes[6]);
  // const [classOption, setClassOption] = useState<string>("");
  // const [activity, setActivity] =
  //   useState<typeof strikeActivities[number]>("Strike");
  // const [spell, setSpell] = useState<typeof attackSpells[number]>(
  //   attackSpells[0]
  // );
  // const [attackScore, setAttackScore] = useState<StatTrend>(statTrends.AS18a);
  // const [damageScore, setDamageScore] = useState<StatTrend>(statTrends.AS18a);
  // const [cantripScore, setCantripScore] = useState<StatTrend>(
  //   statTrends.AS16pp
  // );

  // const [numStrikes, setNumStrikes] = useState<number>(1);
  // const [numPrevStrikes, setNumPrevStrikes] = useState<number>(0);
  // const [twf, setTwf] = useState<boolean>(false);
  // const [isStrikeSecondaryWeapon, setIsStrikeSecondaryWeapon] = useState<
  //   boolean[]
  // >([false]);
  // const [previousHits, setPreviousHits] = useState<number>(0);

  // const [dieSize, setDieSize] = useState<number>(diceSizes[8]);
  // const [traits, setTraits] = useState(
  //   // Array.from(weaponTraits, () => false)
  //   Object.fromEntries(weaponTraits.map((trait) => [trait, false]))
  // );
  // const [deadlySize, setDeadlySize] = useState<number>(diceSizes[8]);
  // const [fatalSize, setFatalSize] = useState<number>(diceSizes[10]);
  // const [critSpec, setCritSpec] = useState<boolean>(false);
  // const [critSpecLevel, setCritSpecLevel] = useState<number>(5);
  // const [critSpecType, setCritSpecType] = useState<string>(critSpecs[0]);
  // const [runes, setRunes] = useState<DieTrend>(dieTrends.RUNE2);

  // const [dieSize2, setDieSize2] = useState<number>(diceSizes[8]);
  // const [traits2, setTraits2] = useState(
  //   // Array.from(weaponTraits, () => false)
  //   Object.fromEntries(weaponTraits.map((trait) => [trait, false]))
  // );
  // const [deadlySize2, setDeadlySize2] = useState<number>(diceSizes[8]);
  // const [fatalSize2, setFatalSize2] = useState<number>(diceSizes[10]);
  // const [critSpec2, setCritSpec2] = useState<boolean>(false);
  // const [critSpecLevel2, setCritSpecLevel2] = useState<number>(5);
  // const [critSpecType2, setCritSpecType2] = useState<string>(critSpecs[0]);
  // const [runes2, setRunes2] = useState<DieTrend>(dieTrends.RUNE2);

  // const strikeInfo: StrikeInfo = {
  //   cClass,
  //   classOption,
  //   activity,
  //   spell,
  //   attackScore,
  //   damageScore,
  //   cantripScore,

  //   numPrevStrikes,
  //   numStrikes,
  //   twf,
  //   isStrikeSecondaryWeapon,
  //   previousHits,

  //   dieSize,
  //   traits,
  //   deadlySize,
  //   fatalSize,
  //   critSpec,
  //   critSpecLevel,
  //   critSpecType,
  //   runes,

  //   dieSize2,
  //   traits2,
  //   deadlySize2,
  //   fatalSize2,
  //   critSpec2,
  //   critSpecLevel2,
  //   critSpecType2,
  //   runes2,
  // };

  const dispatch = useAppDispatch();

  const setClass = (className: (typeof classes)[number]) => {
    const newStrikeInfo = { ...strikeInfo };
    newStrikeInfo.cClass = className;
    if (classOptions[className].length > 0) {
      newStrikeInfo.classOption = classOptions[className][0];
    } else {
      newStrikeInfo.classOption = "";
    }
    setStrikeInfo(newStrikeInfo);
  };
  const showClassOptions = (): boolean => {
    return classOptions[strikeInfo.cClass].length > 0;
  };
  const showCantrip = (): boolean => {
    if (strikeInfo.activity === "Spell Strike") {
      return true;
    }
    return false;
  };
  const showCantripScore = (): boolean => {
    if (strikeInfo.cClass === "Inventor") {
      if (
        strikeInfo.classOption === "Overdrive Success" ||
        strikeInfo.classOption === "Overdrive Critical"
      ) {
        return true;
      }
    }
    if (strikeInfo.activity === "Spell Strike") {
      return true;
    }

    return false;
  };

  return (
    <React.Fragment>
      <Grid
        container
        spacing={{ xs: 1, sm: 2 }}
        sx={{ py: 2 }}
        id="create-new-activity"
      >
        <Grid item>
          <TooltipSelect
            title="Which class's proficiency and weapon specialization to use."
            value={strikeInfo.cClass}
            label="Class"
            onChange={(e) => {
              setClass(e.target.value as (typeof classes)[number]);
            }}
          >
            {makeOptions(classes)}
          </TooltipSelect>
        </Grid>

        {showClassOptions() ? (
          <Grid item>
            <TooltipSelect
              title="Which abilities are applied"
              value={strikeInfo.classOption}
              label="Class Option"
              onChange={(e) => {
                setStrikeInfo({ ...strikeInfo, classOption: e.target.value });
              }}
            >
              {makeOptions(classOptions[strikeInfo.cClass])}
            </TooltipSelect>
          </Grid>
        ) : (
          ""
        )}

        <Grid item>
          <TooltipSelect
            title="Which activity to use"
            value={strikeInfo.activity}
            label="Activity"
            onChange={(e) => {
              const newStrikeInfo = { ...strikeInfo };
              newStrikeInfo.activity = e.target
                .value as (typeof strikeActivities)[number];
              if (e.target.value === "Double Slice") {
                newStrikeInfo.numStrikes = 2;
                newStrikeInfo.isStrikeSecondaryWeapon = [false, true];
              }
              setStrikeInfo(newStrikeInfo);
            }}
          >
            {makeOptions(strikeActivities)}
          </TooltipSelect>
        </Grid>
        {showCantrip() ? (
          <Grid item>
            <TooltipSelect
              title="Which spell to add to the strike"
              value={strikeInfo.spell}
              label="Spell"
              onChange={(e) => {
                setStrikeInfo({
                  ...strikeInfo,
                  spell: e.target.value as (typeof attackSpells)[number],
                });
              }}
            >
              {makeOptions(attackSpells)}
            </TooltipSelect>
          </Grid>
        ) : (
          ""
        )}
        <Grid item>
          <TooltipSelect
            title="What ability score bonus progression to add to the attack roll."
            value={strikeInfo.attackScore}
            label="Attack Abilitiy Score"
            onChange={(e) => {
              setStrikeInfo({
                ...strikeInfo,
                attackScore: e.target.value as StatTrend,
              });
            }}
          >
            {makeOptions(statTrends)}
          </TooltipSelect>
        </Grid>
        <Grid item>
          <TooltipSelect
            title="What ability score bonus progression to add to the damage roll.
            Not applied to ranged attacks."
            value={strikeInfo.damageScore}
            label="Damage Abilitiy Score"
            onChange={(e) => {
              setStrikeInfo({
                ...strikeInfo,
                damageScore: e.target.value as StatTrend,
              });
            }}
          >
            {makeOptions(statTrends)}
          </TooltipSelect>
        </Grid>
        {showCantripScore() ? (
          <Grid item>
            <TooltipSelect
              title="What ability score bonus progression to add to the damage roll."
              value={strikeInfo.cantripScore}
              label="Mental Abilitiy Score"
              onChange={(e) => {
                setStrikeInfo({
                  ...strikeInfo,
                  cantripScore: e.target.value as StatTrend,
                });
              }}
            >
              {makeOptions(statTrends)}
            </TooltipSelect>
          </Grid>
        ) : (
          ""
        )}
      </Grid>

      <WeaponInput
        weapon={strikeInfo.weapon1}
        setWeapon={(weapon) =>
          setStrikeInfo({ ...strikeInfo, weapon1: weapon })
        }
      />

      {/* <Grid
        container
        columnSpacing={{ xs: 1, sm: 2 }}
        sx={{ my: 2 }}
        alignItems="center"
      > */}
      {/* <Grid item xs="auto"> */}
      <FormControlLabel
        control={
          <Switch
            checked={strikeInfo.twf}
            onChange={(e) =>
              setStrikeInfo({ ...strikeInfo, twf: e.target.checked })
            }
          />
        }
        label="Use Two Weapons"
        sx={{ py: 2 }}
      />
      {/* </Grid> */}
      {strikeInfo.twf ? (
        <WeaponInput
          weapon={strikeInfo.weapon2}
          setWeapon={(weapon) =>
            setStrikeInfo({ ...strikeInfo, weapon2: weapon })
          }
        />
      ) : (
        ""
      )}
      {/* </Grid> */}

      <Grid container spacing={{ xs: 1, sm: 2 }} sx={{ py: 2 }}>
        <Grid item xs="auto">
          <TooltipSelect
            title="Select the number of previous attacks."
            value={strikeInfo.numPrevStrikes}
            label="Previous Attacks"
            onChange={(e) => {
              setStrikeInfo({
                ...strikeInfo,
                numPrevStrikes: Number(e.target.value),
              });
            }}
          >
            {makeOptions([0, 1, 2])}
          </TooltipSelect>
        </Grid>
        {strikeInfo.activity !== "Double Slice" ? (
          <Grid item xs="auto">
            <TooltipSelect
              title="Select the number of attacks to make with the selected options."
              value={strikeInfo.numStrikes}
              label="Number of Strikes"
              onChange={(e) => {
                const newNumStrikes = Number(e.target.value);
                const newStrikeInfo = { ...strikeInfo };
                const isStrikeSecondaryWeapon = [];
                for (let i = 0; i < newNumStrikes; i++) {
                  if (i < strikeInfo.numStrikes) {
                    isStrikeSecondaryWeapon.push(
                      strikeInfo.isStrikeSecondaryWeapon[i]
                    );
                  } else {
                    isStrikeSecondaryWeapon.push(false);
                  }
                }
                newStrikeInfo.numStrikes = newNumStrikes;
                newStrikeInfo.isStrikeSecondaryWeapon = isStrikeSecondaryWeapon;
                setStrikeInfo(newStrikeInfo);
              }}
            >
              {makeOptions([1, 2, 3, 4, 5, 6])}
            </TooltipSelect>
          </Grid>
        ) : (
          ""
        )}
        {strikeInfo.cClass === "Ranger" &&
        strikeInfo.classOption === "Precision Edge" ? (
          <Grid item xs="auto">
            <TooltipSelect
              title="Select the number of previous hits."
              value={strikeInfo.previousHits}
              label="Previous Hits"
              onChange={(e) => {
                setStrikeInfo({
                  ...strikeInfo,
                  previousHits: Number(e.target.value),
                });
              }}
            >
              {makeOptions([0, 1, 2, 3])}
            </TooltipSelect>
          </Grid>
        ) : (
          ""
        )}

        {/* Add Strike button */}
        <Grid item xs="auto">
          <Button
            variant="contained"
            onClick={() => {
              ReactGA.event("select_content", {
                content_type: "create-new-strike",
                item_id: strikeInfo.cClass,
              });
              dispatch(activityPathCreated({ strikeInfo }));
            }}
          >
            Create New Activity
          </Button>
        </Grid>
      </Grid>

      {strikeInfo.twf && strikeInfo.activity !== "Double Slice" ? (
        <Stack spacing={{ xs: 1, sm: 2 }}>
          {strikeInfo.isStrikeSecondaryWeapon.map((isSecondary, index) => (
            <FormControl component="fieldset" key={index}>
              <FormLabel component="legend">Strike {index + 1}</FormLabel>
              <RadioGroup
                row
                aria-label={"strike-" + (index + 1)}
                value={isSecondary ? 2 : 1}
                onClick={(e) => {
                  const newStrikeInfo = { ...strikeInfo };
                  const newIsSecondary =
                    strikeInfo.isStrikeSecondaryWeapon.slice();
                  newIsSecondary[index] =
                    (e.target as HTMLInputElement).value === "2";
                  newStrikeInfo.isStrikeSecondaryWeapon = newIsSecondary;
                  setStrikeInfo(newStrikeInfo);
                }}
              >
                <FormControlLabel
                  value={1}
                  control={<Radio />}
                  label="Weapon 1"
                />
                <FormControlLabel
                  value={2}
                  control={<Radio />}
                  label="Weapon 2"
                />
              </RadioGroup>
            </FormControl>
          ))}
        </Stack>
      ) : (
        ""
      )}
    </React.Fragment>
  );
}

function WeaponInput({
  weapon,
  setWeapon,
  isElementalBlast = false,
}: {
  weapon: WeaponInfo;
  setWeapon: (weapon: WeaponInfo) => void;
  isElementalBlast?: boolean;
}) {
  return (
    <Grid
      container
      columnSpacing={{ xs: 1, sm: 2 }}
      sx={{ py: 2 }}
      alignItems="center"
    >
      <Grid item xs="auto">
        <Typography variant="h6">{isElementalBlast ? "Blast details" : "Weapon"}</Typography>
      </Grid>

      <Grid item>
        <TooltipSelect
          title="Weapon damage die"
          value={weapon.dieSize}
          label="Damage Die"
          onChange={(e) => {
            setWeapon({ ...weapon, dieSize: Number(e.target.value) });
          }}
        >
          {diceSizeOptions}
        </TooltipSelect>
      </Grid>

      {!isElementalBlast ? (
      <Grid item>
        <FormControlLabel
          control={
            <Switch
              checked={weapon.critSpec}
              onChange={(e) =>
                setWeapon({ ...weapon, critSpec: e.target.checked })
              }
            />
          }
          label="Critical Specialization"
        />
      </Grid>
      ) : null}
      {/* crit spec level slider */}
      {weapon.critSpec ? (
        <Grid item>
          <Typography align="center" id="crit-spec-level">
            At Level {weapon.critSpecLevel}
          </Typography>
          <Slider
            aria-labelledby="crit-spec-level"
            value={weapon.critSpecLevel}
            min={1}
            max={20}
            marks
            onChange={(e, nv) =>
              setWeapon({ ...weapon, critSpecLevel: Number(nv) })
            }
          />
        </Grid>
      ) : (
        ""
      )}
      {weapon.critSpec ? (
        <Grid item>
          <TooltipSelect
            title="What weapon group's effect to apply on a critical hit."
            value={weapon.critSpecType}
            label="Weapon Group"
            onChange={(e) =>
              setWeapon({ ...weapon, critSpecType: e.target.value })
            }
          >
            {makeOptions(critSpecs)}
          </TooltipSelect>
        </Grid>
      ) : (
        ""
      )}
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
          {(isElementalBlast ? blastTraits : weaponTraits).map((traitName, index) => (
            <Box component="li" key={traitName} sx={{ margin: 0.5 }}>
              <Chip
                label={traitName}
                size="small"
                color="secondary"
                variant={weapon.traits[traitName] ? "filled" : "outlined"}
                onClick={() => {
                  const newTraits = {
                    ...weapon.traits,
                    [traitName]: !weapon.traits[traitName],
                  };
                  // newTraits[traitName] = !traits[traitName];
                  setWeapon({ ...weapon, traits: newTraits });
                }}
              />
            </Box>
          ))}
        </Paper>
      </Grid>
      {weapon.traits["deadly"] ? (
        <Grid item>
          <TooltipSelect
            title="Deadly damage die."
            value={weapon.deadlySize}
            label="Deadly Die"
            onChange={(e) => {
              setWeapon({ ...weapon, deadlySize: Number(e.target.value) });
            }}
          >
            {diceSizeOptions}
          </TooltipSelect>
        </Grid>
      ) : (
        ""
      )}
      {weapon.traits["fatal"] ? (
        <Grid item>
          <TooltipSelect
            title="Fatal damage die."
            value={weapon.fatalSize}
            label="Fatal Die"
            onChange={(e) => {
              setWeapon({ ...weapon, fatalSize: Number(e.target.value) });
            }}
          >
            {diceSizeOptions}
          </TooltipSelect>
        </Grid>
      ) : (
        ""
      )}

      {!isElementalBlast ? (
        <Grid item>
        <TooltipSelect
          title="What levels the damages from property runes such as 'flaming' are applied."
          value={weapon.runes}
          label="Damage Rune Levels"
          onChange={(e) => {
            setWeapon({ ...weapon, runes: e.target.value as DieTrend });
          }}
        >
          {makeOptions(runeTrends)}
        </TooltipSelect>
      </Grid>
      ) : (
        null
      )}
      
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
    (typeof skillActivities)[number]
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
            setSkillActivity(
              e.target.value as (typeof skillActivities)[number]
            );
          }}
        >
          {makeOptions(skillActivities)}
        </TooltipSelect>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          onClick={() => {
            ReactGA.event("select_content", {
              content_type: "create-new-skill",
              item_id: skillActivity,
            });
            dispatch(activityPathCreated({ skillInfo }));
          }}
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
  const [cantrip, setCantrip] = useState<(typeof cantrips)[number]>(
    cantrips[0]
  );

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
            setCantrip(e.target.value as (typeof cantrips)[number]);
          }}
        >
          {makeOptions(cantrips)}
        </TooltipSelect>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          onClick={() => {
            ReactGA.event("select_content", {
              content_type: "create-new-cantrip",
              item_id: cantrip,
            });
            dispatch(activityPathCreated({ cantripInfo }));
          }}
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
  const [spell, setSpell] = useState<(typeof spells)[number]>(spells[0]);

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
            setSpell(e.target.value as (typeof spells)[number]);
          }}
        >
          {makeOptions(spells)}
        </TooltipSelect>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          onClick={() => {
            ReactGA.event("select_content", {
              content_type: "create-new-spell",
              item_id: spell,
            });
            dispatch(activityPathCreated({ spellInfo }));
          }}
        >
          Create New Activity
        </Button>
      </Grid>
    </Grid>
  );
}

function ImpulseSelection() {
  const [proficiency, setProficiency] = useState<ProfTrend>(
    profTrends.CASTERSPELL
  );
  const [abilityScore, setAbilityScore] = useState<StatTrend>(statTrends.AS18a);
  const [impulse, setImpulse] = useState<(typeof impulses)[number]>(
    impulses[0]
  );

  // for kinetic blast
  const [isTwoAction, setIsTwoAction] = useState<boolean>(false);
  const [strScore, setStrScore] = useState<StatTrend>(statTrends.AS10);
  const [weapon, setWeapon] = useState({
    dieSize: 8,
    traits: Object.fromEntries(weaponTraits.map((trait) => [trait, false])),
    deadlySize: 8,
    fatalSize: 10,
    critSpec: false,
    critSpecLevel: 5,
    critSpecType: critSpecs[1] as string,
    runes: dieTrends.NONE as DieTrend,

    numPrevStrikes: 0,
  });

  const impulseInfo: ImpulseInfo = {
    proficiency,
    abilityScore,
    impulse,
    isTwoAction,
    strScore,
    weaponInfo: weapon,
  };

  const dispatch = useAppDispatch();

  return (
    <>
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
            {makeOptions(impulseProfTrends)}
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
            title="Select which impulse to use."
            label="Impulse"
            value={impulse}
            onChange={(e) => {
              setImpulse(e.target.value as (typeof impulses)[number]);
            }}
          >
            {makeOptions(impulses)}
          </TooltipSelect>
        </Grid>
        {impulse === "Elemental Blast" ? (
          <>
          <Grid item>
            <FormControlLabel
              control={
                <Switch
                  checked={isTwoAction}
                  onChange={(e) =>
                    setIsTwoAction(e.target.checked)
                  }
                />
              }
              label="Is two action blast"
            />
          </Grid>
          <Grid item>
            <TooltipSelect
              title="Select which ability score progression to apply."
              label="Strength Score"
              value={strScore}
              onChange={(e) => {
                setStrScore(e.target.value as StatTrend);
              }}
            >
              {makeOptions(statTrends)}
            </TooltipSelect>
          </Grid>
          </>
        ) : null}
      </Grid>

      {impulse === "Elemental Blast" ? (
        <WeaponInput weapon={weapon} setWeapon={setWeapon} isElementalBlast={true} />
      ) : null}

      <Grid>
        <Grid item>
          <Button
            variant="contained"
            onClick={() => {
              ReactGA.event("select_content", {
                content_type: "create-new-impulse",
                item_id: impulse,
              });
              dispatch(activityPathCreated({ impulseInfo }));
            }}
          >
            Create New Activity
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
