import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';
import { useStyles } from "../../assets/css/projectFolderGrid";


export default function ProjectFolderGrid(props) {
  const classes = useStyles();
  

  return (
    <Grid container justify="center" alignItems="center" spacing={3}>
      <Grid item xs={8} md={4}>
        <Box boxShadow={2} style={{  background: '#FFFFFF'}}>
          <Box p={4}>
              <div >
                  <h1 align='center' className={classes.topic2}>You Don't seem to have any files here. Do you want to delete this folder?</h1>
              </div>
              
              
          </Box>
            
        </Box>
      </Grid>
    </Grid>
  );
}

