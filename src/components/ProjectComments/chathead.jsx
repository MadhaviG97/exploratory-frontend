import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Badge from "@material-ui/core/Badge";
import MailIcon from "@material-ui/icons/Mail";
import Box from "@material-ui/core/Box";
import { TextField } from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import ChatThread from "./chatThread";

const chats = [
  {
    id: 10002,
    first_name: "malani",
    last_name: "fonseka",
    university: "University of Moratuwa",
    email: "melani@123.com",
    profile_picture: "avatar-2.jpg",
    count: 2,
  },
  {
    id: 10003,
    first_name: "gamlath",
    last_name: "perera",
    university: "University of Moratuwa",
    email: "gamlath@123.com",
    profile_picture: "avatar-3.jpg",
    count: 2,
  },
  {
    id: 10004,
    first_name: "peshaka",
    last_name: "dhananjaya",
    university: "University of Moratuwa",
    email: "peshaka@123.com",
    profile_picture: "avatar-4.jpg",
    count: 2,
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    alignItems: "center",
    padding: theme.spacing(1),
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
    padding: theme.spacing(0, 4),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
    padding: theme.spacing(0, 4),
  },
}));

export default function Comments() {
  return (
    <React.Fragment>
      {chats.map((chat) => {
        return <CommentHeads chat={chat} />;
      })}
    </React.Fragment>
  );
}

function CommentHeads(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className={classes.root}>
      <Grid md="12">
        <ExpansionPanel
          style={{ elevation: 5 }}
          expanded={expanded === "panel4"}
          onChange={handleChange("panel4")}
        >
          <ExpansionPanelSummary
            aria-controls="panel4bh-content"
            id="panel4bh-header"
          >
            <Box>
              <Avatar
                src={"/images/profile-pictures/".concat(
                  props.chat.profile_picture
                )}
              />
            </Box>
            <Box flexGrow="1">
              <Typography variant="button" className={classes.heading}>
                {props.chat.first_name.concat(" ").concat(props.chat.last_name)}
              </Typography>
              <Typography className={classes.secondaryHeading}>
                {props.chat.university}
              </Typography>

              {/* <Typography variant="button" className={classes.heading}>
                {props.chat.first_name.concat(" ").concat(props.chat.last_name)}
              </Typography> */}
            </Box>

            <Box>
              <Badge color="secondary" badgeContent={props.chat.count} showZero>
                <MailIcon />
              </Badge>
            </Box>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <CardContent>
              <ChatThread />
            </CardContent>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </Grid>
    </div>
  );
}
