import React from "react";
import { OutlinedInput } from "@mui/material";

const InputField = (props) => {
  const { field, placeholder, index, size, rows, type, sx, multiline, disabled, enter, leave } = props;
  return (
    <OutlinedInput
      {...field}
      placeholder={placeholder || `Item ${index + 1}`}
      size={size}
      rows={rows}
      type={type}
      sx={{bgcolor: "#191925", color: "whitesmoke", width: "100%"}}
      onMouseEnter={enter}
      onMouseLeave={leave}
      multiline={multiline}
      disabled={disabled}
    />
  );
};

export default InputField;
