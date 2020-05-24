import "date-fns";
import React, { useEffect, useState } from "react";
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
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { getTasks, addTask } from "../../_actions/taskTracker_actions";
import { useDispatch, useSelector } from "react-redux";

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

export default function AddTask(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [startDate, setStartDate] = React.useState(
    new Date("2020-05-01T21:11:54")
  );
  const [endDate, setEndDate] = React.useState(new Date("2020-05-01T21:11:54"));
  const [open, setOpen] = React.useState(false);
  const [task, setTask] = useState({
    title: "",
    description: "",
    assigned_to: "",
    progress: "Not Started",
    remark: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTask({
      title: "",
      description: "",
      assigned_to: "",
      progress: "Not Started",
      remark: "",
    });
  };

  var date = new Date().getDate();
  var month = new Date().getMonth() + 1;
  var year = new Date().getFullYear();

  const handleSubmit = () => {
    const taskData = {
      title: task.title,
      description: task.description,
      assigned_to: task.assigned_to,
      start_date:
        new Date(startDate).getFullYear() +
        "-" +
        (new Date(startDate).getMonth() + 1) +
        "-" +
        new Date(startDate).getDate(),
      end_date:
        new Date(endDate).getFullYear() +
        "-" +
        (new Date(endDate).getMonth() + 1) +
        "-" +
        new Date(endDate).getDate(),
      progress: task.progress,
      remark: task.remark,
      creator_id: user.userData._id,
      project_id: props.project_id,
      created_at: year + "-" + month + "-" + date,
      updated_at: year + "-" + month + "-" + date,
    };
    setOpen(false);
    console.log(taskData);
    dispatch(addTask(taskData));
    setTask({
      title: "",
      description: "",
      assigned_to: "",
      start_date: "",
      end_date: "",
      progress: "Not Started",
      remark: "",
    });
    dispatch(getTasks(props.project_id));
  };

  const handleChange = (prop) => (event) => {
    setTask({ ...task, [prop]: event.target.value });
  };
  const handleStartDateChange = (date) => {
    setStartDate(date);
  };
  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Add new task
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth="true">
        <DialogTitle>Add new task...</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill out the fields below.
          </DialogContentText>

          <form className={classes.formControl} noValidate autoComplete="off">
            {/* <FormControl className={classes.formControl} required>
              <InputLabel>Category</InputLabel>
              <Select onChange={handleChange("category")}>
                {categories.map((category) => (
                  <MenuItem value={category}>{category.category_name}</MenuItem>
                ))}
              </Select>
            </FormControl> */}
            <TextField
              margin="dense"
              fullWidth="true"
              id="Task title"
              label="Task Title"
              className={classes.formControl}
              required
              multiline
              rowsMax={2}
              onChange={handleChange("title")}
            />
            <TextField
              fullWidth="true"
              id="Description"
              label="Description"
              className={classes.formControl}
              multiline
              rowsMax={4}
              onChange={handleChange("description")}
            />
            <FormControl className={classes.formControl} fullWidth>
              <InputLabel id="demo-simple-select-label">Assigned To</InputLabel>
              <Select
                labelId="Assigned To"
                id="assigned_to"
                value={task.assigned_to}
                onChange={handleChange("assigned_to")}
              >
                <MenuItem value={10001}>Saman</MenuItem>
                <MenuItem value={10008}>Kamal</MenuItem>
                <MenuItem value={10009}>Nimal</MenuItem>
              </Select>
            </FormControl>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                fullWidth="true"
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
            <br />
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                fullWidth="true"
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
            <TextField
              fullWidth
              id="Remark"
              label="Remark"
              className={classes.formControl}
              multiline
              rowsMax={4}
              onChange={handleChange("remark")}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary" variant="contained">
            Post
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
