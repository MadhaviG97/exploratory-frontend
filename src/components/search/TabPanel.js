import React from "react";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Alert from '@material-ui/lab/Alert';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import ProjectItem from "./ProjectItem";
import ResearchItem from "./Researchertem";
import InstitutionsItem from "./InstitutionItem";
import Pagination from '@material-ui/lab/Pagination';
import Grid from '@material-ui/core/Grid';

const TabPanel = (props) => {

  const { value, index, ...other } = props;

  const handleChangePage = (event, newPage) => {
    props.setPage(newPage)
  };

  return (
    <div hidden={value !== index}>
      <List style={{
        overflow: 'auto',
        height: '83vh',
        flexWrap: 'wrap',
      }}>

        {props.projects ? (
          props.projects && props.projects.length > 0 ? (
            props.projects.map((currentProject) => (

              <ListItem style={{ width: '100%' }}>
                <div style={{ width: '100%' }}>
                  <ProjectItem ResearchItem={currentProject} />
                </div>
              </ListItem>

            ))
          ) : (
              <Alert variant="filled" severity="info"
                icon={<SentimentVeryDissatisfiedIcon />} >
                Sorry! No matching Projects
              </Alert>
            )
        ) : null}

        {props.researchers ? (
          props.researchers && props.researchers.length > 0 ? (
            props.researchers.map((currentResearcher) => (

              <ListItem style={{ width: '100%', height: 'auto' }}>
                <div style={{ width: '100%' }}>
                  <ResearchItem ResearcherItem={currentResearcher} />
                </div>
              </ListItem>

            ))
          ) : (
              <Alert variant="filled" severity="info"
                icon={<SentimentVeryDissatisfiedIcon />} >
                Sorry! No matching Researchers
              </Alert>
            )
        ) : null}

        {props.institutions ? (
          props.institutions && props.institutions.length > 0 ? (
            props.institutions.map((institution) => (

              <ListItem style={{ width: '100%', height: 'auto' }}>
                <div style={{ width: '100%' }}>
                  <InstitutionsItem InstitutionItem={institution} />
                </div>
              </ListItem>

            ))
          ) : (
              <Alert variant="filled" severity="info"
                icon={<SentimentVeryDissatisfiedIcon />} >
                Sorry! No matching Institutions
              </Alert>
            )
        ) : null}
      </List>

      <Grid container justify="center">
        <Pagination
          count={props.count}
          page={props.page}
          onChange={handleChangePage}
          color="primary" />
      </Grid>
    </div>

  );
}

export default TabPanel