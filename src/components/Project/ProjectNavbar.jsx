import React from "react";
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Grid,
  Typography,
  Paper,
  Badge,
  IconButton,
} from "@material-ui/core";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import CommentIcon from "@material-ui/icons/Comment";
import Avatar from "@material-ui/core/Avatar";
import NavComponent from "../../components/AppNavigation/NavigationComponent";
import { useStyles } from "../../assets/css/projectNavbar";
import SettingsIcon from "@material-ui/icons/Settings";
import SettingMenu from "./SettingMenu";
import FollowButton from "./FollowButton";
import { useSelector } from "react-redux";

export default function ProjectNavbar(props) {
  const classes = useStyles();

  var project = useSelector((state) => state.project);
  var user = useSelector((state) => state.user);

  const [isCollaborator, setIsCollaborator] = React.useState(false);

  const checkIsCollaborator = (logged_in_user) => {
    var collaborators = project.collaborators.concat(project.admins);
    var i;
    for (i = 0; i < collaborators.length; i++) {
      if (collaborators[i].researcher_id === logged_in_user) {
        return true;
      }
    }
    return false;
  };

  React.useEffect(() => {
    var user_id = user.userData ? user.userData._id : null;
    if (user_id) {
      setIsCollaborator(checkIsCollaborator(user_id));
    } else {
      setIsCollaborator(false);
    }
  }, []);

  return (
    <React.Fragment>
      <Paper className={classes.paperroot}>
        <Grid container>
          <Grid item lg={2} md={2} xs={2}></Grid>
          <Grid item lg={6} md={6} xs={6}>
            <List component="nav" aria-label="main mailbox folders">
              <ListItem className={classes.heading}>
                <ListItemText
                  primary={
                    <React.Fragment>
                      <Typography variant="h6">
                        {" "}
                        <Box fontWeight="fontWeightBold">
                          {props.projectName}
                        </Box>
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
              <ListItem className={classes.heading}>
                <ListItemIcon>
                  <Avatar sizes="small" src={props.authour_image}></Avatar>
                  {/* <AccountCircleIcon color="primary" /> */}
                </ListItemIcon>
                <ListItemText
                  primary={props.authour}
                  primaryTypographyProps={{ variant: "h6" }}
                />
              </ListItem>
              <ListItem className={classes.heading}>
                <ListItemText
                  style={{
                    width: "100px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                  primary={props.description}
                  primaryTypographyProps={{ variant: "body2" }}
                />
              </ListItem>
            </List>
          </Grid>
          <Grid item lg={3} md={3} xs={3}>
            <Box display="flex" flexDirection="row">
              <Box flexGrow="0" alignSelf="flex-end">
                <List component="nav" aria-label="main mailbox folders">
                  <ListItem className={classes.listItem}>
                    <ListItemIcon>
                      <NavComponent projectId={props.projectId} />
                    </ListItemIcon>
                    <ListItemText
                      primary="APPS"
                      primaryTypographyProps={{ variant: "button" }}
                    />
                  </ListItem>

                  <FollowButton />

                  {isCollaborator && (
                    <ListItem>
                      <ListItemIcon>
                        <SettingMenu project_id={props.projectId} />
                      </ListItemIcon>

                      <ListItemText
                        primary="SETTINGS"
                        primaryTypographyProps={{ variant: "button" }}
                      />
                    </ListItem>
                  )}
                </List>
              </Box>
            </Box>
          </Grid>
          <Grid item lg={1} md={0} xs={0}></Grid>
        </Grid>
      </Paper>
    </React.Fragment>
  );
}
