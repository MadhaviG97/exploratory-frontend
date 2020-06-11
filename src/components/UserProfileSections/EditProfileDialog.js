import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  editProfile,
  getProfile,
  getInstitutions,
} from "../../_actions/user_profile";
import { useForm, Controller } from "react-hook-form";
//import { DevTool } from "react-hook-form-devtools";

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

export default function EditProfile(props) {
  const classes = useStyles();
  const { register, handleSubmit, errors, reset, control } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      first_name: props.profileDetails.first_name,
      last_name: props.profileDetails.last_name,
      contact_no: props.profileDetails.contact_no,
      profession: props.profileDetails.profession,
      linkedIn: props.profileDetails.linkedIn,
      twitter: props.profileDetails.twitter,
      personalDescription: props.profileDetails.description,
    },
  });
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const [details, setDetails] = React.useState({
    first_name: props.profileDetails.first_name,
    last_name: props.profileDetails.last_name,
    contact_no: props.profileDetails.contact_no,
    institution: props.profileDetails.institution_id,
    profession: props.profileDetails.profession,
    linkedIn: props.profileDetails.linkedIn,
    twitter: props.profileDetails.twitter,
    description: props.profileDetails.description,
  });
  useEffect(() => {
    dispatch(getInstitutions());
  }, []);

  const researcher = useSelector((state) => state.researcher);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setDetails({
      first_name: "",
      last_name: "",
      contact_no: "",
      institution: "",
      profession: "",
      linkedIn: "",
      twitter: "",
      description: "",
    });
  };

  var date = new Date().getDate();
  var month = new Date().getMonth() + 1;
  var year = new Date().getFullYear();

  const onSubmit = () => {
    if (details.first_name && details.last_name) {
      const proDetails = {
        researcher_id: props.profileDetails.id,
        first_name: details.first_name,
        last_name: details.last_name,
        contact_no: details.contact_no,
        institution: details.institution,
        profession: details.profession,
        linkedIn: details.linkedIn,
        twitter: details.twitter,
        description: details.description,
        updated_at: year + "-" + month + "-" + date,
      };
      console.log(proDetails);
      editProfile(proDetails);
      dispatch(getProfile(props.profileDetails.id));
      // setDetails({
      //   first_name: "",
      //   last_name: "",
      //   contact_no: "",
      //   institution: "",
      //   profession: "",
      //   linkedIn: "",
      //   twitter: "",
      //   description: "",
      // });
      setOpen(false);
    }
  };

  const handleChange = (prop) => (event) => {
    setDetails({ ...details, [prop]: event.target.value });
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

  return (
    <div>
      <Button variant="contained" color="default" onClick={handleClickOpen}>
        Edit Profile Info
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit Profile Info</DialogTitle>
        {/* <DevTool control={control} /> */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <TextField
              margin="dense"
              id="first_name"
              name="first_name"
              label="First Name"
              type="text"
              variant="outlined"
              fullWidth
              onChange={handleChange("first_name")}
              inputRef={register({ required: true, maxLength: 50 })}
              error={!!errors.first_name}
            />
            <TextField
              margin="dense"
              id="last_name"
              label="Last Name"
              name="last_name"
              variant="outlined"
              type="text"
              fullWidth
              onChange={handleChange("last_name")}
              inputRef={register({ required: true, maxLength: 50 })}
              error={!!errors.last_name}
            />
            <TextField
              margin="dense"
              id="contact_no"
              variant="outlined"
              label="Contact Number"
              name="contact_no"
              type="text"
              fullWidth
              onChange={handleChange("contact_no")}
              inputRef={register({ maxLength: 20 })}
              error={!!errors.contact_no}
            />
            {/* <FormControl
              style={{ minWidth: 300 }}
              error={Boolean(errors.wordlevel)}
              fullWidth
            >
              <InputLabel id="demo-simple-select-label1">
                Institution
              </InputLabel>
              <Controller
                as={
                  <Select>
                    <MenuItem value="">None</MenuItem>
                    {getLength(researcher.institutions) > 0 ? (
                      researcher.institutions.map((institution) => (
                        <MenuItem value={institution.id}>
                          {institution.name + "," + institution.address}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem value={0}>None</MenuItem>
                    )}
                  </Select>
                }
                name="institution"
                rules={{ required: "this is required" }}
                control={control}
                defaultValue=""
              />
            </FormControl> */}
            <InputLabel id="demo-simple-select-label">Institution</InputLabel>

            <FormControl
              style={{ minWidth: 300 }}
              error={Boolean(errors.institute)}
              fullWidth
              variant="outlined"
            >
              <Select
                onChange={handleChange("institution")}
                defaultValue={props.profileDetails.institution_id}
              >
                {getLength(researcher.institutions) > 0 ? (
                  researcher.institutions.map((institution) => (
                    <MenuItem value={institution.id}>
                      {institution.name + "," + institution.address}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem value={0}>None</MenuItem>
                )}
              </Select>
            </FormControl>

            <TextField
              margin="dense"
              id="profession"
              label="Profession"
              name="profession"
              variant="outlined"
              type="text"
              fullWidth
              multiline
              rowsMax={4}
              onChange={handleChange("profession")}
              inputRef={register({ maxLength: 800 })}
              error={!!errors.profession}
            />
            <TextField
              margin="dense"
              id="personalDescription"
              label="Personal Description"
              name="personalDescription"
              type="text"
              variant="outlined"
              fullWidth
              multiline
              rowsMax={10}
              onChange={handleChange("description")}
              inputRef={register({ maxLength: 5000 })}
              error={!!errors.personalDescription}
            />
            <TextField
              margin="dense"
              id="linkedIn"
              label="LinkedIn Link"
              name="linkedIn"
              type="text"
              variant="outlined"
              fullWidth
              onChange={handleChange("linkedIn")}
              inputRef={register({ maxLength: 1000 })}
              error={!!errors.linkedIn}
            />
            <TextField
              margin="dense"
              id="twitter"
              label="Twitter Link"
              name="twitter"
              type="text"
              variant="outlined"
              fullWidth
              onChange={handleChange("twitter")}
              inputRef={register({ maxLength: 1000 })}
              error={!!errors.twitter}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button
              onClick={onSubmit}
              type="submit"
              variant="contained"
              color="primary"
              disabled={
                !!errors.first_name ||
                !!errors.last_name ||
                !!errors.contact_no ||
                !!errors.profession ||
                !!errors.personalDescription ||
                !!errors.linkedIn ||
                !!errors.twitter
              }
            >
              Update Profile
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
