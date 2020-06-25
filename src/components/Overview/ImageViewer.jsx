import React from "react";
import ImgsViewer from "react-images-viewer";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import Button from "@material-ui/core/Button";

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
    dataSet: this.getImages(this.props.images),
  };

  getImages(Images) {
    if (Images) {
      var dataSet = [];
      Images.forEach((image) => {
        var object = {
          src: `${process.env.REACT_APP_BACK_END_URL}/related_images/${image.url}`,
          caption: image.caption,
          id: image.id,
        };
        dataSet.push(object);
      });
      return dataSet;
    }
    return false;
  }

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

  handleViewImage = (index) => {
    this.setState({ currImg: index, viewerIsOpen: true });
  };

  render() {
    // alert(this.state.viewerIsOpen);
    return (
      <React.Fragment style={classes.root}>
        <GridList style={classes.gridList} cols={2.5}>
          {this.state.dataSet.map((tile) => (
            <GridListTile key={tile.id}>
              <Button
                onClick={(e) => this.handleViewImage(tile.id)}
                id={`image-${tile.id}`}
              >
                <img src={tile.src} id={tile.id} />
              </Button>

              <GridListTileBar
                title={tile.caption}
                classes={{
                  root: classes.titleBar,
                  title: classes.title,
                }}
                actionIcon={
                  <IconButton>
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
          // onClickImg={() => alert("please")}
        />
      </React.Fragment>
    );
  }
}
