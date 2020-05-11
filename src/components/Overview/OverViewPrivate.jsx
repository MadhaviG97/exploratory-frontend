import React from "react";
import { Box } from "@material-ui/core";
import { useStyles } from "../../assets/css/overview";
import { CardContent } from "@material-ui/core";
import ProjectCard from "./projectCard";
import { useHistory, useLocation } from "react-router-dom";

export default function Overview() {
  const classes = useStyles();
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || {
    from: { pathname: "/project/settings/1" },
  };

  const [form, setForm] = React.useState({
    abstract: {
      name: "abstract",
      heading: "Abstract",
      message: "Add you project abstract Here",
    },
    finalpaper: {
      name: "finalpaper",
      heading: "Final Paper",
      message: "Add your Final paper here",
    },
    relatedMedia: {
      name: "relatedMedia",
      heading: "Related Media",
      message: "Add any related media documents Here",
    },
  });

  const setEditState = () => {
    let { from } = location.state || {
      from: { pathname: "/project/settings/1" },
    };
    history.replace(from);
  };

  return (
    <React.Fragment>
      <Box>
        <Box className={classes.overview}>
          <CardContent>
            <Box display="flex" flexDirection="column">
              <ProjectCard
                heading={form.abstract.heading}
                value={form.abstract.message}
                editState={form.abstract.editState}
                name={form.abstract.name}
                handleEditState={setEditState}
              />
            </Box>
          </CardContent>
        </Box>

        <Box className={classes.overview}>
          <CardContent>
            <Box display="flex" flexDirection="column">
              <ProjectCard
                heading={form.relatedMedia.heading}
                value={form.relatedMedia.message}
                editState={form.relatedMedia.editState}
                name={form.relatedMedia.name}
                handleEditState={setEditState}
              />
            </Box>
          </CardContent>
        </Box>

        <Box className={classes.overview}>
          <CardContent>
            <Box display="flex" flexDirection="column">
              <ProjectCard
                heading={form.finalpaper.heading}
                value={form.finalpaper.message}
                editState={form.finalpaper.editState}
                name={form.finalpaper.name}
                handleEditState={setEditState}
              />
            </Box>
          </CardContent>
        </Box>
      </Box>
    </React.Fragment>
  );
}
