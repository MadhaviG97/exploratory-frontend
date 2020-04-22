import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import image1 from "../../assets/images/user-profile/bg2.jpg";
const useStyles = makeStyles({
  root: {
    maxWidth: "auto",
    paddingBottom: 10
  },
  media: {
    height: 300,
  },
});

export default function PostCard() {
  const classes = useStyles();

  return (
    <div className={classes.root} >
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={image1}
          title="Researching"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Researching
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Research has been defined in a number of different ways, and while
            there are similarities, there does not appear to be a single,
            all-encompassing definition that is embraced by all who engage in
            it. One definition of research is used by the OECD, "Any creative
            systematic activity undertaken in order to increase the stock of
            knowledge, including knowledge of man, culture and society, and the
            use of this knowledge to devise new applications."[5] Another
            definition of research is given by John W. Creswell, who states that
            "research is a process of steps used to collect and analyze
            information to increase our understanding of a topic or issue". It
            consists of three steps: pose a question, collect data to answer the
            question, and present an answer to the question.
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
    </div>
    
  );
}
