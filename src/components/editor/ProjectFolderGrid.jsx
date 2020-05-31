import React from 'react';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import { useStyles } from "../../assets/css/projectFolderGrid";


export default function ProjectFolderGrid(props) {
  const classes = useStyles();
  

  return (
    <div>
    
    <Grid container justify="center" alignItems="center" spacing={3}>
      
      <Grid item xs={8} align='center'>

          <Box  alignItems="center">
              <div >
              <img  src={process.env.PUBLIC_URL + '/images/appnav/empty.png'} alt={"no files yet?"} />
              <h1  className={classes.topic2}>It seems that you don't have any {props.word} here yet.</h1>
              </div>
              
              
          </Box>
            
        
      </Grid>
    </Grid>
    </div>
  );
}

