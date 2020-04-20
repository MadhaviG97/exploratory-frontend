import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";

export default function InstitutionList(props) {
  const [state, setState] = React.useState({
    age: "",
  });

  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  return (
    <FormControl variant="outlined" fullWidth>
      <InputLabel htmlFor="outlined-age-native-simple">Age</InputLabel>
      <Select
        native
        value={state.age}
        onChange={handleChange}
        label="Age"
        inputProps={{
          name: "age",
          id: "outlined-age-native-simple",
        }}
      >
        <option aria-label="None" value="" />
        <option value={10}>University of Moratuwa</option>
        <option value={20}>University of Colombo</option>
        <option value={30}>University of Kelaniya</option>
      </Select>
    </FormControl>
  );
}
