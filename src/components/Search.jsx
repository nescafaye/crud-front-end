import React from "react";
import { TextField, InputAdornment } from "@mui/material";
import { HiSearch as SearchIcon } from "react-icons/hi";

const Search = () => {
  return (
    <TextField
      id="search-bar"
      className="inputRounded"
      variant="outlined"
      placeholder="Search..."
      size="small"
      sx={{
        backgroundColor: "#191925",
        borderRadius: "10px",
        borderWidth: "0.5px",
        fontSize: "12px",
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "#424248",
        },
        "&:hover:not(.Mui-disabled)": {
          backgroundColor: "#050514",
          transition: "all",
          transitionDuration: "0.3s",
        },
        "&:hover:not(.Mui-disabled) .MuiOutlinedInput-notchedOutline": {
          borderColor: "#424248",
        },
        "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: "#424248",
        },
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon style={{ fill: "blue", fontSize: 18 }} />
          </InputAdornment>
        ),
        style: {
          fontSize: 15,
          color: "white",
        },
      }}
    />
  );
};

export default Search;
