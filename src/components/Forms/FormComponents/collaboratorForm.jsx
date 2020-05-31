import React from "react";
import { TextField, Checkbox } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import ListItemCol from "./ListItemCol";
import { useSelector } from "react-redux";

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

export default function Asynchronous(props) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const [selectedItems, setSelectedItems] = React.useState([
    ...props.collaborators,
  ]);
  const loading = open && options.length === 0;

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  const admins = useSelector((state) => state.project).admins;
  const logged_in_user = useSelector((state) => state.user);
  const handleChange = async (event, value) => {
    await setSelectedItems(value);
    console.log(value);
    props.onChange(value);
  };

  const filterAdmin = (users, admin) => {
    var new_users = users.filter(
      (user) => admin[0].researcher_id !== user.researcher_id
    );
    return new_users;
  };

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      await axios
        .post("/researcher/get-all-users", {})
        .then(async (res) => {
          console.log(res.data);
          if (active) {
            var without_admin =
              (await admins) === undefined
                ? filterAdmin(res.data, [logged_in_user.userData])
                : filterAdmin(res.data, admins);

            setOptions(
              without_admin.map((user) => {
                return {
                  first_name: user.first_name,
                  last_name: user.last_name,
                  id: user.researcher_id,
                  institution: user.institution_name,
                  profile_picture: user.profile_picture,
                  isAdmin: 0,
                  email: user.researcher_email,
                };
              })
            );
          }
        })
        .catch((err) => console.log(err.message));
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Autocomplete
      id="asynchronous-demo"
      fullWidth
      multiple
      disableClearable
      disabled={props.disabled}
      limitTags={3}
      defaultValue={props.collaborators}
      value={selectedItems}
      onChange={handleChange}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      getOptionSelected={(option, value) => option.id === value.id}
      getOptionLabel={(option) => option.first_name}
      options={options}
      loading={loading}
      renderOption={(option, { selected }) => (
        <React.Fragment>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
            color="primary"
          />
          {/* {option.first_name} */}
          <ListItemCol
            first_name={option.first_name}
            last_name={option.last_name}
            institution={option.institution}
            profile_picture={option.profile_picture}
          />
        </React.Fragment>
      )}
      renderInput={(params) => (
        <TextField
          helperText={props.helperTextCollaborators}
          error={props.errorCollaborators}
          {...params}
          label="Collaborators"
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}
