import React from "react";
import { Box, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import EditProject from "./EditProject";

export default function ItemHeader(props) {
  var project = useSelector((state) => state.project);
  var user = useSelector((state) => state.user);
  let user_id;
  if (user.userData !== undefined) {
    user_id = user.userData._id;
  } else {
    user_id = 0;
  }

  const isCollaborator = (logged_in_user) => {
    var collaborators = project.collaborators.concat(project.admins);
    var i;
    for (i = 0; i < collaborators.length; i++) {
      if (collaborators[i].researcher_id === logged_in_user) {
        return true;
      }
    }
    return false;
  };

  return (
    <Box display="flex" flexDirection="row">
      <Box flexGrow="1" py={2}>
        <Typography variant="button">
          {" "}
          <Box fontWeight="fontWeightBold">{props.title}</Box>
        </Typography>
      </Box>
      {user_id !== 0 && isCollaborator(user_id) && (
        <EditProject id={props.id} handleEditState={props.handleEditState} />
      )}
    </Box>
  );
}
