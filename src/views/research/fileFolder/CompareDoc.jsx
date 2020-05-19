import React from 'react';
import classNames from "classnames";
import Footer from "../../../components/Footer/Footer";
import NavBar from "../../../components/Navbar/Navbar";

import Box from '@material-ui/core/Box';
import { useStyles } from "../../../assets/css/projectFolderGrid";
import CompareDialog from "../../../components/drive/CompareDialog"

export default function CompareDoc(props) {
    
    
    const classes = useStyles();
    return(
        <div>
            <NavBar/>
            <Box p={1}  style={{  background: '#014f82'}}>
                <div className={classes.name} >
                    <h1 align='center' className={classes.title}>Compare Documents</h1>
                </div>
            </Box>
                
            <div className={classNames(classes.main, classes.mainRaised2)} > 
            
                <CompareDialog/>
            </div>
            
            <Footer/>
        </div>
    );

}