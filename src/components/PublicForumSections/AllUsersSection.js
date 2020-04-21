import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

import photo1 from "../../assets/images/user-profile/faces/marc.jpg";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

export default function AllUsers() {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src={photo1} />
        </ListItemAvatar>
        <ListItemText
          primary="Bruce Wayne"
          secondary={
            <React.Fragment>
              <Typography
                component="h6"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                Questions = 12, 
                Answers = 15
              </Typography>
            </React.Fragment>
            
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Travis Howard" src={photo1} />
        </ListItemAvatar>
        <ListItemText
          primary="Travis Howard"
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                Questions = 05, 
                Answers = 12
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Cindy Baker" src={photo1} />
        </ListItemAvatar>
        <ListItemText
          primary="Cindy Baker"
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                Questions = 00, 
                Answers = 25
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src={photo1} />
        </ListItemAvatar>
        <ListItemText
          primary="Bruce Wayne"
          secondary={
            <React.Fragment>
              <Typography
                component="h6"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                Questions = 12, 
                Answers = 15
              </Typography>
            </React.Fragment>
            
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Travis Howard" src={photo1} />
        </ListItemAvatar>
        <ListItemText
          primary="Travis Howard"
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                Questions = 05, 
                Answers = 12
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Cindy Baker" src={photo1} />
        </ListItemAvatar>
        <ListItemText
          primary="Cindy Baker"
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                Questions = 00, 
                Answers = 25
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
    </List>
  );
}
