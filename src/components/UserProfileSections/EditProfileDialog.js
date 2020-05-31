import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import { editProfile, getProfile } from "../../_actions/user_profile";

import { useDispatch } from "react-redux";

export default function EditProfile(props) {
  const [open, setOpen] = React.useState(false);
  const [details, setDetails] = React.useState({
    first_name: props.profileDetails.first_name,
    last_name: props.profileDetails.last_name,
    contact_no: props.profileDetails.contact_no,
    institution: props.profileDetails.institution,
    profession: props.profileDetails.profession,
    linkedIn: props.profileDetails.linkedIn,
    twitter: props.profileDetails.twitter,
    description: props.profileDetails.description,
  });

  const dispatch = useDispatch();

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

  const handleSubmit = () => {
    const proDetails = {
      researcher_id:props.profileDetails.id,
      first_name: details.first_name,
      last_name: details.last_name,
      contact_no: details.contact_no,
      institution: details.institution,
      profession: details.profession,
      linkedIn: details.linkedIn,
      twitter: details.twitter,
      description: details.description,
      updated_at: year + "-" + month + "-" + date,
    }
    console.log(proDetails);
    editProfile(proDetails);
    dispatch(getProfile(props.profileDetails.id));
    setOpen(false);
  };

  const handleChange = (prop) => (event) => {
    setDetails({ ...details, [prop]: event.target.value });
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Edit Profile Info
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit Profile Info</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            id="first_name"
            label="First Name"
            fullWidth
            defaultValue={props.profileDetails.first_name}
            onChange={handleChange("first_name")}
          />
          <TextField
            margin="dense"
            id="last_name"
            label="Last Name"
            fullWidth
            defaultValue={props.profileDetails.last_name}
            onChange={handleChange("last_name")}
          />
          <TextField
            margin="dense"
            id="contact_no"
            label="Contact Number"
            fullWidth
            multiline
            defaultValue={props.profileDetails.contact_no}
            onChange={handleChange("contact_no")}
          />
          <TextField
            margin="dense"
            id="institution"
            label="Institution"
            fullWidth
            multiline
            defaultValue={props.profileDetails.institution}
            onChange={handleChange("institution")}
          />
          <TextField
            margin="dense"
            id="profession"
            label="Profession"
            fullWidth
            multiline
            defaultValue={props.profileDetails.profession}
            onChange={handleChange("profession")}
          />
          <TextField
            margin="dense"
            id="personalDescription"
            label="Personal Description"
            fullWidth
            multiline
            defaultValue={props.profileDetails.description}
            onChange={handleChange("description")}
          />
          <TextField
            margin="dense"
            id="linkedIn"
            label="LinkedIn Link"
            fullWidth
            multiline
            defaultValue={props.profileDetails.linkedIn}
            onChange={handleChange("linkedIn")}
          />
          <TextField
            margin="dense"
            id="twitter"
            label="Twitter Link"
            fullWidth
            multiline
            defaultValue={props.profileDetails.twitter}
            onChange={handleChange("twitter")}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Update Profile
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
