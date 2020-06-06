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
import Typography from "@material-ui/core/Typography";
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
import { useForm, Controller } from "react-hook-form";

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
  const collaborators = useSelector((state) => state.task_tracker.collaborators);
  const [startDate, setStartDate] = React.useState(
    new Date("2020-05-28T21:11:54")
  );
  const [endDate, setEndDate] = React.useState(new Date("2020-05-28T21:11:54"));
  const [open, setOpen] = React.useState(false);
  const [task, setTask] = useState({
    title: "",
    description: "",
    assigned_to: "",
    progress: "Not Started",
    remark: "",
  });
  const { register, handleSubmit, errors, reset, control } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
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

  function getLength(obj) {
    var length = 0;
    for (var p in obj) {
      if (obj.hasOwnProperty(p)) {
        length++;
      }
    }
    return length;
  }

  var date = new Date().getDate();
  var month = new Date().getMonth() + 1;
  var year = new Date().getFullYear();

  const onSubmit = () => {
    if (task.title && task.description && task.assigned_to && startDate && endDate) {
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
    }
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
        <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Add new task...</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill out the fields below.
          </DialogContentText>
          <form className={classes.formControl} noValidate autoComplete="off">
            <TextField
              margin="dense"
              fullWidth="true"
              id="Task title"
              label="Task Title"
              name="title"
              type="text"
              variant="outlined"
              required
              className={classes.formControl}
              multiline
              rowsMax={4}
              onChange={handleChange("title")}
              inputRef={register({ required: true, max: 500 })}
              error={!!errors.title}
            />
            <TextField
              margin="dense"
              fullWidth="true"
              id="Description"
              label="Description"
              name="description"
              className={classes.formControl}
              variant="outlined"
              required
              multiline
              rowsMax={10}
              onChange={handleChange("description")}
              inputRef={register({ required: true, max: 2000 })}
              error={!!errors.description}
            />
            <FormControl className={classes.formControl} required fullWidth>
              <InputLabel>Assigned To</InputLabel>
              <Controller
                as={
                  <Select>
                    {getLength(collaborators) > 0 ? (
                      collaborators.map((collaborator) => (
                        <MenuItem value={collaborator.id}>
                          {collaborator.first_name +
                            " " +
                            collaborator.last_name}
                        </MenuItem>
                      ))
                    ) : (
                      <div align="center">
                        <Typography variant="h6" align="right" color="primary">
                          No collaborators
                        </Typography>
                      </div>
                    )}
                  </Select>
                }
                name="assigned_to"
                rules={{ required: "true" }}
                error={!!errors.assigned_to}
                control={control}
                defaultValue=""
                onChange={([selected]) => {
                  setTask({
                    ...task,
                    assigned_to: selected.target.value,
                  });
                  return selected;
                }}
              />
            </FormControl>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                fullWidth="true"
                required
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                name="start_date"
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
                required
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="End Date"
                label="End Date"
                name="end_date"
                value={endDate}
                onChange={handleEndDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </MuiPickersUtilsProvider>
            <TextField
              id="Remark"
              label="Remark"
              className={classes.formControl}
              multiline
              rowsMax={4}
              onChange={handleChange("remark")}
              margin="dense"
              fullWidth="true"
              name="remark"
              variant="outlined"
              inputRef={register({ max: 2000 })}
              error={!!errors.remark}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" variant="outlined">
            Cancel
          </Button>
          <Button
            onClick={onSubmit}
            type="submit"
            color="primary"
            variant="contained"
            disabled={
              !!errors.remark ||
              !!errors.assigned_to ||
              !!errors.description ||
              !!errors.title
            }
          >
            Post
          </Button>
        </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
