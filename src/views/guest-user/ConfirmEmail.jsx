import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { useStyles } from "../../assets/css/JoinRoom";
import Container from "@material-ui/core/Container";
import JoinRoomButtonBase from "../../components/Whiteboard/JoinRoomButtonBase";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

export default function SignIn() {
  const classes = useStyles();
  let { userId } = useParams();
  var user = useSelector((state) => state.user);
  let history = useHistory();
  let location = useLocation();

  const handleClickOpen = async () => {
    const formData = {
      id: userId,
    };
    console.log(formData);
    await axios
      .post("/register", formData)
      .then((result) => {
        console.log(result);
        let { from } = location.state || {
          from: {
            pathname: "/signin",
          },
        };
        history.replace(from);
      })
      .catch((e) => console.log(e.message));
  };

  return (
    <React.Fragment>
      <Container
        component="main"
        maxWidth={false}
        className={classes.image}
        style={{ minHeight: "80vh" }}
      >
        <CssBaseline />
        <div className={classes.paper}>
          <JoinRoomButtonBase title="CONFIRM EMAIL" onClick={handleClickOpen} />
        </div>
      </Container>
    </React.Fragment>
  );
}
