import React, { useEffect, useState } from 'react'

import classNames from "classnames";
import Footer from "../../../components/Footer/Footer";
import NavBar from "../../../components/Navbar/Navbar";
import Box from '@material-ui/core/Box';
import { useStyles } from "../../../assets/css/editor";
import history from '../../../history'
import { Button } from "@material-ui/core";
import QuillEditor from '../../../components/editor/QuillEditor';

//import axios from 'axios';
//import { useSelector } from "react-redux";
import DocumentrDialog from '../../../components/editor/DocumentDialog';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import MenuIcon from "@material-ui/icons/Menu";
import IconButton from '@material-ui/core/IconButton';

import '../../../assets/css/editor.css';
function CreatePage(props) {
    const classes = useStyles();
    //const user = useSelector(state => state.user);
    
    const [content, setContent] = useState("")
    const [files, setFiles] = useState([])
    const [anchorEl, setAnchorEl] =useState(null);
    const handleClick =  event  => {
        setAnchorEl(event.currentTarget);
        
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const onEditorChange = (value) => {
        setContent(value)
        console.log(content)
    }
    //below function is not used
    const onFilesChange = (files) => {
        setFiles(files)
    }
    
    return (
        <div>
            <NavBar/>
            <Menu
                    id="simple-menu"
                    
                    anchorEl={anchorEl}
                    getContentAnchorEl={null}
                    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                    transformOrigin={{ vertical: "top", horizontal: "center" }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    MenuListProps={{ onMouseLeave: handleClose }}
                >   
                    <MenuItem style={{fontSize: 14 }}  onClick={()=>history.push('/document/editorblog')}>All Documents</MenuItem>
                </Menu>
            <div className={classNames(classes.main, classes.mainRaised)} >
                <Box p={1.7}  style={{  background: '#014f82'}}>
                    <div className={classes.name} >
                        <h1 align='center' className={classes.title}>Editor</h1>
                    </div>
                </Box>
                <div style={{ maxWidth: '1000px', margin: '1.5rem auto'}}>
                    {/*marginTop={7}*/}
                    
                        <Box p={1} style={{ display: "flex" }} flexDirection="row" > 
                            <IconButton
                                edge="start"
                                className={classes.menuButton}
                                color="inherit"
                                aria-label="open drawer"
                                onClick={handleClick}
                                >
                                <MenuIcon />
                            </IconButton>  
                        </Box>
                        <QuillEditor
                            placeholder={""}
                            onEditorChange={onEditorChange}
                            onFilesChange={onFilesChange}
                            
                        />

                        <div style={{ textAlign: 'center', margin: '2rem', }}>
                            <DocumentrDialog
                                content= {content}
                                writer= "GeeFour"
                            />
                        </div>
                        
                        <Box p={4} />
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default CreatePage
