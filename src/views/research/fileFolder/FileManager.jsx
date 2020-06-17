import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useSelector } from "react-redux";
import classNames from "classnames";
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
    const [fileDetail, setFileDetail] = useState('')
    const [folders, setFolders] = useState([])
    const [anchorEl, setAnchorEl] =useState(null);
    const [filedeleted,setFileDeleted]=useState(false);
    const [mounted, setMounted] = useState(false)
    const [loadingfiles, setLoadingFiles] = useState(true);
    const [loadingfolders, setLoadingFolders] = useState(true);
    
    const [loadingvalidation, setLoadingValidation] = useState(true);
    const [foldervalid, setFolderValid] = useState(false);
    const group=props.match.params.projectId
    
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
                    setLoadingFolders(false)
                    console.log(response.data.folders)
                    setFolders(response.data.folders)
                } else {
                    alert('Could not get folders ')
                }
            })
        
        axios.post('/drive/getfiles', variable,config)
            .then(response => {
                if (response.data.success) {
                    setLoadingFiles(false)
                    console.log(response.data.files)
                    setFiles(response.data.files)
                } else {
                    console.log('not')
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
    if (user.userData && mounted && !loadingfiles && !loadingfolders && !loadingvalidation){
        if (collabs.some(e => e.researcher_id == user_id) && foldervalid){
        return (
        <div style={{background: "#eceff1"}}>
            <Box p={1.3}></Box>
                <div style={{ height: '100%', backgroundImage: "url(/images/fileFolder/bg4.png)", minHeight: '84vh',backgroundSize: 'cover'}} >
                    <Grid container spacing={5} >
                        <Grid item xs={3} >
                            <Box p={4}/>
                            <Paper classname={classes.papermenu}>
                            <Box p={1.5}>
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
                            {folder  
                                ?<div>
                                    <Box  style={{ display: "flex", justifyContent: "flex-end" }} flexDirection="row" >
                                        <Tooltip title="Delete Folder">
                                            <IconButton aria-label="delete folder"  onClick={handleFolderDelete}>
                                                <DeleteIcon/>
                                            </IconButton>
                                        </Tooltip>
                                        <NavComponent color={'#FFFFFF'} projectId={group}/>
                                    </Box>
                                    <Box p={1} />
                                </div>
                                :<div></div>
                            }
                            {files.length===0 && folders.length ===0
                            ?<div> {folder ? <EmptyFolder folder={folder}/>:<EmptyDrive word='files'/>}</div>
                            :
                                <FilesComponent files={files} folders={folders} group={group}/>
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