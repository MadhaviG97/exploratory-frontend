import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";

import publication1 from "../../assets/images/user-profile/examples/photo1.jpeg";
import publication2 from "../../assets/images/user-profile/examples/photo2.png";
import publication3 from "../../assets/images/user-profile/examples/photo3.jpg";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: 450,
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
}));

const tileData = [
  {
    img: publication1,
    title: "Project 01",
  },
  {
    img: publication2,
    title: "Project 02",
  },
  {
    img: publication3,
    title: "Project 03",
  },
  {
    img: publication2,
    title: "Project 02",
  },
  {
    img: publication3,
    title: "Project 03",
  },
  {
    img: publication1,
    title: "Project 01",
  },
];

export default function TitlebarGridList() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <GridList cellHeight={500} cols="3" spacing={10}>
        {tileData.map((tile) => (
          <GridListTile key={tile.img}>
            <img src={tile.img} alt={tile.title} />
            <GridListTileBar
              title={tile.title}
              actionIcon={
                <IconButton
                  aria-label={`info about ${tile.title}`}
                  className={classes.icon}
                >
                  <InfoIcon />
                </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}
