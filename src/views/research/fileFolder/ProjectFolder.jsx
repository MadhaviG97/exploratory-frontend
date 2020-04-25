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
        title: 'Document Editor',
        refr:"/document/create",
        description:
            '',
        image: process.env.PUBLIC_URL + '/images/fileFolder/images.jpg',
        imageText: 'Image Text',
    },
    {
        title: 'Drive',
        refr:"/document/fileManager",
        description:
            '',
            image: process.env.PUBLIC_URL + '/images/fileFolder/folders.jpg',
        imageText: 'Image Text',
        },
];

export default function CreatePage(props) {
 

    const classes = useStyles();
    return(
        <div>
            <NavBar/>
            
            <div className={classNames(classes.main, classes.mainRaised)}>
                <Box p={1}  style={{  background: '#014f82'}}>
                    
                    <div className={classes.name} >
                        <h1 align='center' className={classes.title}>Group</h1>
                    </div>
                    
                </Box>
                <Box p={3}/>
                <Grid container spacing={4} direction="row" justify="center"  alignItems="center">
                    {featuredPosts.map((post) => (
                    <ProjectFolderGrid key={post.title} post={post} />
                    ))}
                </Grid>
                <Box p={5} marginTop={1} />
                <div className={classes.name} >
                    <h2 align='center' className={classes.topic}>Compare Two Documents</h2>
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