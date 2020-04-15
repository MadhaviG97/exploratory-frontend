
import { makeStyles } from "@material-ui/core/styles";

const NavbarStyle = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appbar: {
    background: "#FFFFFF", //navbar(header) color
    color: "#000000", //header font color
    boxShadow: [
      // 23 default values of 'shadows' array from https://material-ui-1dab0.firebaseapp.com/customization/themes/
      "0 1px 2px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.12)", // 24th value
    ],
  },
  tab: {
    minWidth: 100, // Navbar link size
    width: 100, // a number of your choice
    color: "#4b4b4b",
    fontSize: 15,
  },
  link: {
    // a number of your choice
    color: "#000000",
    fontSize: 15,
  },
  signin: {
    // a number of your choice
    color: "#004775",
    fontSize: 15,
  },

  menuButton: {
    //these are not used
    marginLeft: theme.spacing(10),
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: "none", //these are not used
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  logo: {
    //logo is just logo.png from public folder
    flexGrow: 1,
    marginLeft: theme.spacing(20),
    maxWidth: 180,
  },

  Menu: {
    //this is for menu.js

    marginRight: theme.spacing(20),
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  sbutton: {
    marginRight: theme.spacing(20),
  },
  searchIcon: {
    //these are not used
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    //these are not used
    color: "inherit",
  },
  inputInput: {
    //these are not used
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));
export default NavbarStyle;
