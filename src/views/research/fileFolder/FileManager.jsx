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
import InfoIcon from '@material-ui/icons/Info';
import FolderMenu from '../../../components/drive/FolderMenu'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';

import CardActions from '@material-ui/core/CardActions';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import IconButton from '@material-ui/core/IconButton';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Typography } from '@material-ui/core';

import FileSaver from 'file-saver';



function FileManager(props) {
    const classes = useStyles();
    const user = useSelector(state => state.user);
    let folder=props.match.params.folderId
    
    const [files, setFiles] = useState([])
    const [name,setName]=useState('');
    const [fileDetail, setFileDetail] = useState('')
    const [folders, setFolders] = useState([])
    const [anchorEl, setAnchorEl] =useState(null);
    const handleClick = param => event  => {
        setAnchorEl(event.currentTarget);
        setFileDetail(param)
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const onSearchChange = (value) => {
        setName(value)
    }
    const handleSearch = (event) => {
        //console.log('yep')
        event.preventDefault();
        const token = localStorage.token;
        if (folder){
            console.log(folder)
            //folder=props.match.params.folderId
          }
          else{
            folder="root"
          }
        const variables = {
            folder:folder,
            name: name,
            group:"GeeFour"
        }
        let config = {
          headers: {
          'Authorization': `Bearer ${token}`
          }
        }
        console.log(variables)
        axios.post('/drive/searchfile', variables,config)
           .then(response => {
            if (response.data.success) {
                console.log(response.data.files)
                setFiles(response.data.files)
            } else {
                console.log('not')
                alert('Could not get files ')
            }
        })
        
    }
    const handleShare = () => {
        const variable = { 
            name:fileDetail.filename
        }
        console.log(variable)
        const token = localStorage.token;
        let config = {
            headers: {
            'Authorization': `Bearer ${token}`
            }
          }
        if (fileDetail.metadata.sensitivity=='private'){
            axios.post('/drive/sharefile', variable,config)
                .then(response => {
                    if (response.data.success) {
                        alert('File shared with public')
                        setTimeout(() => {
                            window.location.reload();
                          }, 2000);
                        
                    } else {
                        alert('Could not share ')
                    }
                })
        }
        if (fileDetail.metadata.sensitivity=='public'){
            axios.post('/drive/notsharefile', variable,config)
                .then(response => {
                    if (response.data.success) {
                        alert('Stopped Sharing with public')
                        setTimeout(() => {
                            window.location.reload();
                          }, 1000);
                        
                    } else {
                        alert('Could not stop sharing ')
                    }
                })
        }
        setAnchorEl(null);
    };
    const fileDownload = () => {
        if (folder){
            console.log(folder)
            //folder=props.match.params.folderId
          }
          else{
            folder="root"
          }
        const variable = { 
            filename:fileDetail.filename,
            group: "GeeFour",
            folder:folder
        }
        console.log(variable)
        const token = localStorage.token;
        let config = {
            'Authorization': `Bearer ${token}`
          }
          
        axios( {
            method: "POST",
            data: variable,
            url: '/drive/downloadfile',
            responseType: "blob",
            headers:config
          })
            .then(response => {
            if (response.data) {
                FileSaver.saveAs(response.data);
                
            } else {
                alert('Could not Delete File ')
            }
        })
            
        
        setAnchorEl(null);
    };
    const handleDelete = () => {
        const variable = { 
            id:fileDetail._id
        }
        console.log(variable)
        const token = localStorage.token;
        let config = {
            headers: {
            'Authorization': `Bearer ${token}`
            }
          }
        
        axios.post('/drive/deletefile', variable,config)
            .then(response => {
                if (response.data.success) {
                    alert('File Successfully Deleted')
                    setTimeout(() => {
                        window.location.reload();
                        }, 1000);
                    
                } else {
                    alert('Could not Delete File ')
                }
            })
        
        setAnchorEl(null);
    };
    useEffect(() => {
        if (folder){
            console.log(folder)
            //folder=props.match.params.folderId
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
    
        return (
        <div>
            <NavBar/>
                <Menu
                    id="simple-menu"
                    
                    anchorEl={anchorEl}
                    getContentAnchorEl={null}
                    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                    transformOrigin={{ vertical: "top", horizontal: "center" }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    MenuListProps={{ onMouseLeave: handleClose }}
                >   
                    {fileDetail.metadata && fileDetail.metadata.sensitivity=='private'
                        ? <MenuItem style={{ fontSize: 14 }} onClick={handleShare}>Share With Public</MenuItem>
                        : <MenuItem style={{ fontSize: 14 }} onClick={handleShare}>Stop Sharing</MenuItem>
                    }
                    <MenuItem style={{fontSize: 14 }} onClick={fileDownload}>Download</MenuItem>
                    <MenuItem style={{ color: '#d60009',fontSize: 14 }} onClick={handleDelete}>Delete</MenuItem>
                </Menu>
                
                
                <div className={classNames(classes.main)} > 
                    <Box p={1}  style={{  background: '#014f82'}}>
                        <div className={classes.name} >
                            <h1 align='center' className={classes.title}>Drive</h1>
                        </div>
                    </Box>
                    {/*<h3 align='center' className={classes.title2}>{ saveStatusRender() }</h3>*/}
                    
                    <Grid container spacing={5} >
                        <Grid item xs={3} >
                            <Paper >
                            <FolderMenu handleSearch={handleSearch} onSearchChange={onSearchChange} folderParams={props.match.params}/>
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
                                                <CardActions  justify="center" >
                                                    <IconButton aria-label="delete document"  href={`/document/filemanager/${folder._id}`}>
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
                        </Grid>
                        
                    </Grid>
                    
                    <Box p={4}  /> 
                </div>
            
            
        </div>
        );


    }

    




export default FileManager
