import React from "react";
import IconButton from "@material-ui/core/IconButton";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";

export default function SwitchLabels() {
  const [state, setState] = React.useState(false);

  const handleFollow = () => {
    // API call for following

    // API call for unFollow
    setState(!state);
  };

  const isFollowing = () => {
    if (true) {
      setState(true);
    } else {
      setState(false);
    }
  };

  React.useEffect(() => {
    // isFollowing();
  }, []);

  return (
    <React.Fragment>
      <ListItem>
        <ListItemIcon>
          <Tooltip title={state ? "following" : "follow"}>
            <IconButton
              aria-label="settings"
              size="small"
              onClick={handleFollow}
            >
              {!state ? (
                <CheckCircleOutlineIcon color="primary" />
              ) : (
                <CheckCircleIcon color="primary" />
              )}
            </IconButton>
          </Tooltip>
        </ListItemIcon>

        <ListItemText
          primary={state ? "FOLLOWING" : "FOLLOW"}
          primaryTypographyProps={{ variant: "button" }}
        />
      </ListItem>
    </React.Fragment>
  );
}
