import React, { useState } from "react";

import { useAppDispatch, useAppSelector } from "../App/hooks";
import { selecttargetById, Target, targetUpdated } from "./targetSlice";
// import { damageTypes } from "../Model/types";
// import {
//   selectweaknessById,
//   Weakness,
//   weaknessCreated,
//   weaknessRemoved,
//   weaknessUpdated,
// } from "./weaknessSlice";
// import { EntityId } from "@reduxjs/toolkit";
import { RootState } from "../App/store";
import { ACOptions, SaveOptions } from "../Model/options";
import {
  FormControl,
  InputLabel,
  Select,
  Grid,
  Paper,
  TextField,
  FormControlLabel,
  Switch,
  Slider,
  Typography,
} from "@mui/material";
// { id }: { id: EntityId }
function TargetInput() {
  const id = 0;
  const {
    name,
    levelDiff,
    persistentMultiplier,
    ACTrend,
    FortTrend,
    RefTrend,
    WillTrend,
    PerTrend,
    flatfooted,
    percentSelectedRoutine,
    // weaknesses,
  } = useAppSelector((state: RootState) =>
    selecttargetById(state, id)
  ) as Target;
  const [tempName, setTempName] = useState(name);
  const [perMul, setPerMul] = useState(persistentMultiplier.toString());
  // const [tempLevelDiff, setTempLevelDiff] = useState(levelDiff.toString());
  const dispatch = useAppDispatch();

  return (
    <Paper sx={{ my: 1, p: 1 }}>
      <Grid container spacing={{ xs: 1, sm: 2 }}>
        <Grid item xs={8} sm={4} md={8} lg={4}>
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
        <Grid item xs={4} sm={2} md={4} lg={2}>
          <Typography>Level Diff: {levelDiff}</Typography>
          <Slider
            // aria-label="Always visible"
            value={levelDiff}
            // getAriaValueText={(v) => `${v}`}
            // valueLabelDisplay="on"
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
        <Grid item xs={6} sm={3} md={6} lg={3}>
          <FormControlLabel
            control={
              <Switch
                checked={flatfooted}
                onChange={(e) =>
                  dispatch(
                    targetUpdated({
                      id,
                      changes: { flatfooted: e.target.checked },
                    })
                  )
                }
              />
            }
            label="Flatfooted"
          />
        </Grid>
        <Grid item xs={6} sm={3} md={6} lg={3}>
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
        <Grid item xs={3} sm={3} md={3} lg={3}>
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
        <Grid item xs={3} sm={3} md={3} lg={3}>
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
        <Grid item xs={3} sm={3} md={3} lg={3}>
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
        <Grid item xs={3} sm={3} md={3} lg={3}>
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
        <Grid item xs={6}>
          <FormControlLabel
            control={
              <Switch
                checked={percentSelectedRoutine}
                onChange={(e) =>
                  dispatch(
                    targetUpdated({
                      id,
                      changes: { percentSelectedRoutine: e.target.checked },
                    })
                  )
                }
              />
            }
            label="% of Selected Routine"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Persistent Damage Multiplier"
            value={perMul}
            onChange={(e) => {
              setPerMul(e.target.value);
              e.target.focus();
            }}
            onBlur={() => {
              let newVal = parseFloat(perMul);
              setPerMul(newVal.toString());
              dispatch(
                targetUpdated({
                  id,
                  changes: {
                    persistentMultiplier: newVal,
                  },
                })
              );
            }}
          />
        </Grid>
        {/* 
        <div className="box flexbox">
          {" Resistance/Weakness: "}
          {weaknesses.map((weaknessId) => (
            <WeaknessInput parentId={id} id={weaknessId} key={weaknessId} />
          ))}
          <AddWeakness parentId={id} />
        </div> */}
      </Grid>
    </Paper>
  );
}

// const TargetInfo = ({ id }) => {
//   const { overrideDefault, type, value, weaknesses } = useSelector((state) =>
//     selecttargetInfoById(state, id)
//   );
//   const dispatch = useDispatch();

//   const defenseOptions = [];
//   for (let d in defenses) {
//     defenseOptions.push(<option key={d}>{defenses[d]}</option>);
//   }

//   return (
//     <div className="box">
//       {"Override Target: "}
//       <input
//         type="checkbox"
//         checked={overrideDefault}
//         onChange={(e) =>
//           dispatch(
//             targetInfoUpdated({
//               id,
//               changes: { overrideDefault: e.target.checked },
//             })
//           )
//         }
//       />

// {/* <Weaknesses parentId={id} weaknessIds={weaknesses} /> */}

//     </div>
//   );
// };

// const Weaknesses = ({ parentId, weaknessIds }) => {
//   return (
//     <span>
//       {weaknessIds.map((weaknessId) => (
//         <Weakness id={weaknessId} key={weaknessId} />
//       ))}
//       <AddWeakness id={parentId} />
//     </span>
//   );
// };

// const WeaknessInput = ({
//   id,
//   parentId,
// }: {
//   id: EntityId;
//   parentId: EntityId;
// }) => {
//   // needs to have parent id to remove weakness
//   const { type, value } = useSelector((state: RootState) =>
//     selectweaknessById(state, id)
//   ) as Weakness;
//   const dispatch = useDispatch();

//   const updateOrRemoveWeakness = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     if (e?.target?.value === damageTypes.NONE) {
//       // remove this weakness
//       dispatch(weaknessRemoved({ id, parentId }));
//     } else {
//       dispatch(
//         weaknessUpdated({
//           id,
//           changes: { type: e.target.value as Weakness["type"] },
//         })
//       );
//     }
//   };
//   const updateWeaknessValue = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (!isNaN(parseInt(e.target.value))) {
//       dispatch(
//         weaknessUpdated({ id, changes: { value: parseInt(e.target.value) } })
//       );
//     }
//   };
//   return (
//     <span className="input">
//       <WeaknessSelect value={type} onChange={updateOrRemoveWeakness} />
//       <input type="number" value={value} onChange={updateWeaknessValue} />
//     </span>
//   );
// };

// let weaknessId = 0;

// const AddWeakness = ({ parentId }: { parentId: EntityId }) => {
//   const dispatch = useDispatch();
//   let [weaknessValue, setWeaknessValue] = useState(0);

//   // add a Weakness to TargetInfo id
//   const addWeakness = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     if (e.target.value !== damageTypes.NONE) {
//       // need to create a new weakness
//       weaknessId++;
//       dispatch(
//         weaknessCreated({
//           id: weaknessId,
//           type: e.target.value,
//           value: weaknessValue,
//           parentId: parentId,
//         })
//       );
//     }
//   };

//   return (
//     <span className="input">
//       <WeaknessSelect value={damageTypes.NONE} onChange={addWeakness} />
//       <input
//         type="number"
//         value={weaknessValue}
//         onChange={(e) => setWeaknessValue(parseInt(e.target.value))}
//       />
//     </span>
//   );
// };

// const WeaknessSelect = ({
//   value,
//   onChange,
// }: {
//   value: Weakness["type"];
//   onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
// }) => {
//   return (
//     <span>
//       <select value={value} onChange={(e) => onChange(e)}>
//         {weaknessOptions}
//       </select>
//     </span>
//   );
// };

export { TargetInput };
