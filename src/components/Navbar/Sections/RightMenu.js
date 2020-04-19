import React from "react";
import Box from "@material-ui/core/Box";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import NavbarStyle from "../NavbarStyle";
import LinkTo from "@material-ui/core/Link";
import { Link } from "react-router-dom";
import { Badge, IconButton } from "@material-ui/core";
import NotificationsIcon from "@material-ui/icons/Notifications";

function RightMenu(props) {
  //these ara the links in the left side of the nav bar
  const classes = NavbarStyle();
  const StyledButton = withStyles({
    root: {
      background: "#014f82", //can change the sign-in button color from here
      "&:hover": {
        backgroundColor: "#003f68",
        color: "#FFF",
      },
      borderRadius: 5, //button shape

      color: "#FFFFFF", //button font color
      height: 45,
      padding: "0 30px",
      boxShadow: ["none"], //button shadow
    },
    label: {
      textTransform: "none",
    },
  })(Button);
  return (
    <div>
      <Box display="flex" flexDirection="row">
        <Box p={3} bgcolor="background.paper">
          <Link to="/signin">
            <LinkTo
              className={classes.signin}
              component="button"
              variant="body2"
            >
              SIGN IN
            </LinkTo>
          </Link>
        </Box>
        <Box display="flex" flexDirection="column">
          {/* These boxes are only here because otherwise the button will not allign with the other components in the navbar */}
          <Box p={0.75} /> {/*If better option found please apply*/}
          <StyledButton className={classes.sbutton} href="/signup">
            SIGN UP
          </StyledButton>
        </Box>
      </Box>
    </div>
  );
}
export default RightMenu;
