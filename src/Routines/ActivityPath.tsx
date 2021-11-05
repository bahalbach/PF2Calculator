import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { LevelList } from "./LevelList";
import {
  activityPathContinued,
  damageCreated,
  setNewActivityParent,
} from "./routineSlice";
import {
  activityTypeOptions,
  profTrendOptions,
  conditionOptions,
  defenseOptions,
  MAPOptions,
  rollOptions,
  statTrendOptions,
  itemBTrendOptions,
} from "../Model/options";
import {
  activityPathRemoved,
  activityPathUpdated,
  selectactivityPathById,
} from "./routineSlice";
import { activityTypes } from "../Model/types";
import { Damage } from "./Damage";
import { Effect } from "./Effect";
import { effectCreated } from "./routineSlice";
import { RootState } from "../store";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  List,
  ListSubheader,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { ActivityPathStub } from "./ActivityPathStub";

export const ActivityPath = ({ id }: { id: number }) => {
  const {
    parentId,
    routineId,
    condition,

    rollType,
    type,
    profTrend,
    statTrend,
    itemTrend,
    bonusAdjustments,
    MAP,
    targetType,

    damages,
    effects,
    apIds,
  } = useSelector((state: RootState) => selectactivityPathById(state, id)!);
  const dispatch = useDispatch();

  const bonusLevelList = LevelList(
    "bonusAdjustments",
    dispatch,
    activityPathUpdated,
    id,
    bonusAdjustments
  );

  return (
    <Paper sx={{ my: 2, p: 1 }}>
      <Grid container spacing={{ xs: 1, sm: 2 }} sx={{ my: 0 }}>
        <Grid item xs="auto">
          <Button
            variant="outlined"
            size="small"
            startIcon={<DeleteIcon />}
            onClick={(e) => {
              dispatch(activityPathRemoved({ id, parentId, routineId }));
            }}
          >
            Delete
          </Button>
        </Grid>
        {parentId !== undefined ? (
          <Grid item xs>
            <FormControl size="small" fullWidth>
              <InputLabel id="condition-input">Condition</InputLabel>
              <Select
                labelId="condition-input"
                id="condition"
                value={condition}
                label="Condition"
                onChange={(e) =>
                  dispatch(
                    activityPathUpdated({
                      id,
                      changes: { condition: e.target.value },
                    })
                  )
                }
              >
                {conditionOptions}
              </Select>
            </FormControl>
          </Grid>
        ) : (
          ""
        )}
      </Grid>
      <Typography variant="h6" gutterBottom>
        Roll
      </Typography>
      <Grid container spacing={{ xs: 1, sm: 2 }} sx={{ my: 2 }}>
        <Grid item>
          <FormControl size="small">
            <InputLabel id="roll-type-input">Roll Type</InputLabel>
            <Select
              labelId="roll-type-input"
              label="Roll Type"
              value={rollType}
              onChange={(e) => {
                dispatch(
                  activityPathUpdated({
                    id,
                    changes: { rollType: e.target.value },
                  })
                );
              }}
            >
              {rollOptions}
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl size="small">
            <InputLabel id="activity-type-input">Activity Type</InputLabel>
            <Select
              labelId="activity-type-input"
              label="Activity Type"
              value={type}
              onChange={(e) => {
                dispatch(
                  activityPathUpdated({
                    id,
                    changes: { type: e.target.value },
                  })
                );
              }}
            >
              {activityTypeOptions}
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl size="small">
            <InputLabel id="proficiency-input">Proficiency</InputLabel>
            <Select
              labelId="proficiency-type-input"
              label="Proficiency"
              value={profTrend}
              onChange={(e) => {
                dispatch(
                  activityPathUpdated({
                    id,
                    changes: { profTrend: e.target.value },
                  })
                );
              }}
            >
              {profTrendOptions}
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl size="small">
            <InputLabel id="ability-score-input">Ability Score</InputLabel>
            <Select
              labelId="ability-score-input"
              label="Ability Score"
              value={statTrend}
              onChange={(e) => {
                dispatch(
                  activityPathUpdated({
                    id,
                    changes: { statTrend: e.target.value },
                  })
                );
              }}
            >
              {statTrendOptions}
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl size="small">
            <InputLabel id="item-bonus-input">Item Bonus</InputLabel>
            <Select
              labelId="item-bonus-input"
              label="Item Bonus"
              value={itemTrend}
              onChange={(e) => {
                dispatch(
                  activityPathUpdated({
                    id,
                    changes: { itemTrend: e.target.value },
                  })
                );
              }}
            >
              {itemBTrendOptions}
            </Select>
          </FormControl>
        </Grid>
        {bonusLevelList}
        {type !== activityTypes.SAVE ? (
          <Grid item>
            <FormControl size="small">
              <InputLabel id="MAP-input">MAP</InputLabel>
              <Select
                labelId="MAP-input"
                label="MAP"
                value={MAP}
                onChange={(e) => {
                  dispatch(
                    activityPathUpdated({
                      id,
                      changes: { MAP: e.target.value },
                    })
                  );
                }}
              >
                {MAPOptions}
              </Select>
            </FormControl>
          </Grid>
        ) : (
          ""
        )}
        <Grid item>
          <FormControl size="small">
            <InputLabel id="defense-input">Target Defense</InputLabel>
            <Select
              labelId="defense-input"
              label="Target Defense"
              value={targetType}
              onChange={(e) => {
                dispatch(
                  activityPathUpdated({
                    id,
                    changes: { targetType: e.target.value },
                  })
                );
              }}
            >
              {defenseOptions}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {/* <List subheader={<ListSubheader>Damages</ListSubheader>}> */}
      <Typography variant="h6" gutterBottom>
        Damages
      </Typography>
      {damages.map((damageId) => (
        <Damage parentId={id} id={damageId} key={damageId} />
      ))}
      {/* </List> */}
      <Button
        sx={{ mb: 3 }}
        variant="outlined"
        size="small"
        onClick={() => dispatch(damageCreated({ parentId: id }))}
      >
        Add Damage
      </Button>
      <Typography variant="h6" gutterBottom>
        Effects
      </Typography>
      {effects.map((effectId) => (
        <Effect parentId={id} id={effectId} key={effectId} />
      ))}
      <Button
        sx={{ mb: 3 }}
        variant="outlined"
        size="small"
        onClick={() => dispatch(effectCreated({ parentId: id }))}
      >
        Add Effect
      </Button>

      <List subheader={<ListSubheader>Child Activities</ListSubheader>}>
        {apIds.map((apId) => (
          <ActivityPathStub
            key={apId}
            id={apId}
            level={0}
            displayChildren={false}
          />
        ))}
      </List>

      {type === activityTypes.STRIKE ? (
        <Button
          variant="outlined"
          onClick={() => {
            window.location.href = "#routine-activity-list";
            dispatch(
              activityPathContinued({
                parentId: id,
                isStrike: true,
                applyMAP: true,
              })
            );
          }}
        >
          + Next Strike
        </Button>
      ) : (
        ""
      )}
      <Button
        variant="outlined"
        onClick={(event) => {
          window.location.href = "#routine-activity-list";
          dispatch(setNewActivityParent({ parentId: id }));
        }}
      >
        New Child Activity
      </Button>

      {/* <div className="box">
        {apIds.map((apId) => (
          <ActivityPath id={apId} key={apId} />
        ))}
        <button
          className="add"
          onClick={() =>
            dispatch(
              activityPathCreated({
                parentId: id,
                isStrike: true,
                applyMAP: true,
              })
            )
          }
        >
          + Strike
        </button>
        <button
          className="add"
          onClick={() =>
            dispatch(activityPathCreated({ parentId: id, isStrike: false }))
          }
        >
          + Save
        </button>
      </div> */}
    </Paper>
  );
};
