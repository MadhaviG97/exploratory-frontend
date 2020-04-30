import React, { useEffect, useState } from 'react'

import axios from 'axios';
import { useSelector } from "react-redux";

import classNames from "classnames";
import Footer from "../../../components/Footer/Footer";
import NavBar from "../../../components/Navbar/Navbar";
import Box from '@material-ui/core/Box';
import { useStyles } from "../../../assets/css/editor";

import UserSection from "../../../components/PublicForumSections/FrequentUsersSection";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import '../../../assets/css/editor.css';

import FolderMenu from '../../../components/drive/FolderMenu'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import Avatar from '@material-ui/core/Avatar';


import YJSQuill from '../../../components/editor/YjsQuill';
import { Typography } from '@material-ui/core';




function Edit2Page(props) {
    const classes = useStyles();
    const user = useSelector(state => state.user);
    let folder=props.match.params.folderId
    
    const [files, setFiles] = useState([])

    
    const [folders, setFolders] = useState([])
    
    useEffect(() => {
        if (folder){
            console.log(folder)
            folder=props.match.params.folderId
          }
          else{
            folder="root"
          }
        const variable = { 
            folder:folder,
            group: "GeeFour",
            //name: name
        }
        console.log(variable)
        const token = localStorage.token;
        let config = {
            headers: {
            'Authorization': `Bearer ${token}`
            }
          }
        
        axios.post('/drive/getfolders', variable,config)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data.folders)
                    setFolders(response.data.folders)
                } else {
                    alert('Couldnt get folders ')
                }
            })
        
        axios.post('/drive/getfiles', variable,config)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data.files)
                    setFiles(response.data.files)
                } else {
                    console.log('not')
                    alert('Could not get files ')
                }
            })
            console.log('not')
    }, [])
    const filess = [
        
        {
         img: process.env.PUBLIC_URL + '/images/fileFolder/fileImage3.png' ,
          name: 'File',
          author: 'author',
        },
        {
         img: process.env.PUBLIC_URL + '/images/fileFolder/fileImage3.png',
          name: 'File',
          author: 'author',
        },
       
        {
         img:process.env.PUBLIC_URL + '/images/fileFolder/fileImage3.png' ,
          name: 'File',
          author: 'author',
        },
        {
         img: process.env.PUBLIC_URL + '/images/fileFolder/fileImage3.png',
          name: 'File',
          author: 'author',
        },
        {
         img: process.env.PUBLIC_URL + '/images/fileFolder/fileImage3.png',
          name: 'File',
          author: 'author',
        }
      ]
        return (
        <div>
            <NavBar/>
            
                <Box p={1}  style={{  background: '#014f82'}}>
                    <div className={classes.name} >
                        <h1 align='center' className={classes.title}>Drive</h1>
                    </div>
                </Box>
                
                <div className={classNames(classes.main, classes.mainRaised2)} > 
                    {/*<h3 align='center' className={classes.title2}>{ saveStatusRender() }</h3>*/}
                    
                    <Grid container spacing={5} >
                        <Grid item xs={3}>
                            <Paper >
                            <FolderMenu folderParams={props.match.params}/>
                            </Paper>
                        </Grid>
                        <Divider orientation="vertical" variant="fullWidth" />
                        
                        <Grid item xs={8}>
                            <Grid container spacing={4} direction="row"  >
                                {folders.map((folder,index) => (
                                    <Grid item lg={3} md={4} xs={8}>
                                        <CardActionArea component="a" href={`/document/filemanager/${folder._id}`}>
                                            <Card >
                                                
                                                <CardContent>
                                                
                                                    <div style={{ height: 140, marginBottom: 2 }}>
                                                    <img src={process.env.PUBLIC_URL + '/images/fileFolder/folderImage.png'} alt={folder.name} />
                                                    </div>
                                                    
                                                </CardContent>
                                                <Divider variant="middle" />
                                                <CardActions  justify="center">
                                                    
                                                    
                                                    <IconButton aria-label="delete document"  >{/*href ={`/editor/delete/${blog._id}`} */}
                                                    <DeleteIcon />
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
                                    <CardActionArea component="a" >
                                        <Card >
                                            
                                            <CardContent>
                                            
                                                <div style={{ height: 140, marginBottom: 2 }}>
                                                <img src={process.env.PUBLIC_URL + '/images/fileFolder/fileImage3.png'} alt={file.metadata.originalname} />
                                                </div>
                                                
                                            </CardContent>
                                            <Divider variant="middle" />
                                            <CardActions disableSpacing>
                                                
                                                <IconButton aria-label="share">
                                                <ShareIcon />
                                                </IconButton>
                                                <IconButton aria-label="delete document"  >{/*href ={`/editor/delete/${blog._id}`} */}
                                                <DeleteIcon />
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
                        </Grid>
                        
                    </Grid>
                    
                    <Box p={4}  /> 
                </div>
            
            <Footer/>
        </div>
        );


    }

    




export default Edit2Page
