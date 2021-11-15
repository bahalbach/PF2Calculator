import React, { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "../App/hooks";
import { selecttargetById, targetUpdated } from "./targetSlice";
// import { damageTypes } from "../Model/types";
// import {
//   selectweaknessById,
//   Weakness,
//   weaknessCreated,
//   weaknessRemoved,
//   weaknessUpdated,
// } from "./weaknessSlice";
// import { EntityId } from "@reduxjs/toolkit";
import { RootState } from "../App/store";
import { weaknessOptions } from "../Model/options";
import {
  FormControl,
  InputLabel,
  Select,
  Grid,
  TextField,
  Slider,
  Typography,
  SelectChangeEvent,
  Tooltip,
} from "@mui/material";
import { Box } from "@mui/system";
import {
  selectweaknessById,
  Weakness,
  weaknessCreated,
  weaknessRemoved,
  weaknessUpdated,
} from "./weaknessSlice";
import { damageTypes } from "../Model/types";

const SingleLevelInput = () => {
  const id = 0;
  const {
    routineLevel,
    targetLevel,
    overrideAC,
    overrideFort,
    overrideRef,
    overrideWill,
    overridePer,

    weaknesses,
  } = useAppSelector((state: RootState) => selecttargetById(state, id)!);

  const [AC, setAC] = useState(overrideAC.toString());
  const [Fort, setFort] = useState(overrideFort.toString());
  const [Ref, setRef] = useState(overrideRef.toString());
  const [Will, setWill] = useState(overrideWill.toString());
  const [Per, setPer] = useState(overridePer.toString());

  useEffect(() => {
    setAC(overrideAC.toString());
    setFort(overrideFort.toString());
    setRef(overrideRef.toString());
    setWill(overrideWill.toString());
    setPer(overridePer.toString());
  }, [overrideAC, overrideFort, overrideRef, overrideWill, overridePer]);

  const dispatch = useAppDispatch();

  // const [showContent, setShowContent] = useState(false);

  return (
    <React.Fragment>
      <Grid
        container
        spacing={{ xs: 1, sm: 2 }}
        sx={{ my: 1, p: 1 }}
        alignItems="center"
      >
        <Grid item xs={6} container justifyContent="center">
          <Typography id="routine-level">Level: {routineLevel}</Typography>

          <Box sx={{ px: 2, width: 1 }}>
            <Slider
              aria-labelledby="routine-level"
              valueLabelDisplay="auto"
              value={routineLevel}
              step={1}
              min={1}
              max={20}
              marks
              onChange={(_, nv) => {
                let newTargetLevel = Number(nv) + (targetLevel - routineLevel);
                newTargetLevel = Math.min(24, Math.max(-1, newTargetLevel));
                dispatch(
                  targetUpdated({
                    id,
                    changes: {
                      routineLevel: nv,
                      targetLevel: newTargetLevel,
                    },
                  })
                );
              }}
            />
          </Box>
        </Grid>

        <Grid item xs={6} container justifyContent="center">
          <Typography id="target-level">Target Level: {targetLevel}</Typography>
          <Box sx={{ px: 2, width: 1 }}>
            <Slider
              aria-labelledby="target-level"
              valueLabelDisplay="auto"
              value={targetLevel}
              step={1}
              min={-1}
              max={24}
              marks
              onChange={(e, nv) => {
                dispatch(
                  targetUpdated({
                    id,
                    changes: {
                      targetLevel: nv,
                    },
                  })
                );
              }}
            />
          </Box>
        </Grid>

        {/* <Grid item xs="auto">
          <ListItemButton onClick={() => setShowContent(!showContent)}>
            <Typography variant="h6">Target</Typography>
          </ListItemButton>
        </Grid>
        <Grid item xs container justifyContent="center">
          <Typography>{`${AC}/${Fort}/${Ref}/${Will}/${Per}`}</Typography>
        </Grid> */}
      </Grid>
      {/* <Collapse in={showContent}> */}
      <Grid container spacing={{ xs: 1, sm: 2 }} justifyContent="center">
        <Grid item xs={4} sm={2}>
          <TextField
            fullWidth
            label="AC"
            value={AC}
            onChange={(e) => {
              setAC(e.target.value);
              e.target.focus();
            }}
            onBlur={() => {
              let newVal = parseInt(AC);
              setAC(newVal.toString());
              dispatch(
                targetUpdated({
                  id,
                  changes: {
                    overrideAC: newVal,
                  },
                })
              );
            }}
            inputProps={{
              step: 1,
              min: 0,
              max: 100,
              type: "number",
            }}
          />
        </Grid>
        <Grid item xs={4} sm={2}>
          <TextField
            fullWidth
            label="Fort"
            value={Fort}
            onChange={(e) => {
              setFort(e.target.value);
              e.target.focus();
            }}
            onBlur={() => {
              let newVal = parseInt(Fort);
              setFort(newVal.toString());
              dispatch(
                targetUpdated({
                  id,
                  changes: {
                    overrideFort: newVal,
                  },
                })
              );
            }}
            inputProps={{
              step: 1,
              min: 0,
              max: 100,
              type: "number",
            }}
          />
        </Grid>
        <Grid item xs={4} sm={2}>
          <TextField
            fullWidth
            label="Ref"
            value={Ref}
            onChange={(e) => {
              setRef(e.target.value);
              e.target.focus();
            }}
            onBlur={() => {
              let newVal = parseInt(Ref);
              setRef(newVal.toString());
              dispatch(
                targetUpdated({
                  id,
                  changes: {
                    overrideRef: newVal,
                  },
                })
              );
            }}
            inputProps={{
              step: 1,
              min: 0,
              max: 100,
              type: "number",
            }}
          />
        </Grid>
        <Grid item xs={4} sm={2}>
          <TextField
            fullWidth
            label="Will"
            value={Will}
            onChange={(e) => {
              setWill(e.target.value);
              e.target.focus();
            }}
            onBlur={() => {
              let newVal = parseInt(Will);
              setWill(newVal.toString());
              dispatch(
                targetUpdated({
                  id,
                  changes: {
                    overrideWill: newVal,
                  },
                })
              );
            }}
            inputProps={{
              step: 1,
              min: 0,
              max: 100,
              type: "number",
            }}
          />
        </Grid>
        <Grid item xs={4} sm={2}>
          <TextField
            fullWidth
            label="Perception"
            value={Per}
            onChange={(e) => {
              setPer(e.target.value);
              e.target.focus();
            }}
            onBlur={() => {
              let newVal = parseInt(Per);
              setPer(newVal.toString());
              dispatch(
                targetUpdated({
                  id,
                  changes: {
                    overridePer: newVal,
                  },
                })
              );
            }}
            inputProps={{
              step: 1,
              min: 0,
              max: 100,
              type: "number",
            }}
          />
        </Grid>
      </Grid>
      <Grid container spacing={{ xs: 1, sm: 2 }} sx={{ my: 1, p: 1 }}>
        <Grid item container alignItems="center" xs="auto">
          <Typography>Resistance/Weakness: </Typography>
        </Grid>
        {weaknesses.map((weaknessId) => (
          <WeaknessInput parentId={id} id={weaknessId} key={weaknessId} />
        ))}
        <AddWeakness parentId={id} />
      </Grid>
      {/* </Collapse> */}
    </React.Fragment>
  );
};

export { SingleLevelInput };

const WeaknessInput = ({ id, parentId }: { id: number; parentId: number }) => {
  // needs to have parent id to remove weakness
  const { type, value } = useAppSelector((state: RootState) =>
    selectweaknessById(state, id)
  )!;
  const [tempVal, setTempVal] = useState(value.toString());
  const dispatch = useAppDispatch();

  const updateOrRemoveWeakness = (e: SelectChangeEvent) => {
    if (e?.target?.value === damageTypes.NONE) {
      // remove this weakness
      dispatch(weaknessRemoved({ id, parentId }));
    } else {
      dispatch(
        weaknessUpdated({
          id,
          changes: { type: e.target.value as Weakness["type"] },
        })
      );
    }
  };

  return (
    <Grid item>
      <WeaknessSelect value={type} onChange={updateOrRemoveWeakness} />
      <Tooltip title="Positive numbers are resistances. Negative numbers are weaknesses.">
        <TextField
          size="small"
          label="Value"
          value={tempVal}
          sx={{ width: "9ch" }}
          onChange={(e) => {
            setTempVal(e.target.value);
            e.target.focus();
          }}
          onBlur={() => {
            let newVal = parseInt(tempVal);
            if (Number.isNaN(newVal)) newVal = 0;
            setTempVal(newVal.toString());
            dispatch(weaknessUpdated({ id, changes: { value: newVal } }));
          }}
          inputProps={{
            step: 1,
            min: -100,
            max: 100,
            type: "number",
          }}
        />
      </Tooltip>
    </Grid>
  );
};

const AddWeakness = ({ parentId }: { parentId: number }) => {
  const dispatch = useAppDispatch();
  let [tempVal, setTempVal] = useState("0");

  // add a Weakness to TargetInfo id
  const addWeakness = (e: SelectChangeEvent) => {
    if (e.target.value !== damageTypes.NONE) {
      // need to create a new weakness
      let value = Number(tempVal);
      if (Number.isNaN(value)) value = 0;
      dispatch(
        weaknessCreated({
          type: e.target.value,
          value: value,
          parentId: parentId,
        })
      );
    }
  };

  return (
    <Grid item>
      <WeaknessSelect value={damageTypes.NONE} onChange={addWeakness} />
      <Tooltip title="Positive numbers are resistances. Negative numbers are weaknesses.">
        <TextField
          size="small"
          label="Value"
          value={tempVal}
          sx={{ width: "9ch" }}
          onChange={(e) => {
            setTempVal(e.target.value);
            // e.target.focus();
          }}
          inputProps={{
            step: 1,
            min: -100,
            max: 100,
            type: "number",
          }}
        />
      </Tooltip>
    </Grid>
  );
};

const WeaknessSelect = ({
  value,
  onChange,
}: {
  value: Weakness["type"];
  onChange: (e: SelectChangeEvent) => void;
}) => {
  return (
    <FormControl size="small">
      <InputLabel>Type</InputLabel>
      <Select label="Type" value={value} onChange={(e) => onChange(e)}>
        {weaknessOptions}
      </Select>
    </FormControl>
  );
};
