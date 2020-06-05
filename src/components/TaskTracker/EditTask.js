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
import Typography from "@material-ui/core/Typography";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { getTasks, editTask } from "../../_actions/taskTracker_actions";
import { useDispatch } from "react-redux";
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

export default function EditTask(props) {
  const classes = useStyles();
  const collaborators = props.collaborators;
  const [open, setOpen] = React.useState(false);
  const [edit, setEdit] = React.useState({
    title: props.task.title,
    description: props.task.description,
    assigned_to: props.task.aId,
    progress: props.task.progress,
    remark: props.task.remark,
  });
  const { register, handleSubmit, errors, reset, control } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      title: props.task.title,
      description: props.task.description,
      remark: props.task.remark,
    },
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
    if (
      edit.title &&
      edit.description &&
      edit.assigned_to &&
      edit.progress &&
      startDate &&
      endDate
    ) {
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
    }
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
        <form onSubmit={handleSubmit(onSubmit)}>
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
              name="title"
              variant="outlined"
              required
              multiline
              rowsMax={4}
              inputRef={register({ required: true, max: 500 })}
              error={!!errors.title}
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
              name="description"
              variant="outlined"
              required
              rowsMax={10}
              inputRef={register({ required: true, max: 2000 })}
              onChange={handleChange("description")}
              error={!!errors.description}
            />
            <FormControl className={classes.formControl} required fullWidth>
              <InputLabel>Assigned To</InputLabel>
              <Controller
                as={
                  <Select onChange={handleChange("assigned_to")} value={edit.assigned_to}>
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
                defaultValue={props.task.aId}
                onChange={([selected]) => {
                  setEdit({
                    ...edit,
                    assigned_to: selected.target.value,
                  });
                  return selected;
                }}
              />
            </FormControl>
            <br />
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                fullWidth
                disableToolbar
                required
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
                fullWidth
                required
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
            <FormControl className={classes.formControl} fullWidth="true" required>
              <InputLabel id="demo-simple-select-label1">Progress</InputLabel>
              <Controller
                as={
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
                }
                name="progress"
                rules={{ required: "true" }}
                error={!!errors.progress}
                control={control}
                defaultValue={props.task.progress}
                onChange={([selected]) => {
                  setEdit({
                    ...edit,
                    progress: selected.target.value,
                  });
                  return selected;
                }}
              />
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
              rowsMax={4}
              name="remark"
              variant="outlined"
              inputRef={register({ max: 2000 })}
              error={!!errors.remark}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button
              onClick={onSubmit}
              type="submit"
              color="primary"
              variant="contained"
              disabled={!!errors.title || !!errors.description || !!errors.assigned_to || !!errors.progress}
            > 
              Update
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
