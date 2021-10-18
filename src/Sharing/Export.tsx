import React, { RefObject, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  importRoutine,
  selectSelectedRoutineObject,
} from "../Routines/routineSlice";
// import { useSelector } from "react-redux";

const ImportExport = () => {
  const routine = useSelector(selectSelectedRoutineObject);
  const textAreaRef: RefObject<HTMLTextAreaElement> = useRef(null);
  const [textValue, setTextValue] = useState("");
  const dispatch = useDispatch();

  const tryToAddRoutine = () => {
    dispatch(importRoutine(textValue));
  };
  const paste = () => {
    setTextValue(JSON.stringify(routine));
  };
  const copy = () => {
    if (textAreaRef.current) {
      textAreaRef.current.select();
      textAreaRef!.current.setSelectionRange(0, 99999); /* For mobile devices */
      navigator.clipboard.writeText(textAreaRef.current.value);
      // document.execCommand("copy");
    }
  };
  return (
    <div className="box">
      Import and Export Here:
      <button onClick={tryToAddRoutine}>Import</button>
      <button onClick={paste}>Export</button>
      <button onClick={copy}>Copy</button>
      <div>
        <textarea
          className="export"
          ref={textAreaRef}
          value={textValue}
          onChange={(e) => setTextValue(e.target.value)}
        />
      </div>
    </div>
  );
};

export default ImportExport;
