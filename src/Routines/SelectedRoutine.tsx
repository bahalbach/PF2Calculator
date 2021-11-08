import React, { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "../App/hooks";
import {
  emptyActivityPathCreated,
  routineUpdated,
  selectRoutineById,
  setNewActivityParent,
} from "./RoutineSlice/routineSlice";
import { ActivityPathStub } from "./ActivityPathStub";
import { RootState } from "../App/store";
import {
  Button,
  Grid,
  List,
  ListSubheader,
  Paper,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import { activityTypes } from "../Model/types";

function SelectedRoutine({ routineId }: { routineId: number }) {
  // const selectedRoutine = useSelector(selectSelectedRoutine);
  const { name, startLevel, endLevel, description, apIds } = useAppSelector(
    (state: RootState) => selectRoutineById(state, routineId)!
  );
  const dispatch = useAppDispatch();
  let [tempName, setTempName] = useState(name);
  const [tempDescription, setTempDescription] = useState(description);
  let [validLevels, setValidLevels] = useState([startLevel, endLevel]);
  useEffect(() => setTempName(name), [name]);
  useEffect(() => setTempDescription(description), [description]);
  useEffect(
    () => setValidLevels([startLevel, endLevel]),
    [startLevel, endLevel]
  );

  return (
    <Paper>
      <Grid container spacing={{ xs: 1, sm: 2 }} sx={{ my: 2, p: 1 }}>
        <Grid item xs={12} sm={8} md={12} lg={8}>
          <TextField
            fullWidth
            label="Routine Name"
            placeholder="Fighter d8 2 strikes"
            value={tempName}
            onChange={(e) => {
              setTempName(e.target.value);
            }}
            onBlur={() =>
              dispatch(
                routineUpdated({ id: routineId, changes: { name: tempName } })
              )
            }
          />
        </Grid>
        <Grid item xs={12} sm={4} md={12} lg={4} sx={{ px: 2 }}>
          <Typography align="center">
            Valid Levels: {startLevel} to {endLevel}
          </Typography>
          <Slider
            getAriaLabel={() => "Valid levels"}
            value={validLevels}
            min={1}
            max={20}
            marks
            // @ts-ignore
            onChange={(e, nv: number[]) => setValidLevels(nv)}
            onBlur={() =>
              dispatch(
                routineUpdated({
                  id: routineId,
                  changes: {
                    startLevel: validLevels[0],
                    endLevel: validLevels[1],
                  },
                })
              )
            }
            valueLabelDisplay="auto"
            getAriaValueText={(v) => `${v}`}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            multiline
            label="Routine Description"
            placeholder="A Fighter making two strikes with a longsword. Critical Specialization at 5. 1d6 runes at 8 and 15."
            value={tempDescription}
            onChange={(e) => {
              setTempDescription(e.target.value);
            }}
            onBlur={() =>
              dispatch(
                routineUpdated({
                  id: routineId,
                  changes: { description: tempDescription },
                })
              )
            }
          />
        </Grid>
      </Grid>
      {/* <Paper sx={{ my: 2, p: 1 }}> */}
      <List
        id="routine-activity-list"
        subheader={<ListSubheader>Activities</ListSubheader>}
      >
        {apIds.map((apId) => (
          <ActivityPathStub key={apId} id={apId} level={0} />
        ))}
      </List>
      {/* </Paper> */}
      <Grid container spacing={{ xs: 1 }} sx={{ my: 2, p: 1 }}>
        <Grid
          item
          container
          xs={6}
          sm={3}
          md={6}
          lg={3}
          justifyContent="center"
        >
          <Button
            size="small"
            variant="contained"
            onClick={() => dispatch(setNewActivityParent({ routineId }))}
          >
            Create New Activity
          </Button>
        </Grid>
        <Grid
          item
          container
          xs={6}
          sm={3}
          md={6}
          lg={3}
          justifyContent="center"
        >
          <Button
            size="small"
            variant="outlined"
            onClick={() => dispatch(emptyActivityPathCreated({ routineId }))}
          >
            New Empty Activity
          </Button>
        </Grid>
        <Grid
          item
          container
          xs={6}
          sm={3}
          md={6}
          lg={3}
          justifyContent="center"
        >
          <Button
            size="small"
            variant="outlined"
            onClick={() =>
              dispatch(
                emptyActivityPathCreated({
                  routineId,
                  activityType: activityTypes.STRIKE,
                })
              )
            }
          >
            New Martial Strike
          </Button>
        </Grid>
        <Grid
          item
          container
          xs={6}
          sm={3}
          md={6}
          lg={3}
          justifyContent="center"
        >
          <Button
            size="small"
            variant="outlined"
            onClick={() =>
              dispatch(
                emptyActivityPathCreated({
                  routineId,
                  activityType: activityTypes.SAVE,
                })
              )
            }
          >
            New Caster Save
          </Button>
        </Grid>
      </Grid>
      {/* <Button
        variant="outlined"
        onClick={() =>
          dispatch(activityPathCreated({ routineId, isStrike: false }))
        }
      >
        + Save
      </Button> */}
      {/* <EffectInput /> */}
      {/* </div> */}
    </Paper>
  );
}

// const NameInput = ({ id, name: baseName }: { id: number; name: string }) => {
//   const dispatch = useDispatch();
//   let [name, setName] = useState(baseName);
//   useEffect(() => setName(baseName), [baseName]);
//   // const name = useSelector((state) => selectRoutineById(state, id)).name;

//   return (
//     <React.Fragment>
//       <label htmlFor="routineName">Routine Name:</label>
//       <input
//         id="routineName"
//         type="text"
//         placeholder="Enter routine name"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//         onBlur={() => dispatch(routineUpdated({ id, changes: { name } }))}
//       />
//     </React.Fragment>
//   );
// };
// const DescriptionInput = ({
//   id,
//   description: baseDescription,
// }: {
//   id: number;
//   description: string;
// }) => {
//   const dispatch = useDispatch();
//   const [description, setDescription] = useState(baseDescription);
//   useEffect(() => setDescription(baseDescription), [baseDescription]);

//   return (
//     <div>
//       <textarea
//         className="routineDescription"
//         id="routineDescription"
//         placeholder="Enter routine description"
//         value={description}
//         onChange={(e) => setDescription(e.target.value)}
//         onBlur={() =>
//           dispatch(routineUpdated({ id, changes: { description } }))
//         }
//       />
//     </div>
//   );
// };

export default SelectedRoutine;
