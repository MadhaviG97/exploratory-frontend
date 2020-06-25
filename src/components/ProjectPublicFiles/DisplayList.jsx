import React from "react";
import { useStyles } from "../../assets/css/team";
import { Paper, Grid, Box } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import GetAppIcon from "@material-ui/icons/GetApp";
import IconButton from "@material-ui/core/IconButton";
import FileSaver from "file-saver";
import axios from "axios";
import Tooltip from "@material-ui/core/Tooltip";

export default function Team(props) {
  const classes = useStyles();
  function FormRow() {
    return <React.Fragment></React.Fragment>;
  }

  const fileDownload = (filename) => {
    const variable = {
      filename: filename,
    };
    console.log(variable);
    const token = localStorage.token;
    let config = {
      Authorization: `Bearer ${token}`,
    };

    axios({
      method: "POST",
      data: variable,
      url: "/drive/downloadfile",
      responseType: "blob",
      headers: config,
    }).then((response) => {
      if (response.data) {
        FileSaver.saveAs(response.data);
      } else {
        alert("Could not Download File ");
      }
    });
  };
  return (
    <Box className={classes.container} display="flex" flexDirection="column">
      {props.files ? (
        props.files.map((file) => {
          return (
            <Box className={classes.box}>
              <Paper className={classes.abstract} elevation={3}>
                <Grid container xs={12} md={12} spacing={3} direction="row">
                  <Grid item xs={4}>
                    <div>
                      <Typography variant="subtitle1" color="textPrimary">
                        {" "}
                        <Box fontWeight="fontWeightBold">
                          {file.metadata.originalname}
                        </Box>
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        {" "}
                        <Box fontWeight="fontWeightBold">
                          Content Type : {file.contentType}
                        </Box>
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        {" "}
                        <Box fontWeight="fontWeightBold">
                          Date Uploaded : {file.uploadDate}
                        </Box>
                      </Typography>
                    </div>
                  </Grid>
                  <Grid item xs={8} align="right">
                    <Box
                      style={{ display: "flex", justifyContent: "flex-end" }}
                    >
                      <Tooltip title="Download File">
                        <IconButton
                          aria-label="download document"
                          onClick={() => fileDownload(file.filename)}
                          color="primary"
                        >
                          <GetAppIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Grid>
                </Grid>
              </Paper>
            </Box>
          );
        })
      ) : (
        <img src="/images/project/Empty.png" />
      )}
    </Box>
  );
}
