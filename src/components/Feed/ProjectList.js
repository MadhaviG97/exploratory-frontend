import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import ProjectItem from './ProjectItem'
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
  }),
);


const ProjectList = (props) => {

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <React.Fragment>

      <Container maxWidth="sm" style={{backgroundColor: '#cfe8fc', padding:'10px'}}>

        { props.projects && props.projects.length >0 ? (
            props.projects.map(currentProject => (
              <ProjectItem ResearchItem={currentProject} />
            ))
          ):<div style={{paddingTop:"100px", margin:"auto"}}>No Projects</div>            
        }

      </Container>
      </React.Fragment>
  </div>
  );
}

export default ProjectList