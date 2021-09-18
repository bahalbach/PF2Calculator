import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  activityPathCreated,
  routineUpdated,
  selectRoutineById,
} from "./routineSlice";
import { ActivityPath } from "./ActivityPath";

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

export default SelectedRoutine;
