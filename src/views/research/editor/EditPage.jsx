import React, { useEffect, useState } from 'react'

import { useSelector } from "react-redux";

import classNames from "classnames";
import Footer from "../../../components/Footer/Footer";
import NavBar from "../../../components/Navbar/Navbar";
import Box from '@material-ui/core/Box';
import { useStyles } from "../../../assets/css/editor";


import '../../../assets/css/editor.css';


//import '../../../assets/css/editor.css';
import YJSQuill from '../../../components/editor/YjsQuill';

function Edit2Page(props) {
    const classes = useStyles();
    const user = useSelector(state => state.user);
    console.log(user)
    
        return (
        <div>
            <NavBar/>
            
            
                <Box p={1}  style={{  background: '#014f82'}}>
                    <div className={classes.name} >
                        <h1 align='center' className={classes.title}>Editor</h1>
                    </div>
                </Box>
                
                <div className={classNames(classes.main, classes.mainRaised2)} > 
                    <YJSQuill user={user} variable={props.match.params.postId}/>
                    <Box p={4}  /> 
                </div>
            
            <Footer/>
        </div>
        );
    }

export default Edit2Page
