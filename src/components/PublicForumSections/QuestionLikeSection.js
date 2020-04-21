import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Badge from "@material-ui/core/Badge";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    "& > *": {
      marginBottom: theme.spacing(0),
    },
    "& .MuiBadge-root": {
      marginRight: theme.spacing(0),
    },
  },
}));

export default function QuestionLike() {
  const classes = useStyles();
  const [count, setCount] = React.useState(1);
  const [invisible, setInvisible] = React.useState(false);

  const handleBadgeVisibility = () => {
    setInvisible(!invisible);
  };

  return (
    <div className={classes.root}>
      <div>
          <ButtonGroup color="primary" aria-label="outlined primary button group">
        <Button
          aria-label="increase"
          onClick={() => {
            setCount(count + 1);
          }}
        >
          <Badge color="primary" badgeContent={count}>
            <ThumbUpIcon fontSize="medium" />
          </Badge>
        </Button>
        <IconButton aria-label="delete" >
          <DeleteIcon />
        </IconButton>
        <IconButton aria-label="delete" >
          <EditIcon />
        </IconButton>
        
        </ButtonGroup>
      </div>
    </div>
  );
}
