import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { LevelList } from "./LevelList";
import { damageCreated } from "./routineSlice";
import {
  activityTypeOptions,
  profTrendOptions,
  conditionOptions,
  defenseOptions,
  MAPOptions,
  rollOptions,
  statTrendOptions,
  itemBTrendOptions,
} from "../Model/options";
import {
  activityPathCreated,
  activityPathRemoved,
  activityPathUpdated,
  selectactivityPathById,
} from "./routineSlice";
import { activityTypes } from "../Model/types";
import { Damage } from "./Damage";
import { Effect } from "./Effect";
import { effectCreated } from "./routineSlice";

export const ActivityPath = ({
  id,
  parentId,
  routineId,
  displayCondition = true,
}) => {
  const {
    condition,

    rollType,
    type,
    profTrend,
    statTrend,
    itemTrend,
    bonusAdjustments,
    MAP,
    targetType,

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
    <div className="ImportantBox">
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
          </span>{" "}
          <span className="input">
            {type === activityTypes.SAVE ? "DC: (10 + " : "Bonus: ("}
            <select
              value={profTrend}
              onChange={(e) =>
                dispatch(
                  activityPathUpdated({
                    id,
                    changes: { profTrend: e.target.value },
                  })
                )
              }
            >
              {profTrendOptions}
            </select>
            <select
              value={statTrend}
              onChange={(e) =>
                dispatch(
                  activityPathUpdated({
                    id,
                    changes: { statTrend: e.target.value },
                  })
                )
              }
            >
              {statTrendOptions}
            </select>
            <select
              value={itemTrend}
              onChange={(e) =>
                dispatch(
                  activityPathUpdated({
                    id,
                    changes: { itemTrend: e.target.value },
                  })
                )
              }
            >
              {itemBTrendOptions}
            </select>
            +{bonusLevelList})
          </span>
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
          onClick={() =>
            dispatch(
              activityPathCreated({
                parentId: id,
                isStrike: true,
                applyMAP: true,
              })
            )
          }
        >
          + Strike
        </button>
        <button
          className="add"
          onClick={() =>
            dispatch(activityPathCreated({ parentId: id, isStrike: false }))
          }
        >
          + Save
        </button>
      </div>
    </div>
  );
};
