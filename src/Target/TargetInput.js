import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selecttargetById, targetUpdated } from "./targetSlice";
import { damageTypes, defenses, materials } from "../types";
import {
  selectweaknessById,
  weaknessCreated,
  weaknessRemoved,
  weaknessUpdated,
} from "./weaknessSlice";

function TargetInput({ id }) {
  const {
    name,
    level,
    [defenses.AC]: AC,
    [defenses.FORT]: Fort,
    [defenses.REF]: Ref,
    [defenses.WILL]: Will,
    [defenses.PER]: Perception,
    flatfooted,
    weaknesses,
  } = useSelector((state) => selecttargetById(state, 0));
  const dispatch = useDispatch();

  // name, level, ac, fort, ref, will, perception, resistances/weaknesses
  return (
    <div className="box flexbox">
      <span className="input">
        <label htmlFor="targetName">{"Target Name: "}</label>
        <input
          id="targetName"
          type="text"
          placeholder="Enter Target name"
          value={name}
          onChange={(e) =>
            dispatch(targetUpdated({ id, changes: { name: e.target.value } }))
          }
        />
      </span>

      <span className="input">
        <label htmlFor="AC">{" AC: "}</label>
        <input
          id="AC"
          type="number"
          value={AC}
          onChange={(e) =>
            dispatch(
              targetUpdated({
                id,
                changes: { [defenses.AC]: parseInt(e.target.value) },
              })
            )
          }
        />
      </span>

      <span className="input">
        <label htmlFor="Fort">{" Fort: "}</label>
        <input
          id="Fort"
          type="number"
          value={Fort}
          onChange={(e) =>
            dispatch(
              targetUpdated({
                id,
                changes: { [defenses.FORT]: parseInt(e.target.value) },
              })
            )
          }
        />
      </span>

      <span className="input">
        <label htmlFor="Ref">{" Ref: "}</label>
        <input
          id="Ref"
          type="number"
          value={Ref}
          onChange={(e) =>
            dispatch(
              targetUpdated({
                id,
                changes: { [defenses.REF]: parseInt(e.target.value) },
              })
            )
          }
        />
      </span>

      <span className="input">
        <label htmlFor="Will">{" Will: "}</label>
        <input
          id="Will"
          type="number"
          value={Will}
          onChange={(e) =>
            dispatch(
              targetUpdated({
                id,
                changes: { [defenses.WILL]: parseInt(e.target.value) },
              })
            )
          }
        />
      </span>

      <span className="input">
        <label htmlFor="Perception">{" Perception: "}</label>
        <input
          id="Perception"
          type="number"
          value={Perception}
          onChange={(e) =>
            dispatch(
              targetUpdated({
                id,
                changes: { [defenses.PER]: parseInt(e.target.value) },
              })
            )
          }
        />
      </span>

      <span className="input">
        <label htmlFor="Flatfooted">{" Flatfooted: "}</label>
        <input
          id="Flatfooted"
          type="checkbox"
          checked={flatfooted}
          onChange={(e) =>
            dispatch(
              targetUpdated({ id, changes: { flatfooted: e.target.checked } })
            )
          }
        />
      </span>

      <div className="box flexbox">
        {" Resistance/Weakness: "}
        {weaknesses.map((weaknessId) => (
          <Weakness parentId={id} id={weaknessId} key={weaknessId} />
        ))}
        <AddWeakness parentId={id} />
      </div>
    </div>
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
      dispatch(
        weaknessUpdated({ id, changes: { value: parseInt(e.target.value) } })
      );
    }
  };
  return (
    <span className="input">
      <WeaknessSelect value={type} onChange={updateOrRemoveWeakness} />
      <input type="number" value={value} onChange={updateWeaknessValue} />
    </span>
  );
};

let weaknessId = 0;

const AddWeakness = ({ parentId }) => {
  const dispatch = useDispatch();
  let [weaknessValue, setWeaknessValue] = useState(0);

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
    <span className="input">
      <WeaknessSelect value={damageTypes.NONE} onChange={addWeakness} />
      <input
        type="number"
        value={weaknessValue}
        onChange={(e) => setWeaknessValue(parseInt(e.target.value))}
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
    if (materials[m] === materials.NONE) continue;
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

export default TargetInput;
