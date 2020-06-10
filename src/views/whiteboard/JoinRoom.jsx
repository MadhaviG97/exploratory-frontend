import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";
import { useStyles } from "../../assets/css/JoinRoom";
import Container from "@material-ui/core/Container";
import JoinRoomButtonBase from "../../components/Whiteboard/JoinRoomButtonBase";
import { useParams } from "react-router-dom";
import SelectUsers from "../../components/Whiteboard/AddUsers";
import Appbar from "../../components/Whiteboard/CustomAppBar";
import axios from "axios";
import { useSelector } from "react-redux";

export default function SignIn() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  let { project_id } = useParams();
  var user = useSelector((state) => state.user);

  const handleClickOpen = async () => {
    const formData = {
      room: project_id,
      token: localStorage.token,
      user_id: user.userData._id,
      name: `${user.userData.first_name} ${user.userData.last_name}`,
      email: user.userData.email,
    };
    await axios
      .post(`${process.env.REACT_APP_WHITE_BOARD_URL}/join`, formData, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      })
      .then((result) => {
        window.open(
          `${process.env.REACT_APP_WHITE_BOARD_URL}/${project_id}&${localStorage.token}&${user.userData._id}`
        );
      })
      .catch((e) => console.log(e.message));
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <div style={{background: "#eceff1"}}>
        <Box>
          <Appbar />
        </Box>

        <Container
        
          component="main"
          maxWidth={false}
          className={classes.image}
          style={{ minHeight: "80vh" }}
        >
          <CssBaseline />
          <div className={classes.paper}>
            <JoinRoomButtonBase
              title="JOIN WHITE-BOARD"
              onClick={handleClickOpen}
            />
            <SelectUsers open={open} handleClose={handleClose} />
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
}
