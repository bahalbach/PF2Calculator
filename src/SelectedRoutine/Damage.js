import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { LevelList } from "./LevelList";
import { damageRemoved, damageUpdated, selectdamageById } from "./damageSlice";
import {
  damageConditionOptions,
  damageTrendOptions,
  damageTypeOptions,
  diceSizeOptions,
  dieTrendOptions,
  materialOptions,
  multiplierOptions,
} from "../Model/options";
import { damageTrends } from "../Model/types";

export const Damage = ({ parentId, id }) => {
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

  const damageTrendList = damageTrend.map((dt, index) => {
    return (
      <select
        key={index} // no stable id
        value={dt}
        onChange={(e) => {
          let newdt = damageTrend.slice();
          if (e.target.value === damageTrends.NONE) {
            newdt.splice(index, 1);
          } else {
            newdt[index] = e.target.value;
          }
          dispatch(
            damageUpdated({
              id,
              changes: { damageTrend: newdt },
            })
          );
        }}
      >
        {damageTrendOptions}
      </select>
    );
  });

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
        <span className="input">
          {"Dice: ("}
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
          +{dieLevelList}) d
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
        </span>
        <div>
          <span className="input">
            {"Static: ("}
            {damageTrendList}
            <button
              key="addButton"
              className="add"
              onClick={() => {
                let newdt = damageTrend.slice();
                newdt.push(damageTrends.NONE);
                dispatch(
                  damageUpdated({
                    id,
                    changes: {
                      damageTrend: newdt,
                    },
                  })
                );
              }}
            >
              +
            </button>
            +{damageLevelList})
          </span>
        </div>
      </div>
      <span className="input">
        {" Type: "}
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
      </span>{" "}
      <span className="input">
        {" x "}
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
      </span>
    </div>
  );
};
