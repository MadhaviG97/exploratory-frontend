import React from "react";
import { TextField, Checkbox } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

export default function TagForm(props) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const [selectedItems, setSelectedItems] = React.useState([...props.tags]);
  const loading = open && options.length === 0;

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  const handleChange = (event, value) => {
    setSelectedItems(value);
    console.log(value);
    props.onChange(value);
  };

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      await axios
        .post("/project/get-all-tags", {})
        .then((res) => {
          if (active) {
            setOptions(
              res.data.map((tag) => {
                return {
                  tag_id: tag.id,
                  title: tag.title,
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
      id="tags"
      fullWidth
      multiple
      disableClearable
      disabled={props.disabled}
      limitTags={3}
      // defaultValue={props.collaborators}
      value={selectedItems}
      onChange={handleChange}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      getOptionSelected={(option, value) => option.tag_id === value.tag_id}
      getOptionLabel={(option) => option.title}
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
          {option.title}
        </React.Fragment>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Tags"
          variant="outlined"
          helperText={props.helperTextTags}
          error={props.errorTags}
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
