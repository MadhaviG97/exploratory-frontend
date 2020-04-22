import React from 'react';
import classNames from "classnames";
import Footer from "../../../components/Footer/Footer";
import NavBar from "../../../components/Navbar/Navbar";

import Box from '@material-ui/core/Box';
import { useStyles } from "../../../assets/css/projectFolderGrid";
import Typography from "@material-ui/core/Typography";
import { Button } from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import ProjectFolderGrid from '../../../components/editor/ProjectFolderGrid';
import FileCopyIcon from '@material-ui/icons/FileCopy';
const featuredPosts = [
    {
    title: 'My Drive',
    
    description:
        '',
    image: 'https://source.unsplash.com/random',
    imageText: 'Image Text',
    },
    {
    title: 'Document Editor',
    
    description:
        '',
    image: 'https://source.unsplash.com/random',
    imageText: 'Image Text',
    },
];

export default function CreatePage(props) {
 

    const classes = useStyles();
    return(
        <div>
            <NavBar/>
            <Box p={0.5}></Box>
            <div className={classNames(classes.main, classes.mainRaised)}>
                <Box p={5} marginTop={7} />
                <div className={classes.name}  >
                    <h1 align='center' className={classes.title}>Group Name</h1>
                </div>
                <Box p={1} />
                <Grid container spacing={4} direction="row" justify="center" alignItems="center">
                    {featuredPosts.map((post) => (
                    <ProjectFolderGrid key={post.title} post={post} />
                    ))}
                </Grid>
                <Box p={5} marginTop={1} />
                <div className={classes.name} >
                    <h2 align='center' className={classes.title}>Compare Two Documents</h2>
                </div>
                <Box p={3} justifyContent='center' style={{ display: "flex" }} flexDirection="row"  >
                <Button style={{  color: '#3C4858'}} variant="outlined"component="label">
                    <FileCopyIcon/>
                    Choose file 1
                    <input
                        type="file"
                        style={{ display: "none" }}
                    />
                </Button>
                <Box p={2}></Box>       
                <Button style={{  color: '#3C4858'}} variant="outlined"component="label">
                <FileCopyIcon/>
                Choose file 2
                    <input
                        type="file"
                        style={{ display: "none" }}
                    />
                </Button>  
                </Box>
                <Box p={2} justifyContent='center'style={{ display: "flex" }} flexDirection="row" >
                <Button  style={{  background: '#014f82',color: '#FFFFFF'}}component="label">
                    Compare    
                </Button>   
                </Box>
                <Box p={2}></Box>
            </div>
            
            <Footer/>
        </div>
    );

}