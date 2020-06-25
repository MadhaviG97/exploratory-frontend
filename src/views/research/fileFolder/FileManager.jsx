import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useSelector } from "react-redux";
import Box from '@material-ui/core/Box';
import { useStyles } from "../../../assets/css/editor";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import FolderMenu from '../../../components/drive/FolderMenu'
import FilesComponent from '../../../components/drive/FilesComponent'
import DeleteIcon from '@material-ui/icons/Delete';
import EmptyFolder from '../../../components/drive/EmptyFolder'
import EmptyDrive from '../../../components/editor/ProjectFolderGrid'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from "@material-ui/core/Tooltip";
import EditIcon from '@material-ui/icons/Edit';
import history from '../../../history'
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import NotFound from '../../../components/NotFound/NotFound'
import NavComponent from '../../../components/AppNavigation/NavigationComponent';
import Loader from "../../../components/Loader";


function FileManager(props) {
    const classes = useStyles();
    const user = useSelector(state => state.user);
    let folder=props.match.params.folderId
    
    const [files, setFiles] = useState([])
    const [collabs, setCollabs] = useState([])
    const [name,setName]=useState('');
    const [deleteopen, setDeleteOpen] = React.useState(false);
    const [folders, setFolders] = useState([])
    const [anchorEl, setAnchorEl] =useState(null);
    const [mounted, setMounted] = useState(false)
    const [renameOpen, setRenameOpen] = React.useState(false);
    const [loadingfiles, setLoadingFiles] = useState(true);
    const [loadingfolders, setLoadingFolders] = useState(true);
    const [rename,setRename]=React.useState('');
    const [loadingvalidation, setLoadingValidation] = useState(true);
    const [foldervalid, setFolderValid] = useState(false);
    const group=props.match.params.projectId
    
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
        axios.post('/drive/searchfile', variables,config)
           .then(response => {
            if (response.data.success) {
                setFiles(response.data.files)
                setFolders([])
            } else {
                alert('Could not get files ')
            }
        })
        
    }
    const handleFolderDelete = () => {
        setDeleteOpen(false)
        const variable = { 
            folder:folder
        }
        const token = localStorage.token;
        let config = {
            headers: {
            'Authorization': `Bearer ${token}`
            }
          }
        axios.post('/drive/softdeletefolder', variable,config)
            .then(response => {
                if (response.data.success) {
                    setTimeout(() => {
                        history.push(`/document/${group}/filemanager`);
                        }, 1000);
                    
                } else {
                    alert('Could not Delete Folder ')
                }
            })
        setAnchorEl(null);
    };
    const handleFolderRename = () => {
        const variable = { 
            folder:folder,
            name:rename
        }
        const token = localStorage.token;
        let config = {
            headers: {
            'Authorization': `Bearer ${token}`
            }
          }
        axios.post('/drive/renamefolder', variable,config)
            .then(response => {
                if (response.data.success) {
                    setTimeout(() => {
                        history.goBack();
                        }, 1000);
                    
                } else {
                    alert('Could not Rename Folder ')
                }
            })
    };
    const handleClickOpen = () => {
        setRenameOpen(true);
      }; 
    const handleClose = () => {
        setRenameOpen(false);
    };
    const handleChange = (event) => {
        setRename(event.target.value);
    };
    useEffect(() => {
        if (folder){
            folder=props.match.params.folderId
            axios.post('/drive/findfolder', {folder:folder,group: group})
                .then(response => {
                    setLoadingValidation(false)
                    if (response.data.success) {
                        setFolderValid(true)
                    }
            })
          }
        else{
            folder="root"
            setLoadingValidation(false)
            setFolderValid(true)
          }
        const variable = { 
            folder:folder,
            group: group,
            //name: name
        }
        const token = localStorage.token;
        let config = {
            headers: {
            'Authorization': `Bearer ${token}`
            }
          }
        
        axios.post('/drive/getfolders', variable,config)
            .then(response => {
                if (response.data.success) {
                    setLoadingFolders(false)
                    setFolders(response.data.folders)
                } else {
                    alert('Could not get folders ')
                }
            })
        
        axios.post('/drive/getfiles', variable,config)
            .then(response => {
                if (response.data.success) {
                    setLoadingFiles(false)
                    setFiles(response.data.files)
                } else {
                    alert('Could not get files ')
                }
            })
        axios.post('/project/get-collaborators', variable)
        .then(response => {
            setMounted(true)
            if (response.data) {
                setCollabs(response.data)
            }
        })
    }, [])
    const handleDeleteOpen = () => {
        setDeleteOpen(true);
      };
    const handleDeleteClose = () => {
        setDeleteOpen(false);
    };
    const DeleteConfirmation=()=>{
        return (
            <Dialog open={deleteopen} onClose={handleDeleteClose} aria-labelledby="form-dialog-title">
                <DialogContent className={classes.formControl}>
                    <DialogContentText>
                        Delete Folder and All of Its Content?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleDeleteClose} variant="contained" color="primary" >
                    Cancel
                </Button>
                <Button onClick={handleFolderDelete} color="primary">
                    Delete
                </Button>
                </DialogActions>
            </Dialog>
        )
    }
    if (user.userData && mounted && !loadingfiles && !loadingfolders && !loadingvalidation){
        if (collabs.some(e => e.researcher_id == user_id) && foldervalid){
        return (
            <div style={{background: "#eceff1"}}>
                <Box p={1.3}></Box>
                <Dialog
                    open={renameOpen}
                    onClose={handleClose}
                    aria-labelledby="form-dialog-title"
                >
                <form onSubmit={handleFolderRename}>
                    <DialogContent>
                    <DialogContentText>Enter New Folder Name</DialogContentText>
                        <TextField autoFocus margin="dense" id="name" label="" inputProps={{ maxLength: 20 }} type="text" fullWidth required={true} onChange={handleChange}/>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button type="submit" color="primary" >
                            Rename
                        </Button>
                    </DialogActions>
                </form>
                </Dialog>
                <DeleteConfirmation/>
                <div style={{ height: '100%', backgroundImage: "url(/images/fileFolder/bg4.png)", minHeight: '84vh',backgroundSize: 'cover'}} >
                    <Grid container spacing={5} >
                        <Grid item xs={3} >
                            <Box p={3}/>
                            <Paper classname={classes.papermenu}>
                            <Box p={1.5} display={{ xs: 'none', sm: 'none', md: 'block' }}>
                                <FolderMenu handleSearch={handleSearch} onSearchChange={onSearchChange} folderParams={props.match.params} group={group}/>
                            </Box>
                            </Paper>
                        </Grid>
                        <Divider orientation="vertical" variant="fullWidth" />
                        <Grid item xs={8}>
                            <Box  style={{ display: "flex" }} flexDirection="row" >
                                    <NavComponent color={'#FFFFFF'} projectId={group}/>
                            </Box>
                            <Divider  variant="fullWidth" />
                            <Box p={1} />
                            
                            {files.length===0 && folders.length ===0
                            ?<div> {folder ? <EmptyFolder folder={folder}/>:<EmptyDrive word='files'/>}</div>
                            :<div>
                                {folder  
                                    ?<div>
                                        <Box  style={{ display: "flex", justifyContent: "flex-end" }} flexDirection="row" >
                                            <Tooltip title="Delete Folder">
                                                <IconButton aria-label="delete folder"  onClick={handleDeleteOpen}>
                                                    <DeleteIcon style={{ color:'#FFFFFF' }}/>
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Rename Folder">
                                                <IconButton aria-label="rename folder"  onClick={handleClickOpen}>
                                                    <EditIcon style={{ color:'#FFFFFF' }}/>
                                                </IconButton>
                                            </Tooltip>
                                        </Box>
                                        <Box p={1} />
                                    </div>
                                    :<div></div>
                                }
                                    <FilesComponent files={files} folders={folders} group={group}/>
                            </div>
                            }
                        </Grid>
                    </Grid>
                    <Box p={4}  /> 
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