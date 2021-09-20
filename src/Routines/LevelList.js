import React, { useEffect, useState } from "react";
import { levelOptions } from "../Model/options";

export const generateEntries = (adjustments) => {
  let currentValue = 0;
  const entries = [];
  for (let level = 1; level <= 20; level++) {
    if (currentValue !== adjustments[level]) {
      currentValue = adjustments[level];
      entries.push([level, currentValue]);
    }
  }
  return entries;
};

const generateAdjustments = (entries) => {
  const adjustments = {};
  let currentValue = 0;
  let currentIndex = 0;
  // console.log(entries);
  for (let level = 1; level <= 20; level++) {
    if (entries[currentIndex] && entries[currentIndex][0] === level) {
      // console.log("here");
      currentValue = parseInt(entries[currentIndex][1]);
      if (!currentValue) currentValue = 0;
      currentIndex++;
    }
    adjustments[level] = currentValue;
  }
  return adjustments;
};

export const adjustmentsFromLevelChange = (entries, index, newLevel) => {
  entries[index] = [newLevel, entries[index][1]];
  entries.sort((a, b) => a[0] - b[0]);
  return generateAdjustments(entries);
};

export const adjustmentsFromValueChange = (entries, index, newValue) => {
  entries[index] = [entries[index][0], newValue];
  return generateAdjustments(entries);
};

export const adjustmentsFromNewEntry = (entries) => {
  let lastValue = entries.length > 0 ? entries[entries.length - 1] : [0, 0];
  entries.push([lastValue[0] + 1, lastValue[1] + 1]);
  return generateAdjustments(entries);
};

export const LevelList = (name, dispatch, action, id, adjustments) => {
  const baseEntries = generateEntries(adjustments);
  let [entries, setEntries] = useState(baseEntries);
  let be = JSON.stringify(baseEntries);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setEntries(baseEntries), [be]);
  let levelList = [];

  for (let i = 0; i < entries.length; i++) {
    levelList.push(
      <span className="input" key={i}>
        @
        <select
          value={entries[i][0]}
          onChange={(e) =>
            dispatch(
              action({
                id,
                changes: {
                  [name]: adjustmentsFromLevelChange(
                    entries,
                    i,
                    parseInt(e.target.value)
                  ),
                },
              })
            )
          }
        >
          {levelOptions}
        </select>
        +
        <input
          type="number"
          value={entries[i][1]}
          onChange={(e) => {
            let newEntries = entries.slice();
            newEntries[i][1] = e.target.value;
            setEntries(newEntries);
            e.target.focus();
          }}
          onBlur={(e) =>
            dispatch(
              action({
                id,
                changes: {
                  [name]: generateAdjustments(entries),
                },
              })
            )
          }
        />
      </span>
    );
  }
  levelList.push(
    <button
      key="addButton"
      className="add"
      onClick={() =>
        dispatch(
          action({
            id,
            changes: {
              [name]: adjustmentsFromNewEntry(entries),
            },
          })
        )
      }
    >
      +
    </button>
  );
  return levelList;
};
