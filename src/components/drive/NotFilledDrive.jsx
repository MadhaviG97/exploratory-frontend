
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import React from 'react'
import Box from '@material-ui/core/Box';
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Typography } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import CardActions from '@material-ui/core/CardActions';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import IconButton from '@material-ui/core/IconButton';

export default function FilledDrive(props) {
    const folders=props.folders
    const files=props.files
    const group=props.group
    const handleClick = (file) => {
        props.handleClick(file);
    };
    return (
        <Grid container spacing={4} direction="row"  >
            {folders.map((folder,index) => (
                <Grid item lg={3} md={4} xs={8}>
                    <CardActionArea component="a" href={`/document/${group}/filemanager/${folder._id}`}>
                        <Card >
                            <CardContent>
                                <div style={{ height: 140, marginBottom: 2 }}>
                                <img src={process.env.PUBLIC_URL + '/images/fileFolder/folderImage.png'} alt={folder.name} />
                                </div>
                                
                            </CardContent>
                            <Divider variant="middle" />
                            <CardActions  justify="center" >
                                <IconButton aria-label="get files"  href={`/document/${group}/filemanager/${folder._id}`}>
                                    <ArrowForwardIosIcon/>
                                </IconButton>
                                <Typography
                                component="span"
                                variant="body2"
                                color="textPrimary">
                                    {folder.name}
                                </Typography>
                            </CardActions>
                            
                        </Card>
                    </CardActionArea>
                </Grid>
            ))}
            {files.map((file,index) => (
                
            <Grid item lg={3} md={4} xs={8}>
                <CardActionArea component="a"  >
                    <Card >
                        
                        <CardContent>
                        
                            <div style={{ height: 140, marginBottom: 2 }}>
                            <img src={process.env.PUBLIC_URL + '/images/fileFolder/fileImage3.png'} alt={file.metadata.originalname} />
                            </div>
                            
                        </CardContent>
                        <Divider variant="middle" />
                        <CardActions disableSpacing>
                            
                            
                            <IconButton aria-label={`info `} 
                                onClick={
                                    handleClick(file)
                                    } >
                            <InfoIcon />
                            </IconButton>
                            <Typography
                                component="span"
                                variant="body2"
                                color="textPrimary">
                                    {file.metadata.originalname}
                            </Typography>
                        </CardActions>
                        
                        
                    </Card>
                </CardActionArea>
            </Grid>
            ))}
            
        </Grid>
    )
}