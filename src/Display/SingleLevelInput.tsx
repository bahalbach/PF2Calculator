import React, { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "../App/hooks";
import { selecttargetById, Target, targetUpdated } from "./targetSlice";
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
import {
  ACOptions,
  makeOptions,
  SaveOptions,
  weaknessOptions,
} from "../Model/options";
import {
  FormControl,
  InputLabel,
  Select,
  Grid,
  Paper,
  TextField,
  FormControlLabel,
  Switch,
  Slider,
  Typography,
  SelectChangeEvent,
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
    persistentMultiplier,
    flatfooted,
    percentSelectedRoutine,

    graphType,
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
  }, [overrideAC]);

  const dispatch = useAppDispatch();

  return (
    <Grid
      container
      columns={{ xs: 10 }}
      spacing={{ xs: 1, sm: 2 }}
      sx={{ my: 1, p: 1 }}
    >
      <Grid item xs={5}>
        <Box sx={{ px: 2 }}>
          <Typography>Level: {routineLevel}</Typography>
          <Slider
            // aria-label="Always visible"
            value={routineLevel}
            // getAriaValueText={(v) => `${v}`}
            // valueLabelDisplay="on"
            step={1}
            min={1}
            max={20}
            marks
            onChange={(e, nv) => {
              dispatch(
                targetUpdated({
                  id,
                  changes: {
                    routineLevel: nv,
                  },
                })
              );
            }}
          />
        </Box>
      </Grid>

      <Grid item xs={5}>
        <Box sx={{ px: 2 }}>
          <Typography>Target Level: {targetLevel}</Typography>
          <Slider
            // aria-label="Always visible"
            value={targetLevel}
            // getAriaValueText={(v) => `${v}`}
            // valueLabelDisplay="on"
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

      <Grid item xs={2}>
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
        />
      </Grid>
      <Grid item xs={2}>
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
        />
      </Grid>
      <Grid item xs={2}>
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
        />
      </Grid>
      <Grid item xs={2}>
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
        />
      </Grid>
      <Grid item xs={2}>
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
        />
      </Grid>
      <Grid item container alignItems="center">
        <Typography>Resistance/Weakness: </Typography>
      </Grid>
      {weaknesses.map((weaknessId) => (
        <WeaknessInput parentId={id} id={weaknessId} key={weaknessId} />
      ))}
      <AddWeakness parentId={id} />
    </Grid>
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
      <TextField
        size="small"
        label="Value"
        value={tempVal}
        sx={{ width: "7ch" }}
        onChange={(e) => {
          setTempVal(e.target.value);
          e.target.focus();
        }}
        onBlur={() => {
          let newVal = parseInt(tempVal);
          setTempVal(newVal.toString());
          dispatch(weaknessUpdated({ id, changes: { value: newVal } }));
        }}
      />
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
      dispatch(
        weaknessCreated({
          type: e.target.value,
          value: tempVal,
          parentId: parentId,
        })
      );
    }
  };

  return (
    <Grid item>
      <WeaknessSelect value={damageTypes.NONE} onChange={addWeakness} />
      <TextField
        size="small"
        label="Value"
        value={tempVal}
        sx={{ width: "7ch" }}
        onChange={(e) => {
          setTempVal(e.target.value);
          e.target.focus();
        }}
      />
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
