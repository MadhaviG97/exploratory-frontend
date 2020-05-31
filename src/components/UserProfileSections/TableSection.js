import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);

function createData(title, description, creator, collaborators, status) {
  return { title, description, creator, collaborators, status };
}

const rows = [
  createData(
    "Exploratory",
    "Online platform to connect researchers",
    "Kamal Perera",
    "Saman ,Nimal",
    "Completed"
  ),
  createData(
    "Exploratory",
    "Online platform to connect researchers",
    "Kamal Perera",
    "Saman ,Nimal",
    "Completed"
  ),
  createData(
    "Exploratory",
    "Online platform to connect researchers",
    "Kamal Perera",
    "Saman ,Nimal",
    "Completed"
  ),
  createData(
    "Exploratory",
    "Online platform to connect researchers",
    "Kamal Perera",
    "Saman ,Nimal",
    "Completed"
  ),
  createData(
    "Exploratory",
    "Online platform to connect researchers",
    "Kamal Perera",
    "Saman ,Nimal",
    "Completed"
  ),
];

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function CustomizedTables() {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Project Title</StyledTableCell>
            <StyledTableCell align="left">Description</StyledTableCell>
            <StyledTableCell align="left">Creator</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row" width={0}>
                <Link
                  component="button"
                  variant="body2"
                  onClick={() => {
                    console.info("I'm a button.");
                  }}
                >
                  {row.title}
                </Link>
              </StyledTableCell>
              <StyledTableCell align="left">{row.description}</StyledTableCell>
              <StyledTableCell align="left">{row.creator}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
