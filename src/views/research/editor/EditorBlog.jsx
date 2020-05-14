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
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import { useStyles } from "../../../assets/css/projectFolderGrid";
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import EditIcon from '@material-ui/icons/Edit';



export default function CreatePage(props) {
 
    const [blogs, setBlogs] = useState([])
    const classes = useStyles();
    const [name,setName]=useState('');
    useEffect(() => {
        axios.post('/editor/getBlogs')
            .then(response => {
                if (response.data.success) {
                    console.log(response.data.blogs)
                    setBlogs(response.data.blogs)
                } else {
                    alert('Couldnt get blog`s lists')
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
            //writer: "GeeFour",
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
                alert('Couldnt get blog`s lists')
            }
            })
        
    }
    const handleDelete = (id) => {
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
        
        axios.post('/editor/deletepost', variable,config)
            .then(response => {
                if (response.data.success) {
                    alert('Document Successfully Deleted')
                    setTimeout(() => {
                        window.location.reload();
                        }, 1000);
                    
                } else {
                    alert('Could not Delete Document ')
                }
            })
        
    };
    return(
        <div>
            <NavBar/>
            
            <div className={classNames(classes.main)}>
                <Box p={1}  style={{  background: '#014f82'}}>
                
                    <div className={classes.name} >
                        <h1 align='center' className={classes.title}>Documents</h1>
                    </div>
                    
                </Box>
                 {/*marginTop={7} />*/}
                 
                 
                    {/*<h3 align='center' className={classes.title2}>{ saveStatusRender() }</h3>*/}
                    <Box p={1}/>
                    <Grid container spacing={5} >
                        <Grid item xs={3}>
                            <Paper >
                            <EditorBlogMenu handleSearch={handleSearch} onSearchChange={onSearchChange}/>
                            </Paper>
                        </Grid>
                        <Divider orientation="vertical" variant="fullWidth" />
                        
                        <Grid item xs={8}>
                            <Grid container spacing={4} direction="row" >
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
                                                action={
                                                <IconButton aria-label="settings">
                                                    <MoreVertIcon />
                                                </IconButton>
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
                                            <IconButton aria-label="delete document" href={`/document/edit/${blog._id}`} >{/*href ={`/editor/delete/${blog._id}`} */}
                                                <EditIcon/>
                                            </IconButton>
                                                
                                                <IconButton aria-label="delete document" onClick={()=>handleDelete(blog._id)} >{/*href ={`/editor/delete/${blog._id}`} */}
                                                <DeleteIcon />
                                                </IconButton>
                                            </CardActions>
                                        
                                        </Card>
                                        </CardActionArea>
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                    </Grid>
                
               
            </div>
            
            
        </div>
    );

}