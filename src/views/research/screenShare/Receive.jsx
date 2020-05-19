import React from 'react';
import classNames from "classnames";
import Footer from "../../../components/Footer/Footer";
import NavBar from "../../../components/Navbar/Navbar";

import Box from '@material-ui/core/Box';
import { useStyles } from "../../../assets/css/projectFolderGrid";
import Receiver from "../../../components/ScreenShare/Receiver"

export default function Receive(props) {
    
    
    const classes = useStyles();
    return(
        <div className={classNames(classes.main)}>
            <NavBar/>
            <Box p={1}  style={{  background: '#014f82'}}>
                <div className={classes.name} >
                    <h1 align='center' className={classes.title}>Screen Share</h1>
                </div>
            </Box>
                
            <div  > 
            
                <Receiver/>
            </div>
            <Box p={2}/>
            <Footer/>
        </div>
    );

}