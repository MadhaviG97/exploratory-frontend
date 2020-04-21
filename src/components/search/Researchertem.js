import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import { red } from '@material-ui/core/colors';

import {Link} from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 600,
      margin:'10px'
    },
    avatar: {
      backgroundColor: red[500],
    },
  }),
);

export default function ResearcherItem({ResearcherItem}) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>

        <CardHeader
            avatar={
            <Avatar className={classes.avatar} src={ResearcherItem.researcher.display_image} />
            }
          title={<Link href={ResearcherItem.researcher.profile_link}>{ResearcherItem.researcher.first_name+ ' '+ResearcherItem.researcher.last_name}</Link>}
            subheader={ResearcherItem.institution}
        />
  
    </Card>
  );
}
