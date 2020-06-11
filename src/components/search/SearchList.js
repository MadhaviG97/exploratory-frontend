import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TabPanel from './TabPanel'
import ReactLoading from "react-loading";
import axios from 'axios'

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    marginTop: "8px",
  },
  loader: {
    height: 550,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
  },
});

const SearchList = (props) => {

  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [loading, setLoading] = React.useState(true);

  const [projects, setProjects] = React.useState([])
  const [researchers, setResearchers] = React.useState([])
  const [institutions, setInstitutions] = React.useState([])

  const [projectPage, setProjectPage] = React.useState(1)
  const [researcherPage, setResearcherPage] = React.useState(1)
  const [institutionPage, setInstitutionPage] = React.useState(1)

  const [projectsLength, setProjectsLength] = React.useState(0)
  const [researchersLength, setResearchersLength] = React.useState(0)
  const [institutionsLength, setInstitutionsLength] = React.useState(0)

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const pageAmount = 6

  React.useEffect(() => {
    if (projectsLength) { setValue(0) }
    else if (researchersLength) { setValue(1) }
    else if (institutionsLength) { setValue(2) }
    else { setValue(0) }

  }, [projectsLength, researchersLength, institutionsLength])

  React.useEffect(() => {

    var parameters = {
      searchString: props.searchString,
      index: (projectPage - 1) * pageAmount,
      type: "projects"
    }

    const fetchData = () => {
      var request = axios
        .post("/search", parameters)
        .then((response) => {
          setLoading(false)
          setProjects(response.data.res)
          setProjectsLength(response.data.resLength)
        })
        .catch(err => { setLoading(false) });
    }
    fetchData()
  }, [projectPage, props.searchString])

  React.useEffect(() => {

    var parameters = {
      searchString: props.searchString,
      index: (researcherPage - 1) * pageAmount,
      type: "researchers"
    }

    const fetchData = () => {
      var request = axios
        .post("/search", parameters)
        .then((response) => {
          setResearchers(response.data.res)
          setResearchersLength(response.data.resLength)
        })
        .catch(err => { });
    }
    fetchData()
  }, [researcherPage, props.searchString])

  React.useEffect(() => {

    var parameters = {
      searchString: props.searchString,
      index: (institutionPage - 1) * pageAmount,
      type: "institutions"
    }

    const fetchData = () => {
      var request = axios
        .post("/search", parameters)
        .then((response) => {
          setInstitutions(response.data.res)
          setInstitutionsLength(response.data.resLength)
        })
        .catch(err => { });
    }
    fetchData()
  }, [institutionPage, props.searchString])

  return (

    <div>
      {loading ? (
        <div className={classes.loader}>
          <ReactLoading
            type="spinningBubbles"
            color="#5054CC"
            height={550}
            width={50}
          />
        </div>
      ) : (
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

              <TabPanel
                value={value}
                index={0}
                projects={projects}
                count={Math.ceil(projectsLength / pageAmount)}
                page={projectPage}
                setPage={setProjectPage}
              />

              <TabPanel
                value={value}
                index={1}
                researchers={researchers}
                count={Math.ceil(researchersLength / pageAmount)}
                page={researcherPage}
                setPage={setResearcherPage}
              />

              <TabPanel
                value={value}
                index={2}
                institutions={institutions}
                count={Math.ceil(institutionsLength / pageAmount)}
                page={institutionPage}
                setPage={setInstitutionPage}
              />

            </Paper>
          </Container>
        )}
    </div>

  );
};

export default SearchList;
