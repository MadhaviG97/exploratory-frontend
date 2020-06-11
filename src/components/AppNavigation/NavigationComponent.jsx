import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import history from "../../history";
import AppsIcon from "@material-ui/icons/Apps";
import Box from "@material-ui/core/Box";
import CardActionArea from "@material-ui/core/CardActionArea";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import { useStyles } from "../../assets/css/editor";
import { Typography, Icon } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";

import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import { useSelector } from "react-redux";
import Tooltip from "@material-ui/core/Tooltip";
export default function NavigationComponent(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const projectId = props.projectId;
  const [filecreated, setFileCreated] = React.useState(false);
  const user = useSelector((state) => state.user);
  const project = useSelector((state) => state.project);
  const [isCollaborator, setIsCollaborator] = React.useState(false);

  const checkIsCollaborator = (logged_in_user) => {
    var collaborators = project.collaborators.concat(project.admins);
    var i;
    for (i = 0; i < collaborators.length; i++) {
      if (collaborators[i].researcher_id === logged_in_user) {
        return true;
      }
    }
    return false;
  };

  React.useEffect(() => {
    var user_id = user.userData ? user.userData._id : null;
    if (user_id) {
      setIsCollaborator(checkIsCollaborator(user_id));
    } else {
      setIsCollaborator(false);
    }
  }, []);

  const grid = isCollaborator
    ?[ [
      {
        refr: `/project/tasktracker/${projectId}`,
        name: "Task...",
        tooltip: "Task Tracker",
        image: process.env.PUBLIC_URL + "/images/appnav/document.png",
      },
      {
        refr: `/document/${projectId}/filemanager`,
        name: "Drive",
        tooltip: "Drive",
        image: process.env.PUBLIC_URL + "/images/appnav/file.png",
      },
      {
        refr: `/project/whiteboard/join-room/${projectId}`,
        name: "Whiteb...",
        tooltip: "Share Whiteboards",
        image: process.env.PUBLIC_URL + "/images/appnav/business.png",
      },
    ],
    [
      {
        refr: `/document/${projectId}/editorblog`,
        name: "Editor",
        tooltip: "Editor",
        image: process.env.PUBLIC_URL + "/images/appnav/communication.png",
      },
      {
        refr: `/screenshare/${projectId}/send`,
        name: "Share...",
        tooltip: "Share Screen",
        image: process.env.PUBLIC_URL + "/images/appnav/buildings.png",
      },
      {
        refr: `/screenshare/${projectId}/receive`,
        name: "Access...",
        tooltip: "Access Remote Screen",
        image: process.env.PUBLIC_URL + "/images/appnav/computer.png",
      },
      
    ],
    [
      
      {
        refr: `/document/${projectId}/compare`,
        name: "Compare...",
        tooltip: "Compare Documents",
        image: process.env.PUBLIC_URL + "/images/appnav/squares.png",
      },
    ],
  ]
    : [
        [
          {
            refr: `/document/${projectId}/filemanager`,
            name: "Drive",
            tooltip: "Drive",
            image: process.env.PUBLIC_URL + "/images/appnav/file.png",
          },
          {
            refr: `/tasktracker`,
            name: "Task...",
            tooltip: "Task Tracker",
            image: process.env.PUBLIC_URL + "/images/appnav/document.png",
          },
        ],
        [
          {
            refr: `/document/${projectId}/editorblog`,
            name: "Editor",
            tooltip: "Editor",
            image: process.env.PUBLIC_URL + "/images/appnav/communication.png",
          },

          {
            refr: `/document/${projectId}/compare`,
            name: "Compare...",
            tooltip: "Compare Documents",
            image: process.env.PUBLIC_URL + "/images/appnav/squares.png",
          },
        ],
      ];
  
  //attributes should go to flaticon.com for the icons used
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (event) => {
    setName(event.target.value);
  };

  return (
    <React.Fragment>
      <Tooltip title="Apps">
        <IconButton aria-label="apps" size="small" onClick={handleClickOpen}>
          <AppsIcon color="primary" />
        </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle
          disableTypography
          className={classes.dialogTitle}
          style={{ background: "#eceff1" }}
        >
          <IconButton id="app-close" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent style={{ background: "#eceff1" }}>
          <Grid container className={classes.root} spacing={2}>
            <Grid item xs={12} align="center">
              {grid.map((row) => (
                <Grid
                  container
                  justify="center"
                  alignItems="center"
                  spacing={3}
                >
                  {row.map((item) => (
                    <Grid item key={item.name} item align="center">
                      <Tooltip title={item.tooltip} arrow>
                        <CardActionArea href={item.refr}>
                          <Paper
                            className={classes.paperGrid}
                            style={{ background: "#FFFFFF" }}
                          >
                            <Box p={0.5}></Box>
                            <Avatar
                              variant="square"
                              alt={item.tooltip}
                              src={item.image}
                              className={classes.large}
                            />
                            <Box p={0.5}></Box>
                            <Typography style={{ fontSize: 13 }}>
                              {" "}
                              {item.name}
                            </Typography>
                          </Paper>
                        </CardActionArea>
                      </Tooltip>
                    </Grid>
                  ))}
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Box p={4} />
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}