import React from "react";
import styles from "../../../assets/jss/material-kit-react/views/componentsSections/navbarsStyle";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import NotificationsIcon from "@material-ui/icons/Notifications";
import CustomDropdown from "../../CustomDropdown/CustomDropdown.js";
import Badge from "@material-ui/core/Badge";
import IconButton from "@material-ui/core/IconButton";
import axios from "axios";
import { Link } from "react-router-dom";
import LinkTo from "@material-ui/core/Link";
import { useSelector } from "react-redux";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import FlatButton from "material-ui/FlatButton";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import DoneOutlineIcon from "@material-ui/icons/DoneOutline";
import { useHistory, useLocation } from "react-router-dom";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import moment from "moment";
import ReactMaterialUiNotifications from "../../../views/shared/ReactMaterialUiNotifications";
import Paper from "@material-ui/core/Paper";
import Notifications from "../../Notification/NotificationList";

const useStyles = makeStyles(styles);

function LoggedRightMenu(props) {
  //these ara the links in the left side of the nav bar
  const classes = useStyles();
  const history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/project" } };

  const user = useSelector((state) => state.user);
  let profileImage =
    process.env.PUBLIC_URL + "/images/profile-pictures/profilePic.png";
  if (user.userData.profile_picture) {
    profileImage = user.userData.profile_picture;
  }

  const name = user.userData.first_name;
  const logoutHandler = () => {
    const token = localStorage.token;

    let config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    localStorage.removeItem("token");
    axios.post(`/logout`, {}, config).then((response) => {
      if (response.status === 200) {
        history.push("/signin");
      } else {
        alert("Log Out Failed");
      }
    });
  };

  const [state, setState] = React.useState({
    count: 0,
    data_list: {
      id: 0,
      _read: false,
      researcher_id: "",
      direct_to: "",
      type: 0,
      icon: "",
      image: "",
      link: "",
      title: "",
      description: "",
    },
    data: [
      {
        id: "1",
        description: "You have new task assigned to you",
        time: "11:20:10",
      },
      {
        id: "2",
        description: "You have new task assigned to you",
        time: "11:20:10",
      },
      {
        id: "3",
        description: "You have new task assigned to you",
        time: "11:20:10",
      },
    ],
    show: false,
  });

  const muiTheme = getMuiTheme();

  const handleSubmit = async (e, cb) => {
    e.preventDefault();
    cb();
  };

  const handleShowNotification = () => {
    setState({ ...state, show: !state.show });
    // ReactMaterialUiNotifications.showNotification({
    //   title: "Title",
    //   additionalText: `Some message to be displayed ${state.count}`,
    //   iconBadgeColor: "#014f82",
    //   icon: <NotificationsActiveIcon />,
    //   overflowContent: (
    //     <div>
    //       <FlatButton
    //         label="mark as read"
    //         icon={<DoneOutlineIcon color="primary" />}
    //       />
    //       <FlatButton
    //         label="direct me"
    //         icon={<ExitToAppIcon color="primary" />}
    //         onClick={(e) =>
    //           handleSubmit(e, () => {
    //             history.replace(from);
    //           })
    //         }
    //       />
    //     </div>
    //   ),
    //   timestamp: moment().format("h:mm A"),
    //   personalised: true,
    //   avatar: "images/notification/bell.png",
    //   priority: true,
    //   zDepth: 4,
    // });
  };

  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <MuiThemeProvider muiTheme={muiTheme}>
          <div style={{ position: "relative" }}>
            <IconButton onClick={() => handleShowNotification()}>
              <Badge badgeContent={4} color="primary">
                <NotificationsIcon fontSize="large" />
              </Badge>
            </IconButton>
          </div>
          {state.show && (
            <div style={{ position: "absolute", zIndex: 2 }}>
              <Paper>
                <Notifications items={state.data} />
              </Paper>
            </div>
          )}
          <ReactMaterialUiNotifications
            desktop={true}
            transitionName={{
              leave: "dummy",
              leaveActive: "fadeOut",
              appear: "dummy",
              appearActive: "zoomInUp",
            }}
            transitionAppear={true}
            transitionLeave={true}
          />
        </MuiThemeProvider>
      </ListItem>
      <ListItem className={classes.listItem}>
        <CustomDropdown
          left
          caret={false}
          hoverColor="themeBlue"
          imgText={
            <div className={classes.imageLink} color="transparent">
              {name}
            </div>
          }
          caret="true"
          buttonText={
            <img src={profileImage} className={classes.img} alt="profile" />
          }
          buttonProps={{
            className: classes.navLink + " " + classes.imageDropdownButton,
            color: "transparent",
          }}
          dropdownList={[
            <Link to="/#" style={{ color: "inherit" }}>
              <LinkTo component="button">My Profile</LinkTo>
            </Link>,
            <Link to="/#" style={{ color: "inherit" }}>
              <LinkTo component="button">My Projects</LinkTo>
            </Link>,
            <LinkTo component="button" color="inherit" onClick={logoutHandler}>
              Sign out
            </LinkTo>,
          ]}
        />
      </ListItem>
    </List>
  );
}

export default LoggedRightMenu;
