import React, { useEffect, useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import MuiAlert from "@material-ui/lab/Alert";
import { useForm } from "react-hook-form";

// @material-ui/icons
import Icon from "@material-ui/core/Icon";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";

// core components
import GridContainer from "../../components/Grid/GridContainer.js";
import GridItem from "../../components/Grid/GridItem.js";

import styles from "../../assets/jss/material-kit-react/views/landingPageSections/workStyle.js";

import { addMessage } from "../../_actions/aboutus_actions";

const useStyles = makeStyles(styles);

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useNewStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(3),
  },
  textField: {
    margin: theme.spacing(1),
  },
}));

export default function WorkSection() {
  const classes = useStyles();
  const { register, handleSubmit, errors, reset } = useForm();
  const newClasses = useNewStyles();
  const [open, setOpen] = useState(false);
  const [contact, setContact] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [response, setResponse] = useState(false);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleChange = (prop) => (event) => {
    setContact({ ...contact, [prop]: event.target.value });
  };

  const onSubmit = (contact) => {
    if (contact.name || contact.email || contact.message) {
      addMessage(contact);
      setResponse(true);
      setOpen(true);
      setContact({
        name: "",
        email: "",
        message: "",
      })
    }
  };

  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem cs={12} sm={12} md={8}>
          <h2 className={classes.title}>Contact Us</h2>
          <h4 className={classes.description}>
            Contact Team Geefour through Exploratory. We will respond you within
            couple of hours.
          </h4>

          <form onSubmit={handleSubmit(onSubmit)}>
            <GridContainer justify="center">
              <TextField
                className={newClasses.textField}
                variant="outlined"
                name="name"
                id="name"
                label="Your Name"
                type="text"
                required
                multiline
                rowsMax={2}
                onChange={handleChange("name")}
                fullWidth="true"
                value={contact.name}
                inputRef={register({ required: true })}
                error={!!errors.name}
              />

              <TextField
                className={newClasses.textField}
                variant="outlined"
                id="email"
                name="email"
                label="Your Email"
                type="email"
                required
                multiline
                rowsMax={2}
                onChange={handleChange("email")}
                fullWidth="true"
                value={contact.email}
                inputRef={register({ required: true })}
                error={!!errors.email}
              />
              <TextField
                className={newClasses.textField}
                variant="outlined"
                id="message"
                name="message"
                label="Your Message"
                type="text"
                required
                multiline
                rowsMax={5}
                onChange={handleChange("message")}
                fullWidth="true"
                value={contact.message}
                inputRef={register({ required: true })}
                error={!!errors.message}
              />

              <Button
                variant="contained"
                color="primary"
                className={newClasses.button}
                endIcon={<Icon>send</Icon>}
                onClick={onSubmit}
                justify="center"
                type="submit"
              >
                Send Message
              </Button>
              {response ? (
                <Snackbar
                  open={open}
                  autoHideDuration={6000}
                  onClose={handleClose}
                >
                  <Alert onClose={handleClose} severity="success">
                    Message sent successfully...!
                  </Alert>
                </Snackbar>
              ) : (
                <div></div>
              )}
            </GridContainer>
          </form>
        </GridItem>
      </GridContainer>
    </div>
  );
}
