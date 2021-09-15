import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  conditionOptions,
  effectTypeOptions,
  levelOptions,
} from "../Model/options";
import { effectRemoved, effectUpdated, selecteffectById } from "./effectSlice";

export const Effect = ({ parentId, id }) => {
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
