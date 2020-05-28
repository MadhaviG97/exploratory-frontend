import React, { useEffect, useState } from 'react'

import axios from 'axios';
import { useSelector } from "react-redux";

import classNames from "classnames";
import Footer from "../../../components/Footer/Footer";
import NavBar from "../../../components/Navbar/Navbar";
import Box from '@material-ui/core/Box';
import { useStyles } from "../../../assets/css/editor";

import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import '../../../assets/css/editor.css';
import InfoIcon from '@material-ui/icons/Info';
import FolderMenu from '../../../components/drive/FolderMenu'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import EmptyDrive from '../../../components/editor/ProjectFolderGrid'
import CardActions from '@material-ui/core/CardActions';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import IconButton from '@material-ui/core/IconButton';
import NotFound from '../../../components/NotFound/NotFound'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import NavComponent from '../../../components/AppNavigation/NavigationComponent';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Typography } from '@material-ui/core';

import Alert from '@material-ui/lab/Alert';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';
import Loader from "../../../components/Loader";
import FileSaver from 'file-saver';



function FileManager(props) {
    const classes = useStyles();
    const user = useSelector(state => state.user);
    let folder=props.match.params.folderId
    
    const [files, setFiles] = useState([])
    const [collabs, setCollabs] = useState([])
    const [name,setName]=useState('');
    const [deleteopen, setDeleteOpen] = React.useState(false);
    const [fileDetail, setFileDetail] = useState('')
    const [folders, setFolders] = useState([])
    const [anchorEl, setAnchorEl] =useState(null);
    const [filedeleted,setFileDeleted]=useState(false);
    const [fileshared,setFileShared]=useState(false);
    const [filenotshared,setFileNotShared]=useState(false);
    const group=props.match.params.projectId
    const handleClick = param => event  => {
        setAnchorEl(event.currentTarget);
        setFileDetail(param)
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    console.log(user.userData)
    let user_id=0
    if (user.userData){
        user_id=user.userData._id
    }
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
            group:group
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
                setFolders([])
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
                        setFileShared(true)
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
                        setFileNotShared(true)
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
        
        const variable = { 
            filename:fileDetail.filename
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
                alert('Could not Download File ')
            }
        })
        setAnchorEl(null);
    };
    const handleDeleteOpen = () => {
        setDeleteOpen(true);
      };
    
    const handleDeleteClose = () => {
        setDeleteOpen(false);
    };
    const handleDelete = () => {
        setDeleteOpen(false)
        const variable = { 
            filename:fileDetail.filename
        }
        console.log(variable)
        const token = localStorage.token;
        let config = {
            headers: {
            'Authorization': `Bearer ${token}`
            }
          }
        axios.post('/drive/softdeletefile', variable,config)
            .then(response => {
                if (response.data.success) {
                    setFileDeleted(true)
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
            folder=props.match.params.folderId
          }
          else{
            folder="root"
          }
        const variable = { 
            folder:folder,
            group: group,
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
                    alert('Could not get folders ')
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
        axios.post('/project/get-collaborators', variable)
        .then(response => {
            if (response.data) {
                setCollabs(response.data)
                
            }
        })
    }, [])
    if (user.userData){
        if (collabs.some(e => e.researcher_id == user_id)){
        return (
        <div >
            <Dialog open={deleteopen} onClose={handleDeleteClose} aria-labelledby="form-dialog-title">
                <DialogContent>
                    <DialogContentText>
                        Delete File?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleDeleteClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleDelete} color="primary">
                    Delete
                </Button>
                </DialogActions>
            </Dialog>
            <NavBar/>
            <div >
                <Collapse in={fileshared}>
                    <Alert
                    action={
                        <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                            setFileShared(false);
                        }}
                        >
                        <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                    >
                    File Shared With Public!
                    </Alert>
                </Collapse>
                <Collapse in={filedeleted}>
                    <Alert
                    action={
                        <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                            setFileDeleted(false);
                        }}
                        >
                        <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                    >
                    File Successfully Deleted!
                    </Alert>
                </Collapse>
                <Collapse in={filenotshared}>
                    <Alert
                    action={
                        <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                            setFileNotShared(false);
                        }}
                        >
                        <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                    >
                    Stopped Sharing With Public!
                    </Alert>
                </Collapse>
            </div>
            <Box p={1.3}></Box>
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
                    <MenuItem style={{ color: '#d60009',fontSize: 14 }} onClick={handleDeleteOpen}>Delete</MenuItem>
                </Menu>
                
                
                <div className={classNames(classes.main2)} >
                    <Grid container spacing={5} >
                        <Grid item xs={3} >
                            <Box p={2}/>
                            <Paper classname={classes.papermenu}>
                            <Box p={1.5}>
                                <FolderMenu handleSearch={handleSearch} onSearchChange={onSearchChange} folderParams={props.match.params} group={group}/>
                            </Box>
                            </Paper>
                        </Grid>
                        <Divider orientation="vertical" variant="fullWidth" />
                        <Grid item xs={8}>
                            <Box  style={{ display: "flex" }} flexDirection="row" >
                                    <NavComponent projectId={group}/>
                            </Box>
                            <Divider  variant="fullWidth" />
                            <Box p={1} />
                            <Box boxShadow={2} >
                                <Box p={1}  style={{  background: '#FFFFFF'}}>
                                        <h1 align='center' className={classes.topic4}>Drive</h1>
                                </Box>
                            </Box>
                            <Box p={1.5}/>
                            {files.length===0 && folders.length ===0
                            ? <EmptyDrive word='files'/>
                            :<Grid container spacing={4} direction="row"  >
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
                            }
                        </Grid>
                    </Grid>
                    <Box p={10.3}  /> 
                    <Footer/>
                </div>
            </div>
            );
        }
        else{
            return(
            <NotFound/>
            );
        }
    }else{
        return(
            <Loader />
        )
    }

}

export default FileManager
