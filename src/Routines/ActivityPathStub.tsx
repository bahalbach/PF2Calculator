import React from "react";

import { useAppDispatch, useAppSelector } from "../App/hooks";

// import SendIcon from "@mui/icons-material/Send";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import GavelIcon from "@mui/icons-material/Gavel";
import {
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import { RootState } from "../App/store";
import {
  selectactivityPathById,
  setActivityPath,
  selectSelectedActivityPath,
  selectParentActivityId,
  activityPathRemoved,
} from "./RoutineSlice/routineSlice";
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
  const { parentId, routineId, condition, type, apIds } = useAppSelector(
    (state: RootState) => selectactivityPathById(state, id)!
  );
  const selectedActivityPath = useAppSelector(selectSelectedActivityPath);
  const parentActivityId = useAppSelector(selectParentActivityId);

  const dispatch = useAppDispatch();

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
      <ListItem
        disablePadding
        secondaryAction={
          <IconButton
            edge="end"
            aria-label="delete"
            onClick={() =>
              dispatch(activityPathRemoved({ id, parentId, routineId }))
            }
          >
            <DeleteIcon />
          </IconButton>
        }
      >
        <ListItemButton
          selected={selectedActivityPath === id || parentActivityId === id}
          sx={{ pl: 4 * level + 2 }}
          onClick={() => dispatch(setActivityPath(id))}
        >
          {/* {displayCondition ? "Conditions" : ""} */}
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={type} secondary={level > 0 ? condition : ""} />
        </ListItemButton>
      </ListItem>
      {displayChildren
        ? apIds.map((apId) => (
            <ActivityPathStub key={apId} id={apId} level={level + 1} />
          ))
        : ""}
    </React.Fragment>
  );
};
