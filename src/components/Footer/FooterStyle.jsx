import {  makeStyles } from '@material-ui/core/styles';

const FooterStyle = makeStyles((theme) => ({
    root: {//This helps the footer appear in the bottom
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
    },
    main: {//these are not used
      marginTop: theme.spacing(8),
      marginBottom: theme.spacing(2),
    },
    footer2: {//Footer 2 is the footer in the bottom-the darker one
      padding: theme.spacing(1.5, 0.5),//to change size
      //marginTop: 'auto',
      color:"#FFFFFF",
      
      backgroundColor:
      '#003f68'
        //theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
        //to change color
    },
    
    footer1: {//footer 1 is the one above footer 2
        padding: theme.spacing(10, 6),
        //marginTop: 'auto',
        backgroundColor:
          theme.palette.type === 'light' ? theme.palette.grey[100] : theme.palette.grey[400],
      },
    
  }));

export default FooterStyle;