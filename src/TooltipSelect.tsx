import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
  Tooltip,
} from "@mui/material";

type Props = {
  title: string;
  label: string;
  value: any;
  onChange: (e: SelectChangeEvent) => void;
  children: JSX.Element[];
  fullWidth?: boolean;
};

const TooltipSelect = ({
  title,
  label,
  value,
  onChange,
  children,
  fullWidth = false,
}: Props) => {
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
        fullWidth={fullWidth}
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
