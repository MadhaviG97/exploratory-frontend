import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  text: {
    padding: theme.spacing(2, 2, 0),
  },
  paper: {
    paddingBottom: 50,
  },
  list: {
    marginBottom: theme.spacing(2),
  },
  subheader: {
    backgroundColor: theme.palette.background.paper,
  },
  appBar: {
    top: "auto",
    bottom: 0,
  },
  grow: {
    flexGrow: 1,
  },
  fabButton: {
    position: "absolute",
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: "0 auto",
  },
}));

export default function DeleteComment(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("Confirm delete Comment!");
  const [type, setType] = React.useState("reply");

  const handleClickOpen = () => {
    const formData = {
      id: props.reply_id,
    };
    axios
      .post("/project/comments/get-reply", formData)
      .then((response) => {
        console.log(response.data);
        if (response.data === 1) {
          setMessage("Confirm you want to delete the whole Thread!!!");
          setType("comment");
        }
        setOpen(true);
      })
      .catch((err) => console.log(err));
  };

  const deleteReply = () => {
    const formData = {
      id: props.reply_id,
    };
    axios
      .post("/project/comments/delete-reply", formData)
      .then((response) => {
        setOpen(false);
        props.onPost();
        props.onReplyDelete();
      })
      .catch((err) => console.log(err));
  };

  const deleteComment = () => {
    const formData = {
      id: props.comment_id,
    };
    axios
      .post("/project/comments/delete-comment", formData)
      .then((response) => {
        setOpen(false);
        props.onCommentDelete();
      })
      .catch((err) => console.log(err));
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePost = () => {
    setOpen(false);
    if (type === "reply") {
      deleteReply();
    } else {
      deleteComment();
    }
  };

  return (
    <React.Fragment>
      <IconButton color="primary" aria-label="delete" onClick={handleClickOpen}>
        <DeleteIcon />
      </IconButton>

      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">{message}</DialogTitle>

        <DialogActions>
          <Button
            onClick={handleClose}
            align="left"
            color="primary"
            variant="outlined"
          >
            Cancel
          </Button>
          <Button onClick={handlePost} color="primary" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
