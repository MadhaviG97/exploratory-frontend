import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "36ch",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
}));

export default function AllUsers() {
  const classes = useStyles();
  const forumUsers = useSelector((state) => state.forum.users);

  function getLength(obj) {
    var length = 0;
    for (var p in obj) {
      if (obj.hasOwnProperty(p)) {
        length++;
      }
    }
    return length;
  }

  return (
    <List className={classes.root}>
      <Divider variant="fullWidth" component="li" />
      {getLength(forumUsers) > 0 ? (
        forumUsers.map((user) => (
          <div>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar
                  alt={user.first_name + " " + user.last_name}
                  src={`data:image/jpeg;base64,${user.profile_picture}`}
                />
              </ListItemAvatar>
              <ListItemText
                primary={user.first_name + " " + user.last_name}
                secondary={
                  <React.Fragment>
                    <Typography
                      component="h6"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary"
                    >
                      Questions = {user.question_count}, Answers = {user.answer_count}
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </div>
        ))
      ) : (
        <div>
          <ListItem>
            <div className={classes.paper} align="center">
              <Typography variant="h6" align="right" color="primary">
                No Users Yet
              </Typography>
            </div>
          </ListItem>
        </div>
      )}
    </List>
  );
}
