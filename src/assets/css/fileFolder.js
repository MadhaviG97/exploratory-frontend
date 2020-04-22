import { makeStyles } from "@material-ui/core/styles";
import { container, title } from "../jss/material-kit-react";

export const useStyles = makeStyles((theme) => ({
  container: {
    zIndex: "12",
    color: "#FFFFFF",
    ...container
  }, 
  main: {
    background: "#FFFFFF",
    position: "relative",
    zIndex: "3"
  },
  title: {
    color: "#3C4858",
    margin: "1.75rem 0 0.875rem",
    textDecoration: "none",
    fontWeight: "550",
    fontFamily: `"Roboto Slab", "Times New Roman", serif`,
    display: "inline-block",
    position: "relative",
    //marginTop: "30px",
    minHeight: "32px",
    fontSize:24,
    textDecoration: "none"
  },


name: {
    marginTop: "-20px"
  },
  mainRaised: {
    margin: "0px 30px 30px 30px",
    borderRadius: "6px",
    boxShadow:
      "0 16px 24px 2px rgba(0, 0, 0, 0.08), 0 6px 30px 5px rgba(0, 0, 0, 0.06), 0 8px 10px -5px rgba(0, 0, 0, 0.1)"
  },
  root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      //backgroundColor: theme.palette.background.paper,
      //marginTop: theme.spacing(7),
      marginBottom: theme.spacing(15),
    },
    gridList: {
      width: '80%',
      height: '90%',
    },
    icon: {
      color: 'rgba(255, 255, 255, 0.54)',
    },
  }));