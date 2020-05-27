import React, { useState } from "react";

// material-ui
import { makeStyles } from "@material-ui/core/styles";
import { Box, InputAdornment, TextField, Button } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
  input: {
    display: "none",
  },
  btnUpload: {
    marginRight: theme.spacing(1),
  },
}));

export default function FileUploadButton(props) {
  const classes = useStyles();

  const [uploadFile, setUploadFile] = useState({ name: "" });

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    console.log(file);
    setUploadFile(file);
  };

  const handleFileRemove = () => {
    setUploadFile({ name: "" });
  };

  return (
    <Box>
      <input
        className={classes.input}
        id="contained-button-file"
        type="file"
        accept="application/pdf"
        onChange={(e) => {
          handleFileUpload(e);
        }}
      />
      <label htmlFor="contained-button-file" className={classes.btnUpload}>
        <Button
          variant="contained"
          color="primary"
          component="span"
          className="btnUpload"
        >
          Choose file
        </Button>
      </label>

      <TextField
        value={uploadFile.name}
        // error={props.error}
        // helperText={props.errorMessage}
        InputProps={{
          readOnly: true,
          endAdornment: (
            <InputAdornment position="end">
              <CloseIcon
                fontSize="small"
                onClick={handleFileRemove}
                style={{ cursor: "pointer" }}
              />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
}
