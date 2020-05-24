import React from 'react';
import classNames from "classnames";
import Footer from "../../../components/Footer/Footer";
import NavBar from "../../../components/Navbar/Navbar";
import Divider from "@material-ui/core/Divider";
import Box from '@material-ui/core/Box';
import { useEffect } from "react";
import axios from 'axios';
import { useStyles } from "../../../assets/css/projectFolderGrid";
import Receiver from "../../../components/ScreenShare/Receiver"
import NavComponent from '../../../components/AppNavigation/NavigationComponent';
import { useSelector } from "react-redux";
import NotFound from '../../../components/NotFound/NotFound'
export default function Receive(props) {
    
    const senderSet = (value) => {
        setSender(value.sender)
        //console.log(sender)
    }
    const [sender,setSender]=React.useState(null);
    const classes = useStyles();
    const user = useSelector(state => state.user);
    let user_id=0
    if (user.userData){
        user_id=user.userData._id
    }
    const [collabs, setCollabs] = React.useState([])
    useEffect(() => {
        const variable = { 
            group: props.match.params.projectId,
        }
        axios.post('/project/get-collaborators', variable)
            .then(response => {
                if (response.data) {
                    setCollabs(response.data)
                    
                }
            })
    }, [])
    if (collabs.some(e => e.researcher_id == user_id)){
        return(
            <div className={classNames(classes.main2)}>
                <NavBar/>
                <div style={{ width: '70%', margin: '1rem auto' }}>
                    <NavComponent projectId={props.match.params.projectId}/>
                    <Divider  variant="fullWidth" />
                    <Box p={1}/>
                    <Box boxShadow={3} style={{  background: '#FFFFFF'}} >
                        <Box p={3}>
                            <div >
                                {sender
                                    ? <h1 align='center' >You are Viewing the Screen of {sender}</h1>
                                    : <h1 align='center' >Noone has Shared Screens with You Yet! </h1>
                                }
                            </div>
                        </Box>
                    </Box>
                </div> 
                
                <div  > 
                    <Receiver group={props.match.params.projectId} senderSet={senderSet}/>
                </div>
                <Box p={4}/>
                <Footer/>
            </div>
        );
    }else{
        return(
            <NotFound/>
            );
    }
}