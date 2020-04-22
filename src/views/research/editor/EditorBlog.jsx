import React , { useEffect, useState } from 'react';
import classNames from "classnames";
import Footer from "../../../components/Footer/Footer";
import NavBar from "../../../components/Navbar/Navbar";
import axios from 'axios';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import { useStyles } from "../../../assets/css/projectFolderGrid";
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';




export default function CreatePage(props) {
 
    const [blogs, setBlogs] = useState([])
    const classes = useStyles();
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
    
    return(
        <div>
            <NavBar/>
            <Box p={2}></Box>
            <div className={classNames(classes.main, classes.mainRaised)}>

                <Box p={5}/> {/*marginTop={7} />*/}
                <div style={{ width: '85%', margin: '3rem auto' }}>
                    <div className={classes.name}  >
                        <h1 align='center' className={classes.title}>Group Name</h1>
                    </div>
                    <Box p={1} />
                    <Grid container spacing={4} direction="row" justify="center" alignItems="center">
                        {blogs.map((blog,index) => (
                        <Grid item lg={4} md={6} xs={12}>
                            <CardActionArea component="a" href={`/document/edit/${blog._id}`}>
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
                                    
                                    <IconButton aria-label="share">
                                    <ShareIcon />
                                    </IconButton>
                                    <IconButton aria-label="delete document"  >{/*href ={`/editor/delete/${blog._id}`} */}
                                    <DeleteIcon />
                                    </IconButton>
                                </CardActions>
                                
                                
                            </Card>
                            </CardActionArea>
                        </Grid>
                    ))}
                    </Grid>
                </div>
                
                
                <Box p={2}></Box>
            </div>
            
            <Footer/>
        </div>
    );

}