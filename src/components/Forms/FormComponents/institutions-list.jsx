import React from "react";
import { FormControl, MenuItem, Select, InputLabel } from "@material-ui/core";

export default function institutionList(props) {
  return (
    <FormControl variant="outlined" className={props.formControl}>
      <InputLabel id="demo-simple-select-outlined-label">Country</InputLabel>
      <Select
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        label="Country"
      >
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </Select>
    </FormControl>
  );
}
