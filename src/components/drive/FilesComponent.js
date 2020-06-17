import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useSelector } from "react-redux";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Alert from '@material-ui/lab/Alert';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';
import InfoIcon from '@material-ui/icons/Info';
import { Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import PDFViewer from 'pdf-viewer-reactjs'
import classNames from "classnames";
import Divider from "@material-ui/core/Divider";
import Box from '@material-ui/core/Box';
import { useStyles } from "../../assets/css/editor";
import FileSaver from 'file-saver';
import Grid from "@material-ui/core/Grid";
import Slide from '@material-ui/core/Slide'
import history from '../../history'
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
function FileComponent(props) {
    const classes = useStyles();
    const user = useSelector(state => state.user);
    console.log(user)
    let user_id=0
    if (user.userData){
        user_id=user.userData._id
    }
    const [deleteopen, setDeleteOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] =useState(null);
    const [filedeleted,setFileDeleted]=useState(false);
    const [fileshared,setFileShared]=useState(false);
    const [filenotshared,setFileNotShared]=useState(false);
    const [fileDetail, setFileDetail] = useState('')
    const [url,setUrl]=useState('')
    const [viewPdf,setViewPdf]=useState(false)
    const files=props.files
    const folders=props.folders
    const group=props.group
    const handleClick = param => event  => {
        setAnchorEl(event.currentTarget);
        setFileDetail(param)
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleClosePdf = () => {
        setViewPdf(false);
      };
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
    const handleView = () => {
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
            responseType: "arraybuffer",
            headers:config
            })
            .then(response => {
            if (response.data) {
                var file = new Blob([response.data], {type: 'application/pdf'});
                console.log(file)
                setUrl(URL.createObjectURL(file));
                setViewPdf(true)
                //pdfViewer.setAttribute("src", url)
                
            } else {
                alert('Could not View File ')
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
    const DeleteConfirmation=()=>{
        return (
            <Dialog open={deleteopen} onClose={handleDeleteClose} aria-labelledby="form-dialog-title">
                <DialogContent className={classes.formControl}>
                    <DialogContentText>
                        Delete File?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleDeleteClose} variant="contained" color="primary" >
                    Cancel
                </Button>
                <Button onClick={handleDelete} color="primary">
                    Delete
                </Button>
                </DialogActions>
            </Dialog>
        )
    }
    const FileShareAlert=()=>{
        return (
            <Collapse in={fileshared}>
                <Alert data-cy='share-alert'
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
                <Box p={1.5}></Box>
            </Collapse>
        )
    }
    const FileNotShareAlert=()=>{
        return (
            <Collapse in={filenotshared}>
                <Alert data-cy='share-alert'
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
                <Box p={1.5}></Box>
            </Collapse>
        )
    }
    const FileDeleteAlert=()=>{
        return (
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
                <Box p={1.5}></Box>
            </Collapse>
        )
    }
    const FileViewPdf=()=>{
        return (
            <Dialog fullScreen open={viewPdf} onClose={handleClosePdf} TransitionComponent={Transition}>
                <div style={{background: "#eceff1"}}>
                    <div  className={classes.background}>
                        <div style={{ width: '90%', margin: '0.1rem auto' }}>
                            <Box p={1.5}/>
                            <IconButton edge="start" color="inherit" onClick={handleClosePdf} aria-label="close">
                                <CloseIcon />
                            </IconButton>
                            <Divider  variant="fullWidth" />
                            <Box p={1}/>
                            <Box  style={{  background: '#FFFFFF'}} >
                            <PDFViewer
                                document={{
                                    url: url,
                                }}
                            />
                            </Box>
                        </div> 
                    </div>
                </div>
            </Dialog>
        )
    }
    
    
    useEffect(() => {
        
    }, [])
    
        return (
            <div >
                <FileViewPdf/>
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
                    {fileDetail.metadata && fileDetail.contentType=='application/pdf'
                        ? <MenuItem style={{ fontSize: 14 }} data-cy='share' onClick={handleView}>View File</MenuItem>
                        :<div></div>
                    }
                    {fileDetail.metadata && fileDetail.metadata.sensitivity=='private'
                        ? <MenuItem style={{ fontSize: 14 }} data-cy='share' onClick={handleShare}>Share With Public</MenuItem>
                        : <MenuItem style={{ fontSize: 14 }} data-cy='share' onClick={handleShare}>Stop Sharing</MenuItem>
                    }
                    <MenuItem style={{fontSize: 14 }} data-cy='download' onClick={fileDownload}>Download</MenuItem>
                    <MenuItem style={{ color: '#d60009',fontSize: 14 }} data-cy='delete' onClick={handleDeleteOpen}>Delete</MenuItem>
                </Menu>
                <DeleteConfirmation/>
                <FileShareAlert/>
                <FileNotShareAlert/>
                <FileDeleteAlert/>
                <Grid container spacing={3} direction="row"  >
                {folders.map((folder,index) => (
                    <Grid item lg={3} md={4} xs={8}>
                        <CardActionArea component="a" href={`/document/${group}/filemanager/${folder._id}`}>
                            <Card data-cy="folder-card">
                                <CardContent>
                                    <div style={{ height: 140, marginBottom: 2 }}>
                                    <img src={process.env.PUBLIC_URL + '/images/fileFolder/folderImage.png'} alt={folder.name} />
                                    </div>
                                </CardContent>
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
                                <CardContent data-cy="card">
                                    <div style={{ height: 140, marginBottom: 2 }}>
                                    <img src={process.env.PUBLIC_URL + '/images/fileFolder/fileImage3.png'} alt={file.metadata.originalname} />
                                    </div>
                                </CardContent>
                                <CardActions disableSpacing>
                                    <IconButton aria-label={`info `} data-cy="icon-button"
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
            </div>
            );
        
}

export default FileComponent