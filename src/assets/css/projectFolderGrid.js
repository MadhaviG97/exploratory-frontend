import { makeStyles } from "@material-ui/core/styles";
export const useStyles = makeStyles((theme) => ({
  
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
  background:{
   height: '100%',
   backgroundSize: 'cover',
   backgroundImage: "url(/images/fileFolder/bg3.jpg)", 
   minHeight: '84vh'
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
    textDecoration: "none",
    fontWeight: "400",
    //fontFamily: `"Roboto Slab", "Times New Roman", serif`,
    fontSize:22,
    //display: "inline-block",
    //position: "relative",
    //marginTop: "30px",
    minHeight: "50px",
    
  },
  topic3: {
    color: "#FFFFFF",
    textDecoration: "none",
    fontWeight: "400",
    //fontFamily: `"Roboto Slab", "Times New Roman", serif`,
    fontSize:22,
    //display: "inline-block",
    //position: "relative",
    //marginTop: "30px",
    minHeight: "50px",
    
  },
  avatar: {
    backgroundColor: "#014f82",
  },
  card: {
    display: 'flex',
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 160,
  },
  icon: {
    marginLeft: "230px",
    marginRight: "230px"
  },
  titletwo: {
    color: "#3C4858",
    margin: "1.75rem 0 0.875rem",
    textDecoration: "none",
    fontWeight: "100",
    fontFamily: `"Roboto Slab"`,
    //display: "inline-block",
    //position: "relative",
    //marginTop: "30px",
    minHeight: "28px",
    textDecoration: "none"
  },
  name: {
    marginTop: "-20px"
  },
  roota: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  main: {
    background: "#FFFFFF",
    position: "relative",
    zIndex: "3"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
    maxWidth: 250,
},
  main2: {
    margin: "2px 0px 0px 0px",
    background: "#eceff1",
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
}))