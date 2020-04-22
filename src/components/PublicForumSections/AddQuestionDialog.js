import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

const useStyles1 = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 500,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function FormDialog() {
  const classes = useStyles();
  const classes1 = useStyles1();
  const [value, setValue] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange1 = (event1) => {
    setValue(event1.target.value);
  };

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Ask a Question
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Raise your Question</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill out the details below.Try to provide appropriate details
            for the question so it can be answered easier.
          </DialogContentText>

          <form className={classes.root} noValidate autoComplete="off">

          <FormControl className={classes1.formControl} required>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={category}
                onChange={handleChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Science {"&"} Technology</MenuItem>
                <MenuItem value={20}>Mathematics</MenuItem>
                <MenuItem value={30}>Arts</MenuItem>
                <MenuItem value={40}>Commerse</MenuItem>
              </Select>
            </FormControl>
            <br />    
    
            <TextField
              className={classes1.formControl}
              required
              id="standard-required"
              label="Question Title"
            />
            <br />

            <TextField
              id="standard-multiline-flexible"
              label="Description"
              multiline
              rowsMax={4}
              value={value}
              onChange={handleChange1}
              className={classes1.formControl}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" variant="contained">
            Post
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
