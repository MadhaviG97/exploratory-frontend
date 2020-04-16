import React, { useEffect, useState } from 'react'

import classNames from "classnames";
import Footer from "../../../components/Footer/Footer";
import NavBar from "../../../components/Navbar/Navbar";
import Box from '@material-ui/core/Box';
import { useStyles } from "../../../assets/css/editor";
import Typography from "@material-ui/core/Typography";
import { Button } from "@material-ui/core";
import QuillEditor from '../../../components/editor/QuillEditor';
//import axios from 'axios';
//import { useSelector } from "react-redux";
import DocumentrDialog from '../../../components/editor/DocumentDialog';

import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import Tooltip from '@material-ui/core/Tooltip';
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from '@material-ui/core/IconButton';

import team1 from "../../../assets/images/About-us/about-us-damika.jpg";
import team2 from "../../../assets/images/About-us/about-us-madhavi.jpg";
import team3 from "../../../assets/images/About-us/about-us-yogya.jpg";
import team4 from "../../../assets/images/About-us/about-us-janith.png";
import PNavbar from "../projectNavbar"
import '../../../assets/css/editor.css';
function CreatePage(props) {
    const classes = useStyles();
    //const user = useSelector(state => state.user);
    
    const [content, setContent] = useState("")
    const [files, setFiles] = useState([])

    const onEditorChange = (value) => {
        setContent(value)
        console.log(content)
    }
    //below function is not used
    const onFilesChange = (files) => {
        setFiles(files)
    }
    /*
    const onSubmit = (event) => {
        event.preventDefault();

        setContent("");

        if (user.userData && !user.userData.isAuth) {
            return alert('Please Log in first');
        }
        
        const variables = {
            content: content,
            userID: user.userData._id
        }
        
        axios.post('api/', variables)
           .then(response => {
                if (response) {
                    message.success('Document Created!');//import { Alert, AlertTitle } from '@material-ui/lab';//<Alert severity="success">

                    setTimeout(() => {
                        props.history.push('/blog')
                    }, 2000);
                }
            })
        
    }
    */
   
    return (
        <div>
            <NavBar/>
            <Box p={2.5}></Box>
            <div className={classNames(classes.main, classes.mainRaised)} >
                <div style={{ maxWidth: '1100px', margin: '1.5rem auto'}}>
                <Box p={5} marginTop={7} />{/*marginTop={7}*/}
                <div className={classes.name} >
                    <h1 align='center' className={classes.title}>Group Name</h1>
                </div>
                    
                    <Box p={2} style={{ display: "flex" }} flexDirection="row" > 
                        <IconButton
                            edge="start"
                            className={classes.menuButton}
                            color="inherit"
                            aria-label="open drawer"
                            >
                            <MenuIcon />
                        </IconButton>  
                        <Tooltip title="Now Online">
                            <AvatarGroup max={4} style={{ marginLeft: "auto"}}>
                                <Avatar alt="Remy Sharp" src={team1} />
                                <Avatar alt="Travis Howard" src={team2} />
                                <Avatar alt="Cindy Baker" src={team3} />
                                <Avatar alt="Cindy Baker" src={team4}/>
                            </AvatarGroup>
                        </Tooltip>
                    </Box>
                    <QuillEditor
                        placeholder={""}
                        onEditorChange={onEditorChange}
                        onFilesChange={onFilesChange}
                        
                    />

                    <form className={classes.form} noValidate>
                        <div style={{ textAlign: 'center', margin: '2rem', }}>
                            <DocumentrDialog/>
                        </div>
                    </form>
                    <Box p={4}  marginBottom={7}/>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default CreatePage
