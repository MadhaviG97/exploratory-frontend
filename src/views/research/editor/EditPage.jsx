import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useSelector } from "react-redux";
import NotFound from '../../../components/NotFound/NotFound'
import classNames from "classnames";
import Box from '@material-ui/core/Box';
import { useStyles } from "../../../assets/css/editor";
import NavComponent from '../../../components/AppNavigation/NavigationComponent';
import Grid from "@material-ui/core/Grid";
import Loader from "../../../components/Loader";
import '../../../assets/css/editor.css';

//import '../../../assets/css/editor.css';
import YJSQuill from '../../../components/editor/YjsQuill';

function Edit2Page(props) {
    const classes = useStyles();
    const user = useSelector(state => state.user);
    console.log(user)
    let user_id=0
    if (user.userData){
        user_id=user.userData._id
    }
    const [collabs, setCollabs] = useState([])
    const [mounted, setMounted] = useState(false)
    const [loadingValidation, setLoadingValidation] = useState(true)
    const [validpost, setValidPost] = useState(false)
    useEffect(() => {
        const variable = { 
            group: props.match.params.projectId,
        }
        axios.post('/project/get-collaborators', variable)
            .then(response => {
                setMounted(true)
                if (response.data) {
                    setCollabs(response.data)
                    
                }
            })
        const post = { 
            postId: props.match.params.postId,
            group:props.match.params.projectId
        }
        axios.post('/editor/findpost', post)
            .then(response => {
                setLoadingValidation(false)
                if (response.data.success) {
                    setValidPost(true)
                }
            })
            .catch(error => {
                setLoadingValidation(false)
            })
    }, [])
    if (user.userData && mounted && !loadingValidation){
        if (collabs.some(e => e.researcher_id == user_id) && validpost){
            return (
            <div style={{ height: '100%', backgroundImage: "url(/images/feed/feedBackground.jpg)"}}>
                    <Box p={2}/> 
                    <div  className={classNames( classes.mainRaised3)} >
                        
                        <Grid container spacing={5} direction="row" >
                            <Grid item xs={3} align='right'>
                                <Box >
                                    <NavComponent color={'#FFFFFF'} projectId={props.match.params.projectId}/>
                                </Box>
                            </Grid>
                            
                            <Grid item xs={8} >
                                <Box boxShadow={2} flexDirection="row">
                                    <Box p={1} style={{  background: '#014f82'}}>
                                        <h1 align='center' className={classes.topic5}>Editor</h1>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                        <Box p={1.5} />
                        <YJSQuill user={user} variable={props.match.params.postId} group={props.match.params.projectId}/>
                        <Box p={5.5}  /> 
                    </div>
                
            </div>
            );
        }else{
            return(
                <NotFound/>
                );
        }
    }else{
        return(
            <Loader />
        )
    }
}

export default Edit2Page