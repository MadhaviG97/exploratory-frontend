import React from "react";
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Typography,
  Paper,
} from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import CommentIcon from "@material-ui/icons/Comment";

import { useStyles } from "../../assets/css/projectNavbar";

export default function ProjectNavbar(props) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Paper className={classes.paperroot}>
        <Box display="flex" flexDirection="row" className={classes.root}>
          <Box flexGrow="2">
            <List component="nav" aria-label="main mailbox folders">
              <ListItem className={classes.heading}>
                <ListItemText
                  primary={
                    <Typography variant="h6">
                      {" "}
                      <Box fontWeight="fontWeightBold">{props.projectName}</Box>
                    </Typography>
                  }
                />
              </ListItem>
              <ListItem className={classes.heading}>
                <ListItemIcon>
                  <AccountCircleIcon color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary={props.authour}
                  primaryTypographyProps={{ variant: "h6" }}
                />
              </ListItem>
              <ListItem className={classes.heading}>
                <ListItemText
                  primary={props.description}
                  primaryTypographyProps={{ variant: "body2" }}
                />
              </ListItem>
            </List>
          </Box>

          <Box flexGrow="0" display="flex" flexDirection="row">
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
                <ListItem className={classes.listItem}>
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
        </Box>
      </Paper>
    </React.Fragment>
  );
}
