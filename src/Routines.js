import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  routineCreated,
  selectAllRoutines,
  selectSelectedRoutine,
  setRoutine,
} from "./Routine/routineSlice";

const Routines = () => {
  const routines = useSelector(selectAllRoutines);
  const selectedRoutine = useSelector(selectSelectedRoutine);
  const dispatch = useDispatch();

  const routineOptions = [];
  routines.forEach((routine) => {
    routineOptions.push(
      <option value={routine.id} key={routine.id}>
        {routine.name}
      </option>
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
    </div>
  );
};

export default Routines;
