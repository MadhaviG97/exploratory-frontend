import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(50),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    //width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  roota: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  title: {
    color: "#FFFFFF",
    margin: "1.75rem 0 0.875rem",
    textDecoration: "none",
    fontWeight: "550",
    //fontFamily: `"Roboto Slab", "Times New Roman", serif`,
    //display: "inline-block",
    //position: "relative",
    //marginTop: "30px",
    minHeight: "32px",
    fontSize:25,
    textDecoration: "none"
  },
  topic: {
    color: "#3C4858",
    margin: "1.75rem 0 0.875rem",
    textDecoration: "none",
    fontWeight: "480",
    //fontFamily: `"Roboto Slab", "Times New Roman", serif`,
    fontSize:22,
    //display: "inline-block",
    //position: "relative",
    //marginTop: "30px",
    minHeight: "50px",
    
  },
  topic2: {
    color: "#3C4858",
    //margin: "1.75rem 0 0.875rem",
    textDecoration: "none",
    fontWeight: "480",
    //fontFamily: `"Roboto Slab", "Times New Roman", serif`,
    fontSize:22,
    //display: "inline-block",
    //position: "relative",
    //marginTop: "30px",
    minHeight: "50px",
    
  },
  topic3: {
    color: "#3C4858",
    //margin: "1.75rem 0 0.875rem",
    textDecoration: "none",
    fontWeight: "550",
    //fontFamily: `"Roboto Slab", "Times New Roman", serif`,
    fontSize:27,
    //display: "inline-block",
    //position: "relative",
    //marginTop: "30px",
    minHeight: "50px",
    
  },
  title2: {
    color: "#3C4858",
    margin: "1.75rem 0 0.875rem",
    textDecoration: "none",
    fontWeight: "500",
    //fontFamily: `"Roboto Slab", "Times New Roman", serif`,
    //display: "inline-block",
    //position: "relative",
    //marginTop: "30px",
    minHeight: "32px",
    fontSize:15,
    textDecoration: "none"
  },

  root:{
    root: {
      flexGrow: 1,
    },
  },
  name: {
    marginTop: "-20px"
  },
  main: {
    background: "#FFFFFF",
    position: "relative",
    zIndex: "3"
  },
  main2: {
    background: "#f7fbfd",
    position: "relative",
    zIndex: "3"
  },
  mainRaised: {
    margin: "0px 30px 30px 30px",
    borderRadius: "6px",
    boxShadow:
      "0 16px 24px 2px rgba(0, 0, 0, 0.08), 0 6px 30px 5px rgba(0, 0, 0, 0.06), 0 8px 10px -5px rgba(0, 0, 0, 0.1)"
  },
  mainRaised2: {
    margin: "25px 15px 30px 30px",
    borderRadius: "2px",
    boxShadow:
      "0 8px 12px 1px rgba(0, 0, 0, 0.02), 0 3px 15px 2.5px rgba(0, 0, 0, 0.015), 0 4px 5px -2.5px rgba(0, 0, 0, 0.1)"
  },
  mainRaised3: {
    margin: "25px 15px 30px 30px",
    borderRadius: "2px",

  },
  
}))