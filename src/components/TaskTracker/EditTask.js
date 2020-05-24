import "date-fns";
import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { getTasks, editTask } from "../../_actions/taskTracker_actions";
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  formControl: {
    margin: "dense",
    minWidth: 500,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function EditTask(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [edit, setEdit] = React.useState({
    title: props.task.title,
    description: props.task.description,
    assigned_to: props.task.assigned_to,
    progress: props.task.progress,
    remark: props.task.remark,
  });
  const [startDate, setStartDate] = React.useState(
    new Date(props.task.start_date)
  );
  const [endDate, setEndDate] = React.useState(new Date(props.task.end_date));
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (prop) => (event) => {
    setEdit({ ...edit, [prop]: event.target.value });
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };
  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  var date = new Date().getDate();
  var month = new Date().getMonth() + 1;
  var year = new Date().getFullYear();

  const handleSubmit = () => {
    const taskData = {
      project_id: props.project_id,
      task_id: props.task.id,
      updated_at: year + "-" + month + "-" + date,
      title: edit.title,
      description: edit.description,
      assigned_to: edit.assigned_to,
      progress: edit.progress,
      remark: edit.remark,
      start_date: startDate,
      end_date: endDate,
    };
    editTask(taskData);
    dispatch(getTasks(props.project_id));
    setOpen(false);
  };

  return (
    <div>
      <Button
        aria-label="edit"
        variant="contained"
        color="primary"
        onClick={handleClickOpen}
        fullWidth="true"
      >
        Edit
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit your Task!</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Edit the appropriate fields and submit...!
          </DialogContentText>
          <TextField
            margin="dense"
            id="title"
            label="Title"
            type="text"
            fullWidth
            multiline
            defaultValue={props.task.title}
            onChange={handleChange("title")}
          />
          <TextField
            margin="dense"
            id="description"
            label="Description"
            type="text"
            fullWidth
            multiline
            defaultValue={props.task.description}
            onChange={handleChange("description")}
          />
          {/* <FormControl className={classes.formControl} required>
              <InputLabel>Category</InputLabel>
              <Select onChange={handleChange("category")}>
                {categories.map((category) => (
                  <MenuItem value={category}>{category.category_name}</MenuItem>
                ))}
              </Select>
            </FormControl> */}
            <br/>
          <FormControl className={classes.formControl} fullWidth="true">
            <InputLabel id="demo-simple-select-label">Assigned To</InputLabel>
            <Select
              labelId="Assigned To"
              id="assigned_to"
              value={edit.assigned_to}
              onChange={handleChange("assigned_to")}
            >
              <MenuItem value={10001}>Saman</MenuItem>
              <MenuItem value={10008}>Kamal</MenuItem>
              <MenuItem value={10009}>Nimal</MenuItem>
            </Select>
          </FormControl>
          <MuiPickersUtilsProvider utils={DateFnsUtils} >
              <KeyboardDatePicker
                fullWidth
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="Start Date"
                label="Start Date"
                value={startDate}
                onChange={handleStartDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </MuiPickersUtilsProvider>
            <br/>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                fullWidth
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="End Date"
                label="End Date"
                value={endDate}
                onChange={handleEndDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </MuiPickersUtilsProvider>
            <FormControl className={classes.formControl} fullWidth="true">
            <InputLabel id="demo-simple-select-label1">Progress</InputLabel>
            <Select
              labelId="Progress"
              id="progress"
              value={edit.progress}
              onChange={handleChange("progress")}
            >
              <MenuItem value={"Not Started"}>Not Started</MenuItem>
              <MenuItem value={"In Progress"}>In Progress</MenuItem>
              <MenuItem value={"Completed"}>Completed</MenuItem>
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            id="remark"
            label="Remark"
            type="text"
            fullWidth
            multiline
            defaultValue={props.task.remark}
            onChange={handleChange("remark")}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary" variant="contained">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
