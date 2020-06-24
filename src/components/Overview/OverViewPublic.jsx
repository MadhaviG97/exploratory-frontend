import React from "react";
// MUI components
import { Box, Paper, Typography, Divider, Button } from "@material-ui/core";
// styles
import { useStyles } from "../../assets/css/overviewpublic";
// Components
import PDFViewer from "./PDFViewer";
import ImageViewer from "./ImageViewer";
import ItemHeader from "./ItemHeader";
import EditRelatedImages from "../Project/EditProject/EditRelatedImages";
import EditFinalPaper from "../Project/EditProject/EditFinalPaper";
import EditAbstract from "../Project/EditProject/EditAbstract";
// Routing components
import { useHistory, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Overview() {
  const classes = useStyles();
  let history = useHistory();
  let location = useLocation();
  var project = useSelector((state) => state.project);
  var user = useSelector((state) => state.user);
  let user_id = user.userData !== undefined ? user.userData._id : 0;

  const [editAbstract, setEditAbstract] = React.useState(false);
  const [editImages, setEditImages] = React.useState(false);
  const [editPaper, setEditPaper] = React.useState(false);

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
        <ItemHeader
          id="abstract-edit"
          handleEditState={() => setEditAbstract(true)}
          title="Abstract"
        />
        <EditAbstract
          onClose={() => {
            setEditAbstract(false);
          }}
          onSubmit={() => {
            setEditAbstract(false);
            history.go(0);
          }}
          open={editAbstract}
          project_id={project.project.id}
          default={project.project.abstract}
        />
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
        <ItemHeader
          id="related-images-edit"
          handleEditState={() => setEditImages(true)}
          title="Related Images"
        />
        <EditRelatedImages
          onClose={() => {
            setEditImages(false);
            history.go(0);
          }}
          open={editImages}
          id={project.project.id}
          related_images={imageProps.images}
        />
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
    if (!(PDFprops.url === "NULL" || PDFprops.url === null)) {
      return (
        <React.Fragment>
          <ItemHeader
            id="final-paper-edit"
            title="Final Paper"
            handleEditState={() => setEditPaper(true)}
          />
          <EditFinalPaper
            onClose={() => {
              setEditPaper(false);
              history.go(0);
            }}
            open={editPaper}
            id={project.project.id}
            final_paper={[PDFprops.url]}
          />

          <Divider />

          <PDFViewer
            url={PDFprops.url}
            project_id={project.project.id}
            view={PDFprops.view}
          />
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <ItemHeader
            handleEditState={() => setEditPaper(true)}
            title="Final Paper"
          />
          <EditFinalPaper
            onClose={() => {
              setEditPaper(false);
              history.go(0);
            }}
            open={editPaper}
            id={project.project.id}
            final_paper={[]}
          />
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
            <Abstract text={project.project.abstract} />
          </Paper>
        </Box>

        <Box className={classes.box}>
          <Paper className={classes.abstract}>
            <ImageView images={project.images} />
          </Paper>
        </Box>

        <Box className={classes.box}>
          <Paper className={classes.abstract}>
            <ExamplePDFViewer view={true} url={project.project.final_paper} />
          </Paper>
        </Box>

        {/* {!project.project.visibility_public && (
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
        )} */}
      </Box>
    </React.Fragment>
  );
}
