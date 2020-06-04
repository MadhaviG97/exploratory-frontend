import React, { useEffect, useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer.jsx";
import Button from "@material-ui/core/Button";

import ActionButtonGroup from "../TaskTracker/ActionButtons";
import Progress from "../TaskTracker/ProgressShow";
import CommentSection from "../TaskTracker/TaskComments";
import AddTask from "../TaskTracker/AddNewTask";

import { useDispatch, useSelector } from "react-redux";
import { getTasks, getCollaborators } from "../../_actions/taskTracker_actions";
import { propTypes } from "pdf-viewer-reactjs";
import { useParams, useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    minWidth: 250,
    minHeight: 550,
  },
  table: {
    minWidth: 700,
  },
  paper: {
    paddingLeft:theme.spacing(5),
    paddingRight:theme.spacing(5),
    paddingBottom:theme.spacing(1),
    paddingTop:theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    border:10
  },
  commentSection: {
    paddingLeft:theme.spacing(20),
    paddingRight:theme.spacing(20),
    paddingBottom:theme.spacing(1),
    paddingTop:theme.spacing(1),
    textAlign: "left",
    color: theme.palette.text.secondary,
  },
  title: {
    padding: theme.spacing(1),
    textAlign: "center",
    backgroundColor: "#0088cc",
    color: "#f9fbe7",
  },
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#0088cc",
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 12,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);


export default function SimpleTable() {
  const classes = useStyles();
  const {pId} = useParams();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTasks(pId));
    dispatch(getCollaborators(pId));
  }, []);
  const tasktracker = useSelector((state) => state.task_tracker);
  const collaborators = useSelector((state) => state.task_tracker.collaborators);

  function getLength(obj) {
    var length = 0;
    for (var p in obj) {
      if (obj.hasOwnProperty(p)) {
        length++;
      }
    }
    return length;
  }

  return (
    <div className={classes.root}>
      <Navbar />
      <div className={classes.root}>
        <Paper className={classes.title}>
          <Typography variant="h6" >
            Task Tracker
          </Typography>
        </Paper>

          <Progress tasks={tasktracker.tasks} />

        <div className={classes.paper}>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <StyledTableRow>
                  <StyledTableCell align="center">Task Title</StyledTableCell>
                  <StyledTableCell align="center">Description</StyledTableCell>
                  <StyledTableCell align="center">Assigned To</StyledTableCell>
                  <StyledTableCell align="center">Start Date</StyledTableCell>
                  <StyledTableCell align="center">End Date</StyledTableCell>
                  <StyledTableCell align="center">
                    Current Progress
                  </StyledTableCell>
                  <StyledTableCell align="center">Remarks</StyledTableCell>
                  <StyledTableCell align="center">
                    Assigned Date
                  </StyledTableCell>
                  <StyledTableCell align="center">Actions</StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {getLength(tasktracker.tasks) > 0 ? (
                  (tasktracker.tasks).map((task) => (
                    <StyledTableRow key={task.id}>
                      <StyledTableCell component="th" scope="row">
                        {task.title}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {task.description}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {task.first_name+" "+task.last_name}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {new Date(task.start_date).toDateString()}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {new Date(task.end_date).toDateString()}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {task.progress}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {task.remark}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {new Date(task.created_at).toDateString()}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        <ActionButtonGroup task={task} project_id={pId} collaborators={collaborators}/>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))
                ) : (
                  <TableRow>
                    <div className={classes.paper} align="center">
                      <Typography variant="h6" align="right" color="primary">
                        No Tasks
                      </Typography>
                    </div>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div className={classes.paper}  >
          <AddTask project_id={pId} collaborators={collaborators}/>
        </div>
      </div>
      <Paper className={classes.commentSection}>
      <CommentSection project_id={pId} />
      </Paper>
      
      <Footer />
    </div>
  );
}
