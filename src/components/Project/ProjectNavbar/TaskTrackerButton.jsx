import React from "react";
import IconButton from "@material-ui/core/IconButton";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";
import { useHistory, useLocation, useParams } from "react-router-dom";
import AssignmentIcon from "@material-ui/icons/Assignment";

export default function SwitchLabels(props) {
  let { id } = useParams();
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || {
    from: { pathname: `/project/tasktracker/${id}` },
  };

  return (
    <React.Fragment>
      <ListItem>
        <ListItemIcon>
          <Tooltip title="Task-Tracker">
            <IconButton
              aria-label="settings"
              size="small"
              onClick={() => history.push(from.pathname)}
            >
              <AssignmentIcon color="primary" />
            </IconButton>
          </Tooltip>
        </ListItemIcon>

        <ListItemText
          primary="TASK-TRACKER"
          primaryTypographyProps={{ variant: "button" }}
        />
      </ListItem>
    </React.Fragment>
  );
}
