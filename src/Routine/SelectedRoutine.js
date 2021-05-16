import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  activityTypes,
  damageTypes,
  dCond,
  defenses,
  diceNums,
  diceSizes,
  MAPs,
  materials,
} from "../types";
import { selectactivityPathById } from "./activityPathSlice";
import { activityUpdated, selectactivityById } from "./activitySlice";
import {
  damageCreated,
  damageRemoved,
  damageUpdated,
  selectdamageById,
} from "./damageSlice";
import {
  routineUpdated,
  selectRoutineById,
  selectSelectedRoutine,
} from "./routineSlice";
import {
  selecttargetInfoById,
  targetInfoAdded,
  targetInfoUpdated,
} from "./targetInfoSlice";
import {
  selectweaknessById,
  weaknessAdded,
  weaknessCreated,
  weaknessRemoved,
  weaknessUpdated,
} from "./weaknessSlice";

// import { selectTarget, selectLevel } from "./Target/targetSlice";
// import { selectCurrentEffect } from "./Effect/effectSlice";

// import {
//   CheckboxInput,
//   CollapsableInput,
//   ByLevelInput,
// } from "./Effect/Inputs/CommonInputs.js";

// import MAP from "./Effect/Model/MAP.js";
// import Proficiency from "./Effect/Model/Proficiency.js";
// import AbilityScore from "./Effect/Model/AbilityScore.js";
// import Modifier from "./Effect/Model/Modifier.js";
// import AdditionalEffectArray from "./Effect/Model/AdditionalEffectArray.js";

// import {
//   totalBonusDescription,
//   attackBonusDescription,
//   totalDamageDescription,
//   calculateExpectedDamage,
// } from "./Calculation.js";

// import MAPInput from "./Effect/Inputs/MAPInput.js";
// import OverrideInput from "./Effect/Inputs/OverrideInput.js";
// import { WeaponProficiencyInput } from "./Effect/Inputs/ProficiencyInput.js";
// import {
//   AttackAbilityScoreInput,
//   DamageAbilityScoreInput,
// } from "./Effect/Inputs/AbilityScoreInput.js";
// import ItemBonusInput from "./Effect/Inputs/ItemBonusInput.js";
// import ModifierInput from "./Effect/Inputs/ModifierInput.js";
// import { WeaponDiceNumInput } from "./Effect/Inputs/NumberDiceInput.js";
// import { DieSizeInput } from "./Effect/Inputs/DieSizeInput.js";
// import WeaponSpecInput from "./Effect/Inputs/WeaponSpecInput.js";
// import { WeaponTraitInput, RuneInput } from "./Effect/Inputs/TraitInput.js";

// import { AdditionalDamageInput } from "./Effect/Inputs/AdditionalEffectInput";
// import DamageTypeInput from "./Effect/Inputs/DamageTypeInput";

// function StrikeInput() {
//   /*
//         Proficiency, Primary Ability Scor
//     */
//   const level = useSelector(selectLevel);
//   const effect = useSelector(selectCurrentEffect);

//   return (
//     <div className="StrikeInput">
//       <CollapsableInput
//         description={"Total Bonus: " + totalBonusDescription(effect, level)}
//         listInput={
//           <div className="CheckInput">
//             <CollapsableInput
//               description={
//                 "Attack Bonus: " + attackBonusDescription(effect, level)
//               }
//               listInput={
//                 <div>
//                   <OverrideInput />
//                   <WeaponProficiencyInput />
//                   <AttackAbilityScoreInput />
//                   <ItemBonusInput />
//                 </div>
//               }
//             />
//             <ModifierInput />
//             <MAPInput />
//           </div>
//         }
//       />

//       <CollapsableInput
//         description={"Total Damage: " + totalDamageDescription(effect, level)}
//         listInput={
//           <div className="DamageInput">
//             <DamageTypeInput />
//             <DamageAbilityScoreInput />
//             <WeaponDiceNumInput />
//             <DieSizeInput />
//             <WeaponSpecInput />
//             <WeaponTraitInput />
//             <RuneInput />
//             <AdditionalDamageInput />
//           </div>
//         }
//       />
//     </div>
//   );
// }

// function EffectInput(props) {
//   // props: effect, selectedLevel, onEffectChange
//   return <StrikeInput />;
// }

function SelectedRoutine() {
  const selectedRoutine = useSelector(selectSelectedRoutine);
  const apId = useSelector((state) =>
    selectRoutineById(state, selectedRoutine)
  ).apId;
  return (
    <div className="selectedRoutine">
      <NameInput id={selectedRoutine} />
      <ActivityPath id={apId} />
      {/* <EffectInput /> */}
    </div>
  );
}

const NameInput = ({ id }) => {
  const dispatch = useDispatch();
  const name = useSelector((state) => selectRoutineById(state, id)).name;

  return (
    <div className="box">
      <label htmlFor="routineName">Routine Name:</label>
      <input
        type="text"
        placeholder="Enter routine name"
        value={name}
        onChange={(e) =>
          dispatch(routineUpdated({ id, changes: { name: e.target.value } }))
        }
      />
    </div>
  );
};

const ActivityPath = ({ id }) => {
  const { condition, activityId, apIds } = useSelector((state) =>
    selectactivityPathById(state, id)
  );

  return (
    <div className="box">
      {condition ? <div>Condition: {condition}</div> : ""}

      <Activity id={activityId} />
      <div className="box">ap ids: {apIds}</div>
    </div>
  );
};

const Activity = ({ id }) => {
  const { type, targetInfoId, value, MAP, damages, effects } = useSelector(
    (state) => selectactivityById(state, id)
  );
  const dispatch = useDispatch();

  const activityTypeOptions = [];
  for (let at in activityTypes) {
    activityTypeOptions.push(<option key={at}>{activityTypes[at]}</option>);
  }
  const MAPOptions = [];
  for (let m in MAPs) {
    MAPOptions.push(<option key={m}>{MAPs[m]}</option>);
  }

  return (
    <div className="box">
      <select
        value={type}
        onChange={(e) =>
          dispatch(activityUpdated({ id, changes: { type: e.target.value } }))
        }
      >
        {activityTypeOptions}
      </select>
      {" +"}
      <input
        type="number"
        value={value}
        onChange={(e) =>
          dispatch(activityUpdated({ id, changes: { value: e.target.value } }))
        }
      />
      {" MAP: "}
      <select
        value={MAP}
        onChange={(e) =>
          dispatch(activityUpdated({ id, changes: { MAP: e.target.value } }))
        }
      >
        {MAPOptions}
      </select>

      <TargetInfo id={targetInfoId} />

      <div className="box">
        {"Damage: "}
        {damages.map((damageId) => (
          <Damage parentId={id} id={damageId} key={damageId} />
        ))}
        <button
          className="add"
          onClick={() => dispatch(damageCreated({ parentId: id }))}
        >
          +
        </button>
      </div>
      <div className="box">Effects: {effects}</div>
    </div>
  );
};

const Damage = ({ parentId, id }) => {
  const {
    condition,
    diceNum,
    diceSize,
    staticDamage,
    type,
    material,
    persistent,
  } = useSelector((state) => selectdamageById(state, id));
  const dispatch = useDispatch();

  const conditionOptions = [];
  for (let dc in dCond) {
    conditionOptions.push(<option key={dc}>{dCond[dc]}</option>);
  }
  const diceNumOptions = [];
  for (let dn in diceNums) {
    diceNumOptions.push(<option key={dn}>{dn}</option>);
  }
  const diceSizeOptions = [];
  for (let ds in diceSizes) {
    diceSizeOptions.push(<option key={ds}>{ds}</option>);
  }
  const damageTypeOptions = [];
  for (let dt in damageTypes) {
    damageTypeOptions.push(<option key={dt}>{damageTypes[dt]}</option>);
  }
  const materialOptions = [];
  for (let m in materials) {
    materialOptions.push(<option key={m}>{materials[m]}</option>);
  }

  return (
    <div className="box">
      <button
        className="delete"
        onClick={(e) => {
          dispatch(damageRemoved({ id, parentId }));
        }}
      >
        -
      </button>
      <select
        value={condition}
        onChange={(e) =>
          dispatch(
            damageUpdated({ id, changes: { condition: e.target.value } })
          )
        }
      >
        {conditionOptions}
      </select>
      <select
        value={diceNum}
        onChange={(e) =>
          dispatch(damageUpdated({ id, changes: { diceNum: e.target.value } }))
        }
      >
        {diceNumOptions}
      </select>
      d
      <select
        value={diceSize}
        onChange={(e) =>
          dispatch(damageUpdated({ id, changes: { diceSize: e.target.value } }))
        }
      >
        {diceSizeOptions}
      </select>
      {" + "}
      <input
        type="number"
        value={staticDamage}
        onChange={(e) =>
          dispatch(
            damageUpdated({ id, changes: { staticDamage: e.target.value } })
          )
        }
      />
      <select
        value={type}
        onChange={(e) => {
          dispatch(damageUpdated({ id, changes: { type: e.target.value } }));
        }}
      >
        {damageTypeOptions}
      </select>
      <select
        value={material}
        onChange={(e) => {
          dispatch(
            damageUpdated({ id, changes: { material: e.target.value } })
          );
        }}
      >
        {materialOptions}
      </select>
      {" Persistent: "}
      <input
        type="checkbox"
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
    </div>
  );
};

const TargetInfo = ({ id }) => {
  const { overrideDefault, type, value, weaknesses } = useSelector((state) =>
    selecttargetInfoById(state, id)
  );
  const dispatch = useDispatch();

  const defenseOptions = [];
  for (let d in defenses) {
    defenseOptions.push(<option key={d}>{defenses[d]}</option>);
  }

  return (
    <div className="box">
      {"Override Target: "}
      <input
        type="checkbox"
        checked={overrideDefault}
        onChange={(e) =>
          dispatch(
            targetInfoUpdated({
              id,
              changes: { overrideDefault: e.target.checked },
            })
          )
        }
      />
      <select
        value={type}
        onChange={(e) => {
          dispatch(
            targetInfoUpdated({ id, changes: { type: e.target.value } })
          );
        }}
      >
        {defenseOptions}
      </select>
      <input
        type="number"
        value={value}
        onChange={(e) =>
          dispatch(
            targetInfoUpdated({ id, changes: { value: e.target.value } })
          )
        }
      />
      {/* <Weaknesses parentId={id} weaknessIds={weaknesses} /> */}
      {" Weakness: "}
      {weaknesses.map((weaknessId) => (
        <Weakness parentId={id} id={weaknessId} key={weaknessId} />
      ))}
      <AddWeakness parentId={id} />
    </div>
  );
};

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

const Weakness = ({ id, parentId }) => {
  // needs to have parent id to remove weakness
  const { type, value } = useSelector((state) => selectweaknessById(state, id));
  const dispatch = useDispatch();

  const updateOrRemoveWeakness = (e) => {
    if (e.target.value === damageTypes.NONE) {
      // remove this weakness
      dispatch(weaknessRemoved({ id, parentId }));
    } else {
      dispatch(weaknessUpdated({ id, changes: { type: e.target.value } }));
    }
  };
  const updateWeaknessValue = (e) => {
    if (!isNaN(e.target.value)) {
      dispatch(weaknessUpdated({ id, changes: { value: e.target.value } }));
    }
  };
  return (
    <span>
      <WeaknessSelect value={type} onChange={updateOrRemoveWeakness} />
      <input type="number" value={value} onChange={updateWeaknessValue} />
    </span>
  );
};

let weaknessId = 0;

const AddWeakness = ({ parentId }) => {
  const dispatch = useDispatch();
  let [weaknessValue, setWeaknessValue] = useState("0");

  // add a Weakness to TargetInfo id
  const addWeakness = (e) => {
    if (e.target.value !== damageTypes.NONE) {
      // need to create a new weakness
      weaknessId++;
      dispatch(
        weaknessCreated({
          id: weaknessId,
          type: e.target.value,
          value: weaknessValue,
          parentId: parentId,
        })
      );
    }
  };

  return (
    <span>
      <WeaknessSelect value={damageTypes.NONE} onChange={addWeakness} />
      <input
        type="number"
        value={weaknessValue}
        onChange={(e) => setWeaknessValue(e.target.value)}
      />
    </span>
  );
};

const WeaknessSelect = ({ value, onChange }) => {
  const options = [];
  for (let dt in damageTypes) {
    options.push(<option key={dt}>{damageTypes[dt]}</option>);
  }
  for (let m in materials) {
    options.push(<option key={m}>{materials[m]}</option>);
  }
  return (
    <span>
      <select value={value} onChange={(e) => onChange(e)}>
        {options}
      </select>
    </span>
  );
};

export default SelectedRoutine;
