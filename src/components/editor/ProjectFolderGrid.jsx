import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';
import { useStyles } from "../../assets/css/projectFolderGrid";


export default function ProjectFolderGrid(props) {
  const classes = useStyles();
  const { post } = props;

  return (
    <Grid item xs={8} md={4}>
      <CardActionArea component="a" href={post.refr}>
        <Card className={classes.card}>
          <div className={classes.cardDetails}>
            <CardContent>
            <div className={classes.name} >
                  <h2 className={classes.topic}>{post.title}</h2>
                </div>
              
              
              <Typography variant="subtitle1" paragraph>
                {post.description}
              </Typography>
              
            </CardContent>
          </div>
         
            <CardMedia className={classes.cardMedia} image={post.image} title={post.imageTitle} />
          
        </Card>
      </CardActionArea>
    </Grid>
  );
}

ProjectFolderGrid.propTypes = {
  post: PropTypes.object,
};