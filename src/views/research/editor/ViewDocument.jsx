import React, { useEffect, useState } from 'react'

import { useSelector } from "react-redux";

import classNames from "classnames";
import Footer from "../../../components/Footer/Footer";
import NavBar from "../../../components/Navbar/Navbar";
import Box from '@material-ui/core/Box';
import { useStyles } from "../../../assets/css/editor";



import ViewPage from '../../../components/editor/DocumentView';

function ViewDocument(props) {
    const classes = useStyles();
    const user = useSelector(state => state.user);
    
        return (
        <div className={classNames(classes.main2)}>
            <NavBar/>
                
                <div  > 
                    <ViewPage user={user} postId={props.match.params.postId} group={props.match.params.projectId}/>
                    <Box p={4}  /> 
                </div>
            
            
        </div>
        );

    }
export default ViewDocument
