import React from "react";
import { Box, Paper, Typography, Divider, Button } from "@material-ui/core";
import { useStyles } from "../../assets/css/overviewpublic";
import PDFViewer from "pdf-viewer-reactjs";
import ImageViewer from "./ImageList";

export default function Overview(props) {
  const classes = useStyles();

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

  const Abstract = (TextProps) => {
    return (
      <React.Fragment>
        <Typography variant="button">
          {" "}
          <Box fontWeight="fontWeightBold">Abstract</Box>
        </Typography>
        <Divider />
        <Typography variant="caption">
          {TextProps.text ? TextProps.text : "To be Added..."}
        </Typography>
      </React.Fragment>
    );
  };

  const ExamplePDFViewer = (value) => {
    if (value.url) {
      return (
        <PDFViewer
          document={{
            url: "http://localhost:3000/pdf/".concat(value.url),
          }}
          scale={1.25}
          scaleStep={0.5}
          canvasCss={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          watermark={{
            text: "Exploratory", //Watermark text
            diagonal: true, // Watermark placement true for Diagonal, false for Horizontal
            opacity: 0.1, // Watermark opacity ranges from 0 to 1
            size: 100,
            color: "#000",
          }}
          navigation={{
            css: {
              navbarWrapper: {},
            },
          }}
          hideNavbar={!value.view}
        />
      );
    } else {
      return (
        <React.Fragment>
          <Typography variant="button">
            {" "}
            <Box fontWeight="fontWeightBold">Final Paper</Box>
          </Typography>
          <Divider />
          <Typography variant="caption">To be Published...</Typography>
        </React.Fragment>
      );
    }
  };
  // console.log(images[0].id);
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
            <Typography variant="button">
              {" "}
              <Box fontWeight="fontWeightBold">Related Images</Box>
            </Typography>
            <Divider />
            <ImageViewer images={props.images} />
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
