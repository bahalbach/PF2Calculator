import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { LevelList } from "./LevelList";
import {
  activityTypes,
  bonusTrends,
  conditions,
  damageTrends,
  damageTypes,
  dCond,
  defenses,
  diceSizes,
  dieTrends,
  effectTypes,
  MAPs,
  materials,
  rollTypes,
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
  effectCreated,
  effectRemoved,
  effectUpdated,
  selecteffectById,
} from "./effectSlice";
import { routineUpdated, selectRoutineById } from "./routineSlice";

const levelOptions = [];
for (let level = 1; level <= 20; level++) {
  levelOptions.push(<option key={level}>{level}</option>);
}

const conditionOptions = [];
for (let c in conditions) {
  conditionOptions.push(<option key={c}>{conditions[c]}</option>);
}
// const defaultActivityOptions = [];
// for (let da in defaultActivities) {
//   defaultActivityOptions.push(
//     <option key={da}>{defaultActivities[da]}</option>
//   );
// }
const bonusTrendOptions = [];
for (let bt in bonusTrends) {
  bonusTrendOptions.push(<option key={bt}>{bonusTrends[bt]}</option>);
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
const rollOptions = [];
for (let rt in rollTypes) {
  rollOptions.push(<option key={rt}>{rollTypes[rt]}</option>);
}

const damageConditionOptions = [];
for (let dc in dCond) {
  damageConditionOptions.push(<option key={dc}>{dCond[dc]}</option>);
}
const dieTrendOptions = [];
for (let dt in dieTrends) {
  dieTrendOptions.push(<option key={dt}>{dieTrends[dt]}</option>);
}
// const diceNumOptions = [];
// for (let dn in diceNums) {
//   diceNumOptions.push(<option key={dn}>{dn}</option>);
// }
const diceSizeOptions = [];
for (let ds in diceSizes) {
  diceSizeOptions.push(<option key={ds}>{ds}</option>);
}
const damageTrendOptions = [];
for (let dt in damageTrends) {
  damageTrendOptions.push(<option key={dt}>{damageTrends[dt]}</option>);
}

const damageTypeOptions = [];
for (let dt in damageTypes) {
  damageTypeOptions.push(<option key={dt}>{damageTypes[dt]}</option>);
}
const materialOptions = [];
for (let m in materials) {
  materialOptions.push(<option key={m}>{materials[m]}</option>);
}
const effectTypeOptions = [];
for (let et in effectTypes) {
  effectTypeOptions.push(<option key={et}>{effectTypes[et]}</option>);
}
const multiplierOptions = [];
for (let m of [0.5, 1, 2]) {
  multiplierOptions.push(<option key={m}>{m}</option>);
}

function SelectedRoutine({ routineId }) {
  // const selectedRoutine = useSelector(selectSelectedRoutine);
  const apIds = useSelector((state) =>
    selectRoutineById(state, routineId)
  ).apIds;
  const dispatch = useDispatch();

  return (
    <div className="selectedRoutine">
      <NameInput id={routineId} />
      {apIds.map((apId) => (
        <ActivityPath
          id={apId}
          routineId={routineId}
          key={apId}
          displayCondition={false}
        />
      ))}
      <button
        className="add"
        onClick={() => dispatch(activityPathCreated({ routineId: routineId }))}
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
    type,
    targetType,

    bonusTrend,
    bonusAdjustments,

    MAP,
    rollType,
    damages,
    effects,
    apIds,
  } = useSelector((state) => selectactivityPathById(state, id));
  const dispatch = useDispatch();

  const bonusLevelList = LevelList(
    "bonusAdjustments",
    dispatch,
    activityPathUpdated,
    id,
    bonusAdjustments
  );

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
            <select
              value={rollType}
              onChange={(e) => {
                dispatch(
                  activityPathUpdated({
                    id,
                    changes: { rollType: e.target.value },
                  })
                );
              }}
            >
              {rollOptions}
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
          </span>
          {" ("}
          <select
            value={bonusTrend}
            onChange={(e) =>
              dispatch(
                activityPathUpdated({
                  id,
                  changes: { bonusTrend: e.target.value },
                })
              )
            }
          >
            {bonusTrendOptions}
          </select>
          {type === activityTypes.SAVE ? "+10" : ""}+{bonusLevelList})
          {type === activityTypes.STRIKE ? (
            <span className="input">
              {" MAP: "}
              <select
                value={MAP}
                onChange={(e) =>
                  dispatch(
                    activityPathUpdated({
                      id,
                      changes: { MAP: e.target.value },
                    })
                  )
                }
              >
                {MAPOptions}
              </select>
            </span>
          ) : (
            ""
          )}
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
        <div className="box">
          {"Effects: "}
          {effects.map((effectId) => (
            <Effect parentId={id} id={effectId} key={effectId} />
          ))}
          <button
            className="add"
            onClick={() => dispatch(effectCreated({ parentId: id }))}
          >
            +
          </button>
        </div>
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
    damageType,
    material,
    persistent,
    multiplier,

    dieTrend,
    dieAdjustments,
    diceSize,
    damageTrend,
    damageAdjustments,
  } = useSelector((state) => selectdamageById(state, id));
  const dispatch = useDispatch();

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
      {": "}
      <div>
        {"("}
        <select
          value={dieTrend}
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
        </select>
        +{dieLevelList}
        )d
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
      </div>
      <div>
        {" + ("}
        <select
          value={damageTrend}
          onChange={(e) =>
            dispatch(
              damageUpdated({
                id,
                changes: { damageTrend: e.target.value },
              })
            )
          }
        >
          {damageTrendOptions}
        </select>
        +{damageLevelList})
      </div>
      {" ("}
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
      {") damage x "}
      <select
        value={multiplier}
        onChange={(e) => {
          dispatch(
            damageUpdated({
              id,
              changes: { multiplier: parseFloat(e.target.value) },
            })
          );
        }}
      >
        {multiplierOptions}
      </select>
    </div>
  );
};

const Effect = ({ parentId, id }) => {
  const { effectCondition, effectType, startLevel, endLevel } = useSelector(
    (state) => selecteffectById(state, id)
  );
  const dispatch = useDispatch();

  return (
    <div className="box">
      <button
        className="delete"
        onClick={(e) => {
          dispatch(effectRemoved({ id, parentId }));
        }}
      >
        -
      </button>
      <select
        value={effectCondition}
        onChange={(e) =>
          dispatch(
            effectUpdated({ id, changes: { effectCondition: e.target.value } })
          )
        }
      >
        {conditionOptions}
      </select>
      <select
        value={effectType}
        onChange={(e) =>
          dispatch(
            effectUpdated({ id, changes: { effectType: e.target.value } })
          )
        }
      >
        {effectTypeOptions}
      </select>
      @
      <select
        value={startLevel}
        onChange={(e) =>
          dispatch(
            effectUpdated({
              id,
              changes: { startLevel: parseInt(e.target.value) },
            })
          )
        }
      >
        {levelOptions}
      </select>
      to
      <select
        value={endLevel}
        onChange={(e) =>
          dispatch(
            effectUpdated({
              id,
              changes: { endLevel: parseInt(e.target.value) },
            })
          )
        }
      >
        {levelOptions}
      </select>
    </div>
  );
};

export default SelectedRoutine;
