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
} from "@material-ui/core";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import CommentIcon from "@material-ui/icons/Comment";
import Avatar from "@material-ui/core/Avatar";
import NavComponent from "../../components/AppNavigation/NavigationComponent";
import { useStyles } from "../../assets/css/projectNavbar";

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
                      <CommentIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Comments"
                      primaryTypographyProps={{ variant: "button" }}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleOutlineIcon color="primary" />
                    </ListItemIcon>

                    <ListItemText
                      primary="Followers"
                      primaryTypographyProps={{ variant: "button" }}
                    />
                  </ListItem>
                  <ListItem className={classes.listItem}>
                    <ListItemIcon>
                      <BorderColorIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Updates"
                      primaryTypographyProps={{ variant: "button" }}
                    />
                  </ListItem>
                </List>
              </Box>
              <Box flexGrow="1" alignSelf="flex-end">
                <List component="nav" aria-label="main mailbox folders">
                  <ListItem button className={classes.listItem}>
                    <ListItemText
                      primary={
                        <Chip
                          size="small"
                          label={props.comments}
                          color="primary"
                        />
                      }
                    />
                  </ListItem>
                  <ListItem button className={classes.listItem}>
                    <ListItemText
                      primary={
                        <Chip
                          size="small"
                          label={props.followers}
                          color="primary"
                        />
                      }
                    />
                  </ListItem>
                  <ListItem button className={classes.listItem}>
                    <ListItemText
                      primary={
                        <Chip
                          size="small"
                          label={props.updates}
                          color="primary"
                        />
                      }
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
