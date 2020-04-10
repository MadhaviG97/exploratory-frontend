import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import FooterStyle from './FooterStyle';
//this is the footer 2 the darker one at the bottom
function Copyright() {
  return (
    <Typography variant="body2" color="#FFFFFF">
      {'Copyright © '}
      <Link color="inherit" href="">
        Exploratory
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}



export default function Footer() {
  
  const classes = FooterStyle();
  return (
    
    <div >
      <CssBaseline />
      <footer  className={classes.footer2}  >
      
        <Container maxWidth="sm">
          
          <Copyright />
        </Container>
      </footer>
    </div>
  );
}