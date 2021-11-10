import React, { useState } from "react";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  List,
  ListSubheader,
  Paper,
  Select,
  SelectChangeEvent,
  Tooltip,
  Typography,
} from "@mui/material";

type Props = {
  title: string;
  label: string;
  value: any;
  onChange: (e: SelectChangeEvent) => void;
  children: JSX.Element[];
};

const TooltipSelect = ({ title, label, value, onChange, children }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <Tooltip
      title={title}
      open={open}
      onFocus={() => {
        console.log("focus1");
        setOpen(false);
      }}
    >
      <FormControl
        size="small"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(false)}
      >
        <InputLabel>{label}</InputLabel>
        <Select label={label} value={value} onChange={onChange}>
          {children}
        </Select>
      </FormControl>
    </Tooltip>
  );
};

export { TooltipSelect };
