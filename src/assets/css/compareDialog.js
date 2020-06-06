import { makeStyles } from "@material-ui/core/styles";
export const useStyles = makeStyles((theme) => ({
  
  root: {
    maxWidth: 875,
  },
  roota: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },

    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        maxWidth: 300,
    },
    noLabel: {
        marginTop: theme.spacing(3),
    },
    main: {
        background: "#FFFFFF",
        position: "relative",
        zIndex: "3",
        margin: "25px 15px 30px 30px"
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
    color: "#FFFFFF",
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
  avatar: {
    backgroundColor: "#014f82",
  },
  card: {
    borderRadius: 2,
    boxShadow: 'rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px'
    //backgroundColor: theme.palette.primary.light,
    //color: theme.palette.primary.contrastText,
    //boxShadow: "none"
   },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 160,
    height: 0
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
    marginTop: "-20px",
    marginBottom: "-10px"
  },
  icon: {
    marginLeft: "230px",
    marginRight: "230px"
  },
  main: {
    background: "#FFFFFF",
    position: "relative",
    zIndex: "3"
  },
  main2: {
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
  card2:{
    width: "1000px",
    margin: "25px 15px 30px 30px",
    borderRadius: 2,
    boxShadow: 'rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px'
  }
}))