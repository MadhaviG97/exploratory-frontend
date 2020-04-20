import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Checkbox from "@material-ui/core/Checkbox";

export default function AlignItemsList(props) {
  return (
    <List dense>
      {props.items.map((item) => {
        return (
          <ListItem key={item.id} button divider>
            <ListItemAvatar>
              <Avatar
                alt="Remy Sharp"
                src="images/profile-pictures/avatar.jpg"
              />
            </ListItemAvatar>
            <ListItemText
              primary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    color="textPrimary"
                  >
                    {item.description}
                  </Typography>
                </React.Fragment>
              }
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    color="textPrimary"
                  >
                    {item.time}
                  </Typography>
                </React.Fragment>
              }
            />
            {/* <ListItemSecondaryAction>
              <Checkbox
                edge="end"
                color="primary"
                onChange={() => props.onToggle(item)}
                checked={select}
                inputProps={{ "aria-labelledby": labelId }}
              />
            </ListItemSecondaryAction> */}
          </ListItem>
        );
      })}
    </List>
  );
}
