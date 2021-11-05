import React from "react";

// import SendIcon from "@mui/icons-material/Send";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import GavelIcon from "@mui/icons-material/Gavel";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import {
  selectactivityPathById,
  setActivityPath,
  selectSelectedActivityPath,
  selectParentActivityId,
} from "./routineSlice";
import { activityTypes } from "../Model/types";

export const ActivityPathStub = ({
  id,
  level,
  displayChildren = true,
}: {
  id: number;
  level: number;
  displayChildren?: boolean;
}) => {
  const { parentId, condition, type, apIds } = useSelector(
    (state: RootState) => selectactivityPathById(state, id)!
  );
  const selectedActivityPath = useSelector(selectSelectedActivityPath);
  const parentActivityId = useSelector(selectParentActivityId);

  const dispatch = useDispatch();

  let icon = <GavelIcon />;
  switch (type) {
    case activityTypes.SAVE:
      icon = <AutoFixHighIcon />;
      break;
    default:
      break;
  }

  return (
    <React.Fragment>
      <ListItemButton
        selected={selectedActivityPath === id || parentActivityId === id}
        sx={{ pl: 4 * level + 2 }}
        onClick={() => dispatch(setActivityPath(id))}
      >
        {/* {displayCondition ? "Conditions" : ""} */}
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText
          primary={type}
          secondary={parentId !== undefined ? condition : ""}
        />
      </ListItemButton>
      {displayChildren
        ? apIds.map((apId) => (
            <ActivityPathStub key={apId} id={apId} level={level + 1} />
          ))
        : ""}
    </React.Fragment>
  );
};
