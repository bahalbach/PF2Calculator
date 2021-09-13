import React, { useState } from "react";
import { graphTypes } from "../types";

import useGenerateGraphs from "./useGenerateGraphs";

const Display = () => {
  // evaluates routines and displays appropriate graphs

  const [addPersistent, setAddPersistent] = useState(false);
  const [graphType, setGraphType] = useState(graphTypes.DISTRIBUTION);
  const [displayLevel, setDisplayLevel] = useState(1);
  const {
    expectedDamages,
    expectedPersistentDamages,
    damageChart,
    persistentDamageChart,
    byLevelDamageChart,
    byLevelPerDamageChart,
  } = useGenerateGraphs(graphType, displayLevel);
  // const [perMulti, setPerMulti] = useState(2);

  const graphTypeOptions = [];
  for (let gt in graphTypes) {
    graphTypeOptions.push(<option key={gt}>{graphTypes[gt]}</option>);
  }
  const displayLevelOptions = [];
  for (let i = 1; i <= 20; i++) {
    displayLevelOptions.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }

  return (
    <div className="box">
      {"Graph Type: "}
      <select value={graphType} onChange={(e) => setGraphType(e.target.value)}>
        {graphTypeOptions}
      </select>
      {graphType === graphTypes.BYLEVEL ? (
        ""
      ) : (
        <select
          value={displayLevel}
          onChange={(e) => setDisplayLevel(e.target.value)}
        >
          {displayLevelOptions}
        </select>
      )}
      {" Show persistent damage: "}
      <input
        type="checkbox"
        checked={addPersistent}
        onChange={(e) => setAddPersistent(e.target.checked)}
      />
      {/* , persistent damage multiplier:
      <input
        type="number"
        value={perMulti ? perMulti : 0}
        onChange={(e) => setPerMulti(e.target.valueAsNumber)}
      /> */}
      <div>
        Expected Damage:
        {expectedDamages}
      </div>
      {damageChart}
      {byLevelDamageChart}
      {!addPersistent ? (
        ""
      ) : (
        <div>
          <div>
            Expected Persistent Damage:
            {expectedPersistentDamages}
          </div>
          {persistentDamageChart}
          {byLevelPerDamageChart}
        </div>
      )}
    </div>
  );
};

export default Display;
