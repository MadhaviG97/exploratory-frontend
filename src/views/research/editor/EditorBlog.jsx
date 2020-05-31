import React , { useEffect, useState } from 'react';
import classNames from "classnames";
import Footer from "../../../components/Footer/Footer";
import NavBar from "../../../components/Navbar/Navbar";
import axios from 'axios';
import Paper from "@material-ui/core/Paper";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import EditorBlogMenu from '../../../components/editor/EditorBlogMenu'
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import { useStyles } from "../../../assets/css/projectFolderGrid";
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import EditIcon from '@material-ui/icons/Edit';
import Tooltip from "@material-ui/core/Tooltip";
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import Alert from '@material-ui/lab/Alert';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { useSelector } from "react-redux";
import NotFound from '../../../components/NotFound/NotFound'
import EmptyDrive from '../../../components/editor/ProjectFolderGrid'
import Loader from "../../../components/Loader";
import NavComponent from '../../../components/AppNavigation/NavigationComponent';
export default function CreatePage(props) {
 
    const [blogs, setBlogs] = useState([])
    const classes = useStyles();
    const [name,setName]=useState('');
    const [open,setOpen]=useState(false);
    const [id,setId]=useState('');
    const [documentdeleted,setDocumentDeleted]=useState(false);
    const group=props.match.params.projectId
    const user = useSelector(state => state.user);
    let user_id=0
    if (user.userData){
        user_id=user.userData._id
    }
    const [collabs, setCollabs] = useState([])
    const [mounted, setMounted] = useState(false)
    const handleClickOpen = (id) => {
        setId(id)
        setOpen(true);
      };
    
    const handleClose = () => {
        setOpen(false);
    };
    useEffect(() => {
        const token = localStorage.token;
        const variable={group:group}
        let config = {
          headers: {
          'Authorization': `Bearer ${token}`
          }
        }
        axios.post('/editor/getBlogs',variable,config)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data.blogs)
                    setBlogs(response.data.blogs)
                } else {
                    alert('Could not get blog`s lists')
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
    const onSearchChange = (value) => {
        setName(value)
        console.log(value)
    }
    const handleSearch = (event) => {
        //console.log('yep')
        event.preventDefault();
        const token = localStorage.token;
        
        const variables = {
            group: group,
            name: name
        }
        let config = {
          headers: {
          'Authorization': `Bearer ${token}`
          }
        }
        console.log(variables)
        axios.post('/editor/searchblog', variables,config)
           .then(response => {
            if (response.data.success) {
                console.log(response.data.blogs)
                setBlogs(response.data.blogs)
            } else {
                alert('Could not get blog`s lists')
            }
            })
        
    }
    const handleDelete = () => {
        setOpen(false);
        const variable = { 
            postId:id
        }
        console.log(variable)
        const token = localStorage.token;
        let config = {
            headers: {
            'Authorization': `Bearer ${token}`
            }
          }
        
        axios.post('/editor/softdeletepost', variable,config)
            .then(response => {
                if (response.data.success) {
                    setDocumentDeleted(true)
                    setTimeout(() => {
                        window.location.reload();
                        }, 1000);
                    
                } else {
                    alert('Could not Delete Document ')
                }
            })
        
    };
    if (mounted && user.userData){
        if (collabs.some(e => e.researcher_id == user_id)){
            return(
                <div className={classNames(classes.main2)}>
                    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                        <DialogContent>
                            <DialogContentText>
                                Delete Document?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleDelete} color="primary">
                            Delete
                        </Button>
                        </DialogActions>
                    </Dialog>
                    <NavBar/>
                    <Collapse in={documentdeleted}>
                            <Alert
                            action={
                                <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    setDocumentDeleted(false);
                                }}
                                >
                                <CloseIcon fontSize="inherit" />
                                </IconButton>
                            }
                            >
                            Document Succesfully Deleted!
                            </Alert>
                        </Collapse>
                    <div >
                        <Box p={1}/>
                        <Grid container spacing={5} >
                            <Grid item xs={3}>
                            <Box p={2}/>
                                <Paper >
                                    <Box p={1.5}>
                                        <EditorBlogMenu handleSearch={handleSearch} onSearchChange={onSearchChange} group={group}/>
                                    </Box>
                                </Paper>
                            </Grid>
                            <Divider orientation="vertical" variant="fullWidth" />
                            <Grid item xs={8}>
                                <Box  style={{ display: "flex" }} flexDirection="row" > 
                                    <Box alignSelf="flex-end">
                                        <NavComponent projectId={group}/>
                                    </Box>
                                </Box>
                                <Divider  variant="fullWidth" />
                                <Box p={1} />
                                {blogs.length===0 
                                ? <EmptyDrive word='Documents'/>
                                :<Grid container spacing={4} direction="row" >
                                    {blogs.map((blog,index) => (
                                        <Grid item lg={4} md={6} xs={12}>
                                            <CardActionArea component="a" >
                                            <Card >
                                                <CardHeader
                                                    avatar={
                                                        <Avatar aria-label="recipe" className={classes.avatar}>
                                                        {blog.name[0]}
                                                        </Avatar>
                                                    }
                                                    
                                                    title={blog.name}
                                                    subheader={blog.updatedAt}
                                                />
                                                <Divider variant="middle" />
                                                <CardContent>
                                                    <div style={{ height: 150, overflowY: 'scroll', marginTop: 10 }}>
                                                        <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                                                    </div>
                                                </CardContent>
                                                <Divider variant="middle" />
                                                <CardActions disableSpacing>
                                                <Tooltip title="Edit Document">
                                                    <IconButton aria-label="delete document" href={`/document/${group}/edit/${blog._id}`} >{/*href ={`/editor/delete/${blog._id}`} */}
                                                        <EditIcon/>
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Turn to PDF format">
                                                        <IconButton aria-label="settings" href={`/document/${group}/view/${blog._id}`}>
                                                            <PictureAsPdfIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                <Tooltip title="Delete Document">
                                                    <IconButton aria-label="delete document" onClick={()=>handleClickOpen(blog._id)} >{/*href ={`/editor/delete/${blog._id}`} */}
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </Tooltip>
                                                </CardActions>
                                            
                                            </Card>
                                            </CardActionArea>
                                        </Grid>
                                    ))}
                                </Grid>
                                }
                            </Grid>
                        </Grid>
                        
                    
                    </div>
                    
                    <Box p={13.5}  /> 
                    <Footer/>
                </div>
            );
        }else{
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