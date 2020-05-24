import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';

import EditTask from "./EditTask";
import DeleteTask from "./DeleteTask";
import { datePickerDefaultProps } from '@material-ui/pickers/constants/prop-types';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default function ActionButtonGroup(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
        <EditTask task={props.task} project_id={props.project_id} />
        <DeleteTask task={props.task} project_id={props.project_id} />
      </ButtonGroup>
    </div>
  );
}
