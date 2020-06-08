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
export default function ProjectNavbar(props) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Paper className={classes.paperroot}>
        <Grid container>
          <Grid item lg={2} md={1} xs={1}></Grid>
          <Grid item lg={6} md={6} xs={6}>
            <List component="nav" aria-label="main mailbox folders">
              <ListItem className={classes.heading}>
                <ListItemText
                  primary={
                    <React.Fragment>
                      <Box display="flex" flexDirection="row">
                        <Box flexGrow="0">
                          <NavComponent projectId={props.projectId} />
                        </Box>
                        <Box flexGrow="1" alignSelf="center">
                          <Typography variant="h6">
                            {" "}
                            <Box fontWeight="fontWeightBold">
                              {props.projectName}
                            </Box>
                          </Typography>
                        </Box>
                      </Box>
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
                      <Badge
                        badgeContent={99}
                        color="secondary"
                        children={<CommentIcon color="primary" />}
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary="COMMENTS"
                      primaryTypographyProps={{ variant: "button" }}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Badge
                        badgeContent={99}
                        color="secondary"
                        children={<CheckCircleOutlineIcon color="primary" />}
                      />
                    </ListItemIcon>

                    <ListItemText
                      primary="FOLLOWER"
                      primaryTypographyProps={{ variant: "button" }}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      {/* <IconButton aria-label="settings" size="small">
                        <SettingsIcon color="primary" />
                      </IconButton> */}
                      <SettingMenu project_id={props.projectId} />
                    </ListItemIcon>

                    <ListItemText
                      primary="SETTINGS"
                      primaryTypographyProps={{ variant: "button" }}
                    />
                  </ListItem>
                </List>
              </Box>
            </Box>
          </Grid>
          <Grid item lg={1} md={1} xs={1}></Grid>
        </Grid>
      </Paper>
    </React.Fragment>
  );
}
