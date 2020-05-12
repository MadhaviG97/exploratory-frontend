import React from "react";
import { Box, Paper, Typography, Divider, Button } from "@material-ui/core";
import { useStyles } from "../../assets/css/overviewpublic";
import PDFViewer from "./PDFViewer";
import ImageViewer from "./ImageViewer";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import ItemHeader from "./ItemHeader";

export default function Overview() {
  const classes = useStyles();
  let history = useHistory();
  let location = useLocation();
  var project = useSelector((state) => state.project);
  var user = useSelector((state) => state.user);
  let user_id = user.userData !== undefined ? user.userData._id : 0;

  //props.project.abstract
  const text =
    "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut ";

  //props.project.final paper
  const url = "test.pdf";

  //props.project.visibility_public
  const visibility_public = 1 ? true : false;

  const [state, setState] = React.useState({
    requested: false,
  });

  const handleRequest = () => {
    //implement API call
    setState({
      requested: !state.requested,
    });
  };

  const handleEditState = () => {
    let { from } = location.state || {
      from: { pathname: `/project/settings/${project.project.id}` },
    };
    history.replace(from);
  };

  const Abstract = (TextProps) => {
    return (
      <React.Fragment>
        <ItemHeader handleEditState={handleEditState} title="Abstract" />
        <Divider />
        <Typography variant="caption">
          {TextProps.text ? TextProps.text : "To be Added..."}
        </Typography>
      </React.Fragment>
    );
  };

  const ImageView = (imageProps) => {
    return (
      <React.Fragment>
        <ItemHeader handleEditState={handleEditState} title="Related Images" />
        <Divider />
        {imageProps.images ? (
          <ImageViewer images={imageProps.images} />
        ) : (
          <Typography variant="caption">No related Images</Typography>
        )}
      </React.Fragment>
    );
  };

  const ExamplePDFViewer = (PDFprops) => {
    if (PDFprops.url) {
      return (
        <React.Fragment>
          <ItemHeader handleEditState={handleEditState} title="" />
          <Divider />
          <PDFViewer url={PDFprops.url} view={PDFprops.view} />
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <ItemHeader handleEditState={handleEditState} title="Final Paper" />
          <Divider />
          <Typography variant="caption">To be Published...</Typography>
        </React.Fragment>
      );
    }
  };

  return (
    <React.Fragment>
      <Box className={classes.container} display="flex" flexDirection="column">
        <Box className={classes.box}>
          <Paper className={classes.abstract} elevation={3}>
            <Abstract text={text} />
          </Paper>
        </Box>

        <Box className={classes.box}>
          <Paper className={classes.abstract}>
            <ImageView images={project.images} />
          </Paper>
        </Box>

        <Box className={classes.box}>
          <Paper className={classes.abstract}>
            <ExamplePDFViewer view={visibility_public} url={url} />
          </Paper>
        </Box>

        {!visibility_public && (
          <Box className={classes.box}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleRequest}
              disabled={state.requested}
            >
              <Typography variant="overline" display="block">
                request permission
              </Typography>
            </Button>
          </Box>
        )}
      </Box>
    </React.Fragment>
  );
}
