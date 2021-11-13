import React, { useState } from "react";

import { useAppDispatch, useAppSelector } from "../../App/hooks";

import { LevelList } from "./LevelList";
import {
  activityPathContinued,
  damageCreated,
  emptyActivityPathCreated,
  setNewActivityParent,
} from "../RoutineSlice/routineSlice";
import {
  activityTypeOptions,
  profTrendOptions,
  conditionOptions,
  defenseOptions,
  MAPOptions,
  rollOptions,
  statTrendOptions,
  itemBTrendOptions,
} from "../../Model/options";
import {
  activityPathRemoved,
  activityPathUpdated,
  selectactivityPathById,
} from "../RoutineSlice/routineSlice";
import {
  activityTypes,
  ItemTrend,
  MAP,
  ProfTrend,
  rollTypes,
  StatTrend,
} from "../../Model/types";
import { Damage } from "./Damage";
import { Effect } from "./Effect";
import { effectCreated } from "../RoutineSlice/routineSlice";
import { RootState } from "../../App/store";
import {
  Button,
  ButtonBase,
  Collapse,
  FormControl,
  Grid,
  InputLabel,
  List,
  ListItemButton,
  ListSubheader,
  Paper,
  Select,
  Slider,
  Tooltip,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { ActivityPathStub } from "../ActivityPathStub";
import { TooltipSelect } from "../../TooltipSelect";
import { selectRoutineLevel } from "../../Display/targetSlice";
import {
  itemTrendValues,
  MAPvalues,
  profTrendValues,
  statTrendValues,
} from "../../Model/defaults";
import { Adjustment } from "../RoutineSlice/RoutineTypes";
import { Box } from "@mui/system";

export const ActivityPath = ({
  id,
  level = 0,
}: {
  id: number;
  level?: number;
}) => {
  const {
    parentId,
    routineId,
    condition,

    type,
    MAP,

    damages,
    effects,
    apIds,
  } = useAppSelector((state: RootState) => selectactivityPathById(state, id)!);

  const dispatch = useAppDispatch();

  const [showContent, setShowContent] = useState(false);

  const showMAP = type !== activityTypes.SAVE && MAPvalues[MAP] !== 0;

  return (
    <React.Fragment>
      <Paper sx={{ my: 2, p: 1, ml: level * 2 }}>
        <Grid container spacing={{ xs: 1, sm: 2 }} alignItems="center">
          <Grid item xs="auto">
            <ListItemButton onClick={() => setShowContent(!showContent)}>
              <Typography variant="h6">Activity</Typography>
            </ListItemButton>
          </Grid>
          <Grid item xs="auto">
            <Typography>
              {type} {showMAP ? MAPvalues[MAP] : ""}
            </Typography>
          </Grid>
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
              <TooltipSelect
                title='Depending on the roll of the parent activity, should this activity happen. For example: to add another strike only when you hit with the previous one, have the second strike be a child of the first with the condition "Success or Better"'
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
              </TooltipSelect>
            </Grid>
          ) : (
            ""
          )}
        </Grid>
        <Collapse in={showContent} mountOnEnter>
          <Roll id={id} />
          {/* <List subheader={<ListSubheader>Damages</ListSubheader>}> */}

          {damages.map((damageId) => (
            <Damage parentId={id} id={damageId} key={damageId} />
          ))}
          {/* </List> */}
          <Button
            variant="outlined"
            size="small"
            onClick={() => dispatch(damageCreated({ parentId: id }))}
          >
            Add Damage
          </Button>

          {effects.map((effectId) => (
            <Effect parentId={id} id={effectId} key={effectId} />
          ))}
          <Button
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

          <Grid container spacing={{ xs: 1 }} sx={{ my: 2, p: 1 }}>
            <Grid item container xs={6} justifyContent="center">
              <Button
                variant="contained"
                onClick={() => {
                  window.location.href = "#routine-activity-list";
                  dispatch(
                    activityPathContinued({
                      parentId: id,
                    })
                  );
                }}
              >
                Continue Attack
              </Button>
            </Grid>
            <Grid item container xs={6} justifyContent="center">
              <Button
                variant="outlined"
                onClick={() => {
                  window.location.href = "#routine-activity-list";
                  dispatch(setNewActivityParent({ parentId: id }));
                }}
              >
                New Child Activity
              </Button>
            </Grid>
          </Grid>
        </Collapse>
      </Paper>
      {apIds.map((apId) => (
        <ActivityPath key={apId} id={apId} level={level + 1} />
      ))}
    </React.Fragment>
  );
};

const Roll = ({ id }: { id: number }) => {
  const {
    rollType,
    type,
    profTrend,
    statTrend,
    itemTrend,
    bonusAdjustments,
    MAP,
    targetType,
  } = useAppSelector((state: RootState) => selectactivityPathById(state, id)!);

  const dispatch = useAppDispatch();

  const [showContent, setShowContent] = useState(false);

  let isSave = type === activityTypes.SAVE;

  const bonusLevelList = LevelList(
    "bonusAdjustments",
    dispatch,
    activityPathUpdated,
    id,
    bonusAdjustments
  );

  return (
    <React.Fragment>
      <RollBonusDisplay
        rollInfo={{
          isSave,
          profTrend,
          statTrend,
          itemTrend,
          MAP,
          bonusAdjustments,
        }}
        onClick={() => setShowContent(!showContent)}
      />
      <Collapse in={showContent}>
        <Box
          sx={{
            p: 1,
            mb: 1,
            "&:hover": { bgcolor: "rgb(50,50,50,.05)" },
          }}
        >
          <Grid container spacing={{ xs: 1, sm: 2 }} sx={{}}>
            <Grid item>
              <TooltipSelect
                title="Advantage is rolling twice and taking the higher roll, disadvantage is taking the lower"
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
              </TooltipSelect>
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
              <TooltipSelect
                title="An increase in proficiency (+2) is applied at each level in ()"
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
              </TooltipSelect>
            </Grid>
            <Grid item>
              <TooltipSelect
                title="Bonuses from the listed ability score are applied at the appropriate levels. An ability score starts at the first value and is increased at levels 5, 10, 15, and 20 or until it reaches the second value listed. 'apex' means a bonus from an apex item is added to that score at the level in ()"
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
              </TooltipSelect>
            </Grid>
            <Grid item>
              <TooltipSelect
                title="Item bonuses are applied at the levels in ()."
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
              </TooltipSelect>
            </Grid>
            {bonusLevelList}
            {!isSave ? (
              <Grid item>
                <TooltipSelect
                  title="The multiple attack penalty that is applied to this attack."
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
                </TooltipSelect>
              </Grid>
            ) : (
              ""
            )}
            <Grid item>
              <TooltipSelect
                title="What defense is targeted"
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
              </TooltipSelect>
            </Grid>
          </Grid>
        </Box>
      </Collapse>
    </React.Fragment>
  );
};

interface PropsType {
  rollInfo: {
    isSave: boolean;
    MAP: MAP;
    profTrend: ProfTrend;
    statTrend: StatTrend;
    itemTrend: ItemTrend;
    bonusAdjustments: Adjustment;
  };
  onClick: any;
}
const RollBonusDisplay = ({
  rollInfo: { isSave, MAP, profTrend, statTrend, itemTrend, bonusAdjustments },
  onClick,
}: PropsType) => {
  const [level, setLevel] = useState(20);
  // const {isSave, MAP, profTrend, statTrend, itemTrend, bonusAdjustments} = rollInfo;
  let totalBonus = 0;

  // const updateLevel = (newLevel: number) => {
  //   setLevel(newLevel);
  totalBonus = isSave ? 10 : MAPvalues[MAP];
  totalBonus += profTrendValues[profTrend][level];
  totalBonus += statTrendValues[statTrend][level];
  totalBonus += itemTrendValues[itemTrend][level];
  totalBonus += bonusAdjustments[level];

  // updateLevel(1);

  return (
    <Grid container columnSpacing={{ xs: 2 }} alignItems="center">
      <Grid item xs="auto">
        <ListItemButton onClick={onClick}>
          <Typography variant="h6">{"Roll "}</Typography>
        </ListItemButton>
      </Grid>
      <Grid item sx={{ ml: -2, mt: 1, width: 100 }}>
        <Slider
          size="small"
          value={level}
          min={1}
          max={20}
          marks
          // @ts-ignore
          onChange={(_, nv) => setLevel(nv)}
          valueLabelDisplay="auto"
          // getAriaValueText={(v) => `${v}`}
        />
      </Grid>
      <Grid item>
        <Typography>
          {(isSave ? "DC " : " +") +
            totalBonus.toString() +
            " at level " +
            level.toString()}
        </Typography>
      </Grid>
    </Grid>
  );
};
