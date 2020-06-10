import React from "react";
import styles from "../../../assets/jss/material-kit-react/views/componentsSections/navbarsStyle";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import CustomDropdown from "../../CustomDropdown/CustomDropdown.js";
import Badge from "@material-ui/core/Badge";
import { IconButton } from "@material-ui/core";
import { Link } from "react-router-dom";
import LinkTo from "@material-ui/core/Link";
import { useSelector, useDispatch } from "react-redux";
import getMuiTheme from "material-ui/styles/getMuiTheme";

/// notification ///
import { useHistory, useLocation } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import { search } from "../../../_actions/project_actions";
import { logoutUser } from "../../../_actions/user_actions";
import MailIcon from "@material-ui/icons/Mail";
import Button from "@material-ui/core/Button";

import { withStyles } from "@material-ui/core/styles";

import Menu from "@material-ui/core/Menu";
import Chat from "../../Chat/Chat";

const useStyles = makeStyles(styles);
const StyledMenu = withStyles({
  paper: {
    // border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

function LoggedRightMenu(props) {
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
    searchString: "",
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

  const classes = useStyles();
  const history = useHistory();
  let location = useLocation();
  // let { from } = location.state || { from: { pathname: "/project" } };
  let { from } = location.state || {
    from: { pathname: `/search/${state.searchString}` },
  };

  const user = useSelector((state) => state.user);
  const project = useSelector((state) => state.project);
  const dispatch = useDispatch();

  const name = user.userData.first_name;
  const logoutHandler = () => {
    const token = localStorage.token;

    let config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    dispatch(logoutUser(config))
      .then((response) => {
        console.log(response);
        if (response.payload.status === 200) {
          localStorage.removeItem("token");
          history.push("/signin");
        } else {
          alert("Log Out Failed");
        }
      })
      .catch((err) => console.log(err.message));
  };

  const muiTheme = getMuiTheme();

  const handleSubmit = async (e, cb) => {
    e.preventDefault();
    cb();
  };

  const handleShowNotification = () => {
    setState({ ...state, show: !state.show });
  };

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSearch = (e) => {
    const formData = {
      searchString: state.searchString,
    };
    dispatch(search(formData))
      .then((result) => {
        console.log("sent");
        console.log(result);
      })
      .catch((e) => console.log(e));
    history.replace(from);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const token = localStorage.token;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <OutlinedInput
          id="outlined-adornment-password"
          // value={state.searchString}
          name="searchString"
          onChange={handleChange}
          style={{ top: 14,height:42 }}
          endAdornment={
            <InputAdornment position="end">
              <IconButton aria-label="search" onClick={handleSearch} edge="end">
                <SearchIcon style={{ fontSize:20 }}/>
              </IconButton>
            </InputAdornment>
          }
          labelWidth={0}
        />
      </ListItem>

      <ListItem className={classes.listItem}>
        <div className={classes.badge}>
          <Button
            aria-controls="customized-menu"
            aria-haspopup="true"
            id="chatButton"
            onClick={handleClick}
          >
            <Badge
              badgeContent={0}
              {...{
                color: "secondary",
                children: <MailIcon />,
              }}
            />
          </Button>
        </div>
        <div>
          <StyledMenu
            id="customized-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <Chat user={user.userData} token={token} />
          </StyledMenu>
        </div>
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
          buttonText={
            <img
              src={`${user.userData.profile_picture}`}
              className={classes.img}
              alt="profile"
            />
          }
          buttonProps={{
            className: classes.navLink + " " + classes.imageDropdownButton,
            color: "transparent",
          }}
          dropdownList={[
            <Link
              to={`/userprofile/${user.userData._id}`}
              style={{ color: "inherit" }}
            >
              <LinkTo component="button">My Profile</LinkTo>
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
