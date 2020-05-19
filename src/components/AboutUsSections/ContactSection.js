import React, { useEffect, useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import MuiAlert from "@material-ui/lab/Alert";

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
  const newClasses = useNewStyles();
  const [open, setOpen] = useState(false);
  const [contact, setContact] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [response, setResponse] = useState("");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleChange = (prop) => (event) => {
    setContact({ ...contact, [prop]: event.target.value });
  };

  const submitMessage = () => {
    const res = addMessage(contact);
    Promise.resolve(res).then((val) => setResponse(val) );
    setContact({
      name: "",
      email: "",
      message: "",
    });
    setOpen(true);
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

          <form>
            <GridContainer justify="center">
              <TextField
                className={newClasses.textField}
                id="name"
                label="Your Name"
                required
                multiline
                rowsMax={2}
                onChange={handleChange("name")}
                fullWidth="true"
                value={contact.name}
              />

              <TextField
                className={newClasses.textField}
                id="email"
                label="Your Email"
                required
                multiline
                rowsMax={2}
                onChange={handleChange("email")}
                fullWidth="true"
                value={contact.email}
              />
              <TextField
                className={newClasses.textField}
                id="message"
                label="Your Message"
                required
                multiline
                rowsMax={5}
                onChange={handleChange("message")}
                fullWidth="true"
                value={contact.message}
              />

              <Button
                variant="contained"
                color="primary"
                className={newClasses.button}
                endIcon={<Icon>send</Icon>}
                onClick={submitMessage}
                justify="center"
              >
                Send Message
              </Button>
              {response == "1" ? (
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
                <Snackbar
                  open={open}
                  autoHideDuration={6000}
                  onClose={handleClose}
                >
                  <Alert onClose={handleClose} severity="error">
                    Message send failed...!
                  </Alert>
                </Snackbar>
              )}
            </GridContainer>
          </form>
        </GridItem>
      </GridContainer>
    </div>
  );
}
