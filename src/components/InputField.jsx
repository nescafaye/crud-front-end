import React from "react";
import { OutlinedInput } from "@mui/material";

const InputField = (props) => {
  const { field, placeholder, index, size, rows, type, sx, multiline, disabled } = props;
  return (
    <OutlinedInput
      {...field}
      placeholder={placeholder || `Item ${index + 1}`}
      size={size}
      rows={rows}
      type={type}
      sx={sx}
      multiline={multiline}
      disabled={disabled}
    />
  );
};

export default InputField;
