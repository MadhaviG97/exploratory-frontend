import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import { image } from "./image";
export default function (props) {
  return (
    <List>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt={props.first_name} src={props.profile_picture} />
        </ListItemAvatar>
        <ListItemText
          primary={`${props.first_name} ${props.last_name}`}
          secondary={props.institution}
        />
      </ListItem>
    </List>
  );
}
