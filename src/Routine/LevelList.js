import React from "react";

export const generateEntries = (adjustments) => {
  let currentValue = adjustments[1];
  const entries = [[1, currentValue]];
  for (let level = 2; level <= 20; level++) {
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
  console.log(entries);
  for (let level = 1; level <= 20; level++) {
    if (entries[currentIndex] && entries[currentIndex][0] === level) {
      console.log("here");
      currentValue = entries[currentIndex][1];
      if (!currentValue) currentValue = 0;
      currentIndex++;
    }
    adjustments[level] = currentValue;
  }
  return adjustments;
};

export const adjustmentsFromLevelChange = (entries, index, newLevel) => {
  entries[index] = [newLevel, entries[index][1]];
  return generateAdjustments(entries);
};

export const adjustmentsFromValueChange = (entries, index, newValue) => {
  entries[index] = [entries[index][0], newValue];
  return generateAdjustments(entries);
};

const levelOptions = [];
for (let level = 1; level <= 20; level++) {
  levelOptions.push(<option key={level}>{level}</option>);
}

export const LevelList = (name, dispatch, action, id, adjustments) => {
  const dieEntries = generateEntries(adjustments);

  let dieLevelList = [];
  for (let i = 0; i < dieEntries.length; i++) {
    dieLevelList.push(
      <span className="input" key={i}>
        <select
          value={dieEntries[i][0]}
          onChange={(e) =>
            dispatch(
              action({
                id,
                changes: {
                  [name]: adjustmentsFromLevelChange(
                    dieEntries,
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
        <input
          type="number"
          value={dieEntries[i][1]}
          onChange={(e) =>
            dispatch(
              action({
                id,
                changes: {
                  [name]: adjustmentsFromValueChange(
                    dieEntries,
                    i,
                    parseInt(e.target.value)
                  ),
                },
              })
            )
          }
        />
      </span>
    );
  }
  return dieLevelList;
};
