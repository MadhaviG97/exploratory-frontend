import React from "react";
import ImgsViewer from "react-images-viewer";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import Button from "@material-ui/core/Button";

const image_0 = "/images/poster-images/default-0.jpg";
const image_1 = "/images/poster-images/default-1.jpg";
const image_2 = "/images/poster-images/default-2.jpg";

const classes = {
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
  },
  gridList: {
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)",
  },
  title: {
    color: "primary",
  },
  titleBar: {
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
  },
};

export default class ImageViwerClass extends React.Component {
  state = {
    currImg: 0,
    viewerIsOpen: false,
    dataSet: [
      {
        src: image_0,
        caption: "Image 1",
      },
      {
        src: image_1,
        caption: "Image 2",
      },
      {
        src: image_2,
        caption: "Image 3",
      },
    ],
  };

  gotoPrevious = () => {
    const prev = this.state.currImg - 1;
    this.setState({ currImg: prev });
  };

  gotoNext = () => {
    const next = this.state.currImg + 1;
    this.setState({ currImg: next });
  };

  closeViewer = () => {
    this.setState({ viewerIsOpen: false });
  };

  handleViewImage = (e) => {
    const index = e.target.id;
    this.setState({ currImg: index, viewerIsOpen: true });
  };

  render() {
    return (
      <div style={classes.root}>
        <GridList style={classes.gridList} cols={2.5}>
          {this.state.dataSet.map((tile) => (
            <GridListTile key={tile.src}>
              <Button onClick={this.handleViewImage}>
                <img
                  src={tile.src}
                  alt={tile.caption}
                  id={this.state.dataSet.indexOf(tile)}
                />
              </Button>

              <GridListTileBar
                title={tile.caption}
                classes={{
                  root: classes.titleBar,
                  title: classes.title,
                }}
                actionIcon={
                  <IconButton aria-label={`star ${tile.caption}`}>
                    <StarBorderIcon style={classes.title} />
                  </IconButton>
                }
              />
            </GridListTile>
          ))}
        </GridList>
        <ImgsViewer
          imgs={this.state.dataSet}
          currImg={this.state.currImg}
          isOpen={this.state.viewerIsOpen}
          onClickPrev={this.gotoPrevious}
          onClickNext={this.gotoNext}
          onClose={this.closeViewer}
        />
      </div>
    );
  }
}
