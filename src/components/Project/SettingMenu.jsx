import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DeleteIcon from "@material-ui/icons/Delete";
import SettingsIcon from "@material-ui/icons/Settings";
import { useHistory, useLocation } from "react-router-dom";

import { IconButton } from "@material-ui/core";

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      backgroundColor: "#d3d4d5",
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.black,
      },
    },
  },
}))(MenuItem);

export default function CustomizedMenus(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  let history = useHistory();
  let location = useLocation();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    let { from } = location.state || {
      from: { pathname: `/project/settings/${props.project_id}` },
    };
    history.replace(from);
  };

  const handleDelete = () => {
    let { from } = location.state || {
      from: { pathname: `/project/settings/${props.project_id}` },
    };
    history.replace(from);
  };

  return (
    <div>
      <IconButton aria-label="settings" size="small" onClick={handleClick}>
        <SettingsIcon color="primary" />
      </IconButton>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem onClick={handleEdit}>
          <ListItemIcon>
            <SettingsIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="EDIT" />
        </StyledMenuItem>

        <StyledMenuItem onClick={handleDelete}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="DELETE" />
        </StyledMenuItem>
      </StyledMenu>
    </div>
  );
}
