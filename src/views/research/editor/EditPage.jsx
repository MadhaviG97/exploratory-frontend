import React, { useEffect, useState } from 'react'

import { useSelector } from "react-redux";

import classNames from "classnames";
import Footer from "../../../components/Footer/Footer";
import NavBar from "../../../components/Navbar/Navbar";
import Box from '@material-ui/core/Box';
import { useStyles } from "../../../assets/css/editor";
import NavComponent from '../../../components/AppNavigation/NavigationComponent';
import Divider from '@material-ui/core/Divider';
import Grid from "@material-ui/core/Grid";
import '../../../assets/css/editor.css';

//import '../../../assets/css/editor.css';
import YJSQuill from '../../../components/editor/YjsQuill';

function Edit2Page(props) {
    const classes = useStyles();
    const user = useSelector(state => state.user);
    console.log(user)
    
        return (
        <div className={classNames(classes.main2)}>
            <NavBar/>
                
            
                
                
                <div className={classNames(classes.main2, classes.mainRaised3)} > 
                    <Grid container spacing={5} direction="row" >
                        <Grid item xs={3} align='right'>
                            <Box >
                                <NavComponent projectId={props.match.params.projectId}/>
                            </Box>
                        </Grid>
                        
                        <Grid item xs={8} >
                            <Box boxShadow={2} flexDirection="row">
                                <Box p={1} style={{  background: '#FFFFFF'}}>
                                    <h1 align='center' className={classes.topic4}>Editor</h1>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                    <Box p={1.5} />
                    <YJSQuill user={user} variable={props.match.params.postId} group={props.match.params.projectId}/>
                    <Box p={3}  /> 
                </div>
            
            <Footer/>
        </div>
        );
    }

export default Edit2Page
