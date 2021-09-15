import React from "react";
import ReactGA from "react-ga4";

import TargetInput from "./Target/TargetInput";
import Display from "./Display/Display";
import SelectedRoutine from "./SelectedRoutine/SelectedRoutine";
import Routines from "./Routines/Routines";
import Export from "./Export";

import "./PF2App.css";
import { useSelector } from "react-redux";
import { selectSelectedRoutine } from "./Routines/routineSlice";

// Initialize google analytics
ReactGA.initialize("G-JR2YK097BG");

function PF2App(props) {
  const selectedRoutine = useSelector(selectSelectedRoutine);
  ReactGA.send("pageview");

  return (
    <div className="PF2App">
      <TargetInput id={0} />
      <Display />
      <Routines />
      {selectedRoutine !== undefined ? (
        <SelectedRoutine routineId={selectedRoutine} />
      ) : (
        ""
      )}
      <Export />
    </div>
  );
}

export default PF2App;
