import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';

import {Box, Link, Divider, Button} from '@material-ui/core'
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 600,
      margin:'10px'
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    avatar: {
      backgroundColor: red[500],
    },
  }),
);

export default function ProjectItem({ResearchItem}) {
  const classes = useStyles();
    console.log(ResearchItem)
  return (
    <Card className={classes.root}>

        <CardHeader
            avatar={
            <Avatar className={classes.avatar} src={ResearchItem.researcher.display_image} />
            }
            title={ResearchItem.researcher.first_name+ ' '+ResearchItem.researcher.last_name+' - '+ResearchItem.institution}
            subheader={"Published on: "+ ResearchItem.published_on}
        />
        {
            ResearchItem.image ? 
            <CardMedia
                className={classes.media}
                image={ResearchItem.image}
                />
            : <div></div>
        }

        <CardContent >
            <Box fontWeight="fontWeightBold" color="secondary" component="h3">
                <Link href={ResearchItem.link}>
                    {ResearchItem.title}
                </Link>
                        
            </Box>
            <Typography variant="body2" color="textSecondary" component="p">
                {
                    ResearchItem.description.length>500 ?
                        (ResearchItem.description.slice(0,500)+'...')
                        : ResearchItem.description
                }
            </Typography>
        </CardContent>

        <Divider />

        <CardActions disableSpacing>
            <Button variant="outlined" startIcon={<BookmarkBorderIcon />}>Follow</Button>
        </CardActions>
      
    </Card>
  );
}
