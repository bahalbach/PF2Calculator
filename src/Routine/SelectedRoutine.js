import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  activityTypes,
  conditions,
  damageTypes,
  dCond,
  defaultActivities,
  defenses,
  diceNums,
  diceSizes,
  MAPs,
  materials,
} from "../types";
import {
  activityPathCreated,
  activityPathUpdated,
  activityPathRemoved,
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

const conditionOptions = [];
for (let c in conditions) {
  conditionOptions.push(<option key={c}>{conditions[c]}</option>);
}
const defaultActivityOptions = [];
for (let da in defaultActivities) {
  defaultActivityOptions.push(
    <option key={da}>{defaultActivities[da]}</option>
  );
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

const damageConditionOptions = [];
for (let dc in dCond) {
  damageConditionOptions.push(<option key={dc}>{dCond[dc]}</option>);
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
        <ActivityPath
          id={apId}
          routineId={selectedRoutine}
          key={apId}
          displayCondition={false}
        />
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

const ActivityPath = ({ id, parentId, routineId, displayCondition = true }) => {
  const {
    condition,
    level,
    override,
    defaultActivity,
    type,
    targetType,
    value,
    MAP,
    damageCondition,
    diceNum,
    diceSize,
    staticDamage,
    damageType,
    material,
    damages,
    effects,
    apIds,
  } = useSelector((state) => selectactivityPathById(state, id));
  const dispatch = useDispatch();

  return (
    <div className="box">
      {displayCondition ? (
        <div>
          {"Condition: "}
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

      <div className="">
        <div className="flexbox">
          <button
            className="delete"
            onClick={(e) => {
              dispatch(activityPathRemoved({ id, parentId, routineId }));
            }}
          >
            -
          </button>
          <span className="input">
            <label htmlFor="override">{"Override: "}</label>
            <input
              id="override"
              type="checkbox"
              checked={override}
              onChange={(e) =>
                dispatch(
                  activityPathUpdated({
                    id,
                    changes: { override: e.target.checked },
                  })
                )
              }
            />
          </span>
          <span className="input">
            <label htmlFor="Level">{" Level: "}</label>
            <input
              id="Level"
              type="number"
              value={level}
              min={1}
              max={20}
              onChange={(e) => {
                let level = parseInt(e.target.value) || 1;
                if (level > 20) level = 20;
                dispatch(
                  activityPathUpdated({
                    id,
                    changes: {
                      level,
                    },
                  })
                );
              }}
            />
          </span>

          <span className="input">
            {/* <input
              type="checkbox"
              checked={useDefault}
              onChange={(e) =>
                dispatch(
                  activityPathUpdated({
                    id,
                    changes: { useDefault: e.target.checked },
                  })
                )
              }
            /> */}
            <select
              value={defaultActivity}
              onChange={(e) =>
                dispatch(
                  activityPathUpdated({
                    id,
                    changes: { defaultActivity: e.target.value },
                  })
                )
              }
            >
              {defaultActivityOptions}
            </select>
          </span>

          <span className="input">
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
          </span>
          <span className="input">
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
          </span>
          <span className="input">
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
          </span>
        </div>
        <div className="flexbox">
          Damage:
          <select
            value={damageCondition}
            onChange={(e) =>
              dispatch(
                activityPathUpdated({
                  id,
                  changes: { damageCondition: e.target.value },
                })
              )
            }
          >
            {damageConditionOptions}
          </select>
          <select
            value={diceNum}
            onChange={(e) =>
              dispatch(
                activityPathUpdated({
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
                activityPathUpdated({
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
                activityPathUpdated({
                  id,
                  changes: { staticDamage: parseInt(e.target.value) },
                })
              )
            }
          />
          <select
            value={damageType}
            onChange={(e) => {
              dispatch(
                activityPathUpdated({
                  id,
                  changes: { damageType: e.target.value },
                })
              );
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
        </div>
        <div className="box">
          {"Additional Damage: "}
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
          <ActivityPath id={apId} parentId={id} key={apId} />
        ))}
        <button
          className="add"
          onClick={() => dispatch(activityPathCreated({ parentId: id }))}
        >
          +
        </button>
        <button
          className="add"
          onClick={() =>
            dispatch(activityPathCreated({ parentId: id, applyMAP: true }))
          }
        >
          +MAP
        </button>
      </div>
    </div>
  );
};

const Damage = ({ parentId, id }) => {
  const {
    damageCondition,
    diceNum,
    diceSize,
    staticDamage,
    damageType,
    material,
    persistent,
  } = useSelector((state) => selectdamageById(state, id));
  const dispatch = useDispatch();

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
        value={damageCondition}
        onChange={(e) =>
          dispatch(
            damageUpdated({ id, changes: { damageCondition: e.target.value } })
          )
        }
      >
        {damageConditionOptions}
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
        value={damageType}
        onChange={(e) => {
          dispatch(
            damageUpdated({ id, changes: { damageType: e.target.value } })
          );
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
