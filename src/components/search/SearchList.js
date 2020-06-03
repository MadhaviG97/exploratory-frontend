import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TabPanel from './TabPanel'

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    marginTop: "8px",
  },
});

const SearchList = (props) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const hasProjects = props.projects && props.projects.length > 0;
  const hasResearchers = props.researchers && props.researchers.length > 0;
  const hasInstitutions = props.institutions && props.institutions.length > 0;

  React.useEffect(() => {
    if (hasProjects) { setValue(0) }
    else if (hasResearchers) { setValue(1) }
    else if (hasInstitutions) { setValue(2) }
    else { setValue(0) }
  }, [props])

  return (
    <Container maxWidth="sm">
      <Paper className={classes.root} style={{ backgroundColor: '#ccebff' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Projects" />
          <Tab label="Researchers" />
          <Tab label="Institutions" />
        </Tabs>

        <TabPanel value={value} index={0} projects={props.projects}></TabPanel>
        <TabPanel
          value={value}
          index={1}
          researchers={props.researchers}
        ></TabPanel>
        <TabPanel
          value={value}
          index={2}
          institutions={props.institutions}
        ></TabPanel>
      </Paper>
    </Container>
  );
};

export default SearchList;
