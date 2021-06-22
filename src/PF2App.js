import React from "react";
// import { useSelector } from "react-redux";
// import update from "immutability-helper";

// //import { useSelector, useDispatch } from 'react-redux';
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

import TargetInput from "./Target/TargetInput";
import Display from "./Display/Display";
// import { selectTarget, selectLevel } from "./Target/targetSlice";

import SelectedRoutine from "./Routine/SelectedRoutine";
import Routines from "./Routines";
import Export from "./Export";

import "./PF2App.css";
import { useSelector } from "react-redux";
import { selectSelectedRoutine } from "./Routine/routineSlice";

// function DisplayOutput(props) {
//   // props: effect, target
//   const target = useSelector(selectTarget);
//   const effect = useSelector(selectCurrentEffect);
//   return (
//     <div className="Display">
//       <CollapsableInput
//         description={
//           "Expected Damage: " + calculateExpectedDamage(effect, target)
//         }
//         listInput=""
//       />
//     </div>
//   );
// }

function PF2App(props) {
  const selectedRoutine = useSelector(selectSelectedRoutine);

  return (
    <div className="PF2App">
      <TargetInput id={0} />
      <Display />
      <Routines />
      {selectedRoutine !== undefined ? (
        <SelectedRoutine routineId={selectedRoutine} />
      ) : (
        ""
      )}
      {/* <SelectedRoutine /> */}

      <Export />
    </div>
  );
}

export default PF2App;
