import React, { useState } from "react";
import { graphTypeOptions, levelOptions } from "../Model/options";
import { graphTypes } from "../Model/types";

import useGenerateGraphs from "./useGenerateGraphs";

const Display = () => {
  // evaluates routines and displays appropriate graphs

  const [addPersistent, setAddPersistent] = useState(false);
  const [graphType, setGraphType] = useState<string>(graphTypes.DISTRIBUTION);
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

  return (
    <div className="box">
      {"Graph Type: "}
      <select value={graphType} onChange={(e) => setGraphType(e.target.value)}>
        {graphTypeOptions}
      </select>
      (
      <select
        value={displayLevel}
        onChange={(e) => setDisplayLevel(parseInt(e.target.value))}
      >
        {levelOptions}
      </select>
      ){" Show persistent damage: "}
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
