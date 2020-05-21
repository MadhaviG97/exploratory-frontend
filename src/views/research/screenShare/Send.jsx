import React from 'react';
import classNames from "classnames";
import Footer from "../../../components/Footer/Footer";
import NavBar from "../../../components/Navbar/Navbar";

import Box from '@material-ui/core/Box';
import { useStyles } from "../../../assets/css/projectFolderGrid";
import Sender from "../../../components/ScreenShare/Sender"
import { useSelector } from "react-redux";
import NavComponent from '../../../components/AppNavigation/NavigationComponent';
import Divider from "@material-ui/core/Divider";
export default function Receive(props) {
    
    const user=useSelector((state) => state.user);
    console.log(user)
    const classes = useStyles();
    return(
        <div className={classNames(classes.main2)} >
            <NavBar/>
            
            <div style={{ width: '70%', margin: '1rem auto' }}>
                
                    <NavComponent projectId={props.match.params.projectId}/>
                
                <Divider  variant="fullWidth" />
                <Box p={1}/>
                <Box boxShadow={3} style={{  background: '#FFFFFF'}} >
                <Box p={2}>
                    <div >
                        <h1 align='center' className={classes.topic2}>Share Your Screen with Project members!</h1>
                    </div>
                </Box>
            </Box>
            </div> 
            <div > 
                <Sender group={props.match.params.projectId} user={user}/>
            </div>
            
            <Footer/>
        </div>
    );

}