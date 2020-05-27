import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import ProjectItem from "./ProjectItem";
import Container from "@material-ui/core/Container";
import ResearchItem from "./Researchertem";
import InstitutionsItem from "./InstitutionItem";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    marginTop: "80px",
  },
});

function TabPanel(props: TabPanelProps) {
  const { value, index, ...other } = props;

  return (
    <div hidden={value !== index}>
      {props.projects ? (
        props.projects && props.projects.length > 0 ? (
          props.projects.map((currentProject) => (
            <ProjectItem ResearchItem={currentProject} />
          ))
        ) : (
          <div
            alignItems="center"
            style={{
              textAlign: "center",
              backgroundColor: "#b2beb5",
              marginBottom: "10px",
            }}
          >
            No Projects
          </div>
        )
      ) : null}

      {props.researchers ? (
        props.researchers && props.researchers.length > 0 ? (
          props.researchers.map((currentResearcher) => (
            <ResearchItem ResearcherItem={currentResearcher} />
          ))
        ) : (
          <div
            alignItems="center"
            style={{
              textAlign: "center",
              backgroundColor: "#b2beb5",
              marginBottom: "10px",
            }}
          >
            No Researchers
          </div>
        )
      ) : null}

      {props.institutions ? (
        props.institutions && props.institutions.length > 0 ? (
          props.institutions.map((institution) => (
            <InstitutionsItem InstitutionItem={institution} />
          ))
        ) : (
          <div
            alignItems="center"
            style={{
              textAlign: "center",
              backgroundColor: "#b2beb5",
              marginBottom: "10px",
            }}
          >
            No Institutions
          </div>
        )
      ) : null}
    </div>
  );
}

const SearchList = (props) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  console.log("initial");
  console.log(value);
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const hasProjects = props.projects && props.projects.length > 0;
  const hasResearchers = props.researchers && props.researchers.length > 0;
  const hasInstitutions = props.institutions && props.institutions.length > 0;

  return (
    <Container maxWidth="sm">
      <Paper className={classes.root}>
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
// const ProjectList = (props) => {

//   const classes = useStyles();

//   return (
//     <div className={classes.root}>
//       <React.Fragment>

//       <Container maxWidth="sm" style={{backgroundColor: '#cfe8fc', padding:'10px'}}>

//         { props.projects && props.projects.length >0 ? (
//             props.projects.map(currentProject => (
//               <ProjectItem ResearchItem={currentProject} />
//             ))
//           ):<div style={{paddingTop:"100px", margin:"auto"}}>No Projects</div>
//         }

//       </Container>
//       </React.Fragment>
//   </div>
//   );
// }

export default SearchList;
