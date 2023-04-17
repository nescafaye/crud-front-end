import React from "react";
import { OutlinedInput } from "@mui/material";
import { useForm } from "react-hook-form";

const InputField = (props) => {

  const { field, placeholder, index, size, rows, type, sx, multiline, disabled, fieldName, error, helperText, } = props;

  const { formState: { errors } = {} } = useForm({});

  return (
    <div className="flex flex-col w-full gap-1">
      <OutlinedInput 
        {...field}
        placeholder={placeholder || `Item ${index + 1}`}
        size={size}
        rows={rows}
        type={type}
        sx={{bgcolor: "#191925",  color: "whitesmoke", width: "100%", borderRadius: "10px",}}
        multiline={multiline}
        disabled={disabled}
        error={Boolean(error)}
      />
      <small className="text-red-500">{error && errors[fieldName].message}</small>
    </div>
  );
};

export default InputField;
