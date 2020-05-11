import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Badge from "@material-ui/core/Badge";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";

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

export default function AnswerLike() {
  const classes = useStyles();
  const [count, setCount] = React.useState(0);
  const [invisible, setInvisible] = React.useState(false);

  const handleBadgeVisibility = () => {
    setInvisible(!invisible);
  };

  return (
    <div className={classes.root}>
      <div>
        <Button
          size="small"
          aria-label="increase"
          onClick={() => {
            setCount(count + 1);
          }}
        >
          <Badge color="primary" badgeContent={count} fontSize="small">
            <ThumbDownIcon fontSize="small" />
          </Badge>
        </Button>
      </div>
    </div>
  );
}
