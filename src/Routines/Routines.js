import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  routineCreated,
  routineRemoved,
  routineUpdated,
  selectAllRoutines,
  selectSelectedRoutine,
  setRoutine,
} from "./routineSlice";

const Routines = () => {
  const routines = useSelector(selectAllRoutines);
  const selectedRoutine = useSelector(selectSelectedRoutine);
  const dispatch = useDispatch();

  const routineOptions = [];
  const routineDisplays = [];
  routines.forEach((routine) => {
    routineOptions.push(
      <option value={routine.id} key={routine.id}>
        {routine.name}
      </option>
    );
    routineDisplays.push(
      <div className="flexbox" key={routine.id}>
        <button
          className="remove"
          onClick={() => dispatch(routineRemoved(routine.id))}
        >
          -
        </button>
        <span
          className={routine.display ? "routineOn" : "routineOff"}
          onClick={() =>
            dispatch(
              routineUpdated({
                id: routine.id,
                changes: { display: !routine.display },
              })
            )
          }
        >
          {routine.name}
        </span>
      </div>
    );
  });

  return (
    <div className="box">
      Selected Routine:
      <select
        value={selectedRoutine}
        onChange={(e) => dispatch(setRoutine(e.target.value))}
      >
        {routineOptions}
      </select>
      <button className="add" onClick={() => dispatch(routineCreated())}>
        +
      </button>
      <div className="routines">{routineDisplays}</div>
    </div>
  );
};

export default Routines;
