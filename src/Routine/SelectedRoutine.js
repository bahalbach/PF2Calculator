import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  activityTypes,
  conditions,
  damageTypes,
  dCond,
  defenses,
  diceNums,
  diceSizes,
  MAPs,
  materials,
} from "../types";
import {
  activityPathCreated,
  activityPathUpdated,
  selectactivityPathById,
} from "./activityPathSlice";

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

function SelectedRoutine() {
  const selectedRoutine = useSelector(selectSelectedRoutine);
  const apIds = useSelector((state) =>
    selectRoutineById(state, selectedRoutine)
  ).apIds;
  const dispatch = useDispatch();

  return (
    <div className="selectedRoutine">
      <NameInput id={selectedRoutine} />
      {apIds.map((apId) => (
        <ActivityPath id={apId} key={apId} />
      ))}
      <button
        className="add"
        onClick={() =>
          dispatch(activityPathCreated({ routineId: selectedRoutine }))
        }
      >
        +
      </button>
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
        id="routineName"
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
  const { condition, type, targetType, value, MAP, damages, effects, apIds } =
    useSelector((state) => selectactivityPathById(state, id));
  const dispatch = useDispatch();

  const conditionOptions = [];
  for (let c in conditions) {
    conditionOptions.push(<option key={c}>{conditions[c]}</option>);
  }
  const activityTypeOptions = [];
  for (let at in activityTypes) {
    activityTypeOptions.push(<option key={at}>{activityTypes[at]}</option>);
  }
  const MAPOptions = [];
  for (let m in MAPs) {
    MAPOptions.push(<option key={m}>{MAPs[m]}</option>);
  }
  const defenseOptions = [];
  for (let d in defenses) {
    defenseOptions.push(<option key={d}>{defenses[d]}</option>);
  }

  return (
    <div className="box">
      {condition ? (
        <div>
          Condition:
          <select
            value={condition}
            onChange={(e) =>
              dispatch(
                activityPathUpdated({
                  id,
                  changes: { condition: e.target.value },
                })
              )
            }
          >
            {conditionOptions}
          </select>
        </div>
      ) : (
        ""
      )}

      <div className="box">
        <select
          value={type}
          onChange={(e) =>
            dispatch(
              activityPathUpdated({ id, changes: { type: e.target.value } })
            )
          }
        >
          {activityTypeOptions}
        </select>
        {type === activityTypes.STRIKE ? " +" : " DC: "}
        <input
          type="number"
          value={value ? value : 0}
          onChange={(e) =>
            dispatch(
              activityPathUpdated({
                id,
                changes: { value: parseInt(e.target.value) },
              })
            )
          }
        />
        {" MAP: "}
        <select
          value={MAP}
          onChange={(e) =>
            dispatch(
              activityPathUpdated({ id, changes: { MAP: e.target.value } })
            )
          }
        >
          {MAPOptions}
        </select>

        {" VS: "}
        <select
          value={targetType}
          onChange={(e) => {
            dispatch(
              activityPathUpdated({
                id,
                changes: { targetType: e.target.value },
              })
            );
          }}
        >
          {defenseOptions}
        </select>

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

      <div className="box">
        {apIds.map((apId) => (
          <ActivityPath id={apId} key={apId} />
        ))}
        <button
          className="add"
          onClick={() => dispatch(activityPathCreated({ parentId: id }))}
        >
          +
        </button>
      </div>
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
          dispatch(
            damageUpdated({
              id,
              changes: { diceNum: parseInt(e.target.value) },
            })
          )
        }
      >
        {diceNumOptions}
      </select>
      d
      <select
        value={diceSize}
        onChange={(e) =>
          dispatch(
            damageUpdated({
              id,
              changes: { diceSize: parseInt(e.target.value) },
            })
          )
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
            damageUpdated({
              id,
              changes: { staticDamage: parseInt(e.target.value) },
            })
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

export default SelectedRoutine;
