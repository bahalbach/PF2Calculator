import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  activityPathCreated,
  routineUpdated,
  selectRoutineById,
} from "./routineSlice";
import { levelOptions } from "../Model/options";
import { ActivityPath } from "./ActivityPath";
import { RootState } from "../store";

function SelectedRoutine({ routineId }: { routineId: number }) {
  // const selectedRoutine = useSelector(selectSelectedRoutine);
  const { name, startLevel, endLevel, description, apIds } = useSelector(
    (state: RootState) => selectRoutineById(state, routineId)!
  );
  const dispatch = useDispatch();

  return (
    <div className="selectedRoutine">
      <div className="box">
        <div>
          <NameInput id={routineId} name={name} />
          <span className="input">
            @
            <select
              value={startLevel}
              onChange={(e) =>
                dispatch(
                  routineUpdated({
                    id: routineId,
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
                  routineUpdated({
                    id: routineId,
                    changes: { endLevel: parseInt(e.target.value) },
                  })
                )
              }
            >
              {levelOptions}
            </select>
          </span>
        </div>
        <DescriptionInput id={routineId} description={description} />
      </div>
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
        onClick={() =>
          dispatch(activityPathCreated({ routineId, isStrike: true }))
        }
      >
        + Strike
      </button>
      <button
        className="add"
        onClick={() =>
          dispatch(activityPathCreated({ routineId, isStrike: false }))
        }
      >
        + Save
      </button>
      {/* <EffectInput /> */}
    </div>
  );
}

const NameInput = ({ id, name: baseName }: { id: number; name: string }) => {
  const dispatch = useDispatch();
  let [name, setName] = useState(baseName);
  useEffect(() => setName(baseName), [baseName]);
  // const name = useSelector((state) => selectRoutineById(state, id)).name;

  return (
    <React.Fragment>
      <label htmlFor="routineName">Routine Name:</label>
      <input
        id="routineName"
        type="text"
        placeholder="Enter routine name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onBlur={() => dispatch(routineUpdated({ id, changes: { name } }))}
      />
    </React.Fragment>
  );
};
const DescriptionInput = ({
  id,
  description: baseDescription,
}: {
  id: number;
  description: string;
}) => {
  const dispatch = useDispatch();
  const [description, setDescription] = useState(baseDescription);
  useEffect(() => setDescription(baseDescription), [baseDescription]);

  return (
    <div>
      <textarea
        className="routineDescription"
        id="routineDescription"
        placeholder="Enter routine description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        onBlur={() =>
          dispatch(routineUpdated({ id, changes: { description } }))
        }
      />
    </div>
  );
};

export default SelectedRoutine;
