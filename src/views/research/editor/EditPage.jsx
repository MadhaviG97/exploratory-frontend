import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill';

import axios from 'axios';
import { useSelector } from "react-redux";
import openSocket from 'socket.io-client';

import Alert from '@material-ui/lab/Alert';
import classNames from "classnames";
import Footer from "../../../components/Footer/Footer";
import NavBar from "../../../components/Navbar/Navbar";
import Box from '@material-ui/core/Box';
import { useStyles } from "../../../assets/css/editor";

import { Button } from "@material-ui/core";


import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import Tooltip from '@material-ui/core/Tooltip';
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from '@material-ui/core/IconButton';

import team1 from "../../../assets/images/About-us/about-us-damika.jpg";
import team2 from "../../../assets/images/About-us/about-us-madhavi.jpg";
import team3 from "../../../assets/images/About-us/about-us-yogya.jpg";
import team4 from "../../../assets/images/About-us/about-us-janith.png";

import '../../../assets/css/editor.css';


const  socket = openSocket('http://localhost:8000');

function Edit2Page(props) {
    const classes = useStyles();
    const user = useSelector(state => state.user);
    console.log(user)
    let reactQuillRef = null;
    const [text, setText] = useState("")
    const [savedStatus, setSavedStatus] = useState([])
    const [name, setName] = useState("")

    useEffect(() => {
        let isCurrent = true
        
        const variable = { postId: props.match.params.postId}
        
        socket.on('subscribeToText', (text) => {
            setText(text);
            console.log('socket',text);
            });
        if (text==''){
            const token = localStorage.token;
            let config = {
                headers: {
                'Authorization': `Bearer ${token}`
                }
              }
            axios.post('/editor/getPost', variable,config)
                .then(response => {
                    if (response.data.success) {
                        console.log(response.data)
                        setName(response.data.post.name)
                        setText(response.data.post.content)
                        console.log(text,'one')
                    } else {
                        alert('Couldnt get post')
                    }
                })
        }
        return () => {
            isCurrent = false
            }
      },[text]);
      
    const handleChange = (value) => {
        console.log(value,"value")
        let status = '';
        if (value.length !== text.length) {
            status = 'Changes not saved!'
            //console.log("I am Emitting");
            socket.emit('toText', value);
            
        };
        
        setText(value);
        setSavedStatus(status);
    };

    const handleSaveStatus=(status)=>{
        setSavedStatus(status)
        if (status === 'Saved!'){
          setTimeout(() => {
            setSavedStatus('not saving')
          },2000)
        }
    }
    
    const handleSave=()=> {
        const variable = { 
            postId: props.match.params.postId,
          
            content: text,
            writer: "GeeFour",
            name: name
        }
        const token = localStorage.token;
        let config = {
            headers: {
            'Authorization': `Bearer ${token}`
            }
          }
        handleSaveStatus('Loading...')
        
        axios.post('/editor/editPost', variable,config)
          
            .then(response => {
                if (response) {
                    alert('Document saved!')
                    handleSaveStatus('Saved!')
                    
                }
            })
        
    }
    const saveStatusRender = () => {
        if (savedStatus === 'not saving'){
        return '';
        } else {
        return savedStatus;
        }
    }

    
        return (
        <div>
            <NavBar/>
            
            <div className={classNames(classes.main, classes.mainRaised)} >
                <Box p={1}  style={{  background: '#014f82'}}>
                    <div className={classes.name} >
                        <h1 align='center' className={classes.title}>Editor</h1>
                    </div>
                </Box>
                <Box p={0.5}/>
                <div style={{ maxWidth: '1000px', margin: '1.5rem auto' }}> 
                    {/*<h3 align='center' className={classes.title2}>{ saveStatusRender() }</h3>*/}
                    <Box p={1} style={{ display: "flex" }} flexDirection="row" > 
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
                    
                
                    <ReactQuill
                        ref={(el) => { reactQuillRef = el }}
                        theme={'snow'}
                        onChange={handleChange}
                        value={text}
                        modules={modules}
                        formats={formats}
                     />
                    
                
                    <div style={{ textAlign: 'center', margin: '2rem', }}>
                        <Button
                            size="large"
                            className=""
                            style={{  background: '#014f82',//can change the sign-in button color from here
                            color: '#FFFFFF',
                            height: 40,
                            boxShadow: ['none']}}
                            variant="contained"
                            onClick={handleSave}
                        >
                            Save
                        </Button>
                    </div>
                    <Box p={4}  marginBottom={7}/> 
                </div>
            </div>
            <Footer/>
        </div>
        );


    }

    const modules = {
        syntax: true,
        toolbar: {
            container: [
                [{ 'font': [] }],
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                ['blockquote', 'code-block'],
                         
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
                [{ 'indent': '-1'}, { 'indent': '+1' }],        // outdent/indent
                [{ 'align': [] }],          
                [{ 'direction': 'rtl' }],                         // text direction
              
                  // custom dropdown
                
              
                [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
                
                
                ['video','formula','image'],
                ['clean']                                         // remove formatting button
              ],
            
            
        },

    };

    const formats = [
        'font',
        'size',
        'bold', 'italic', 'underline','strike',
        'list', 'bullet',
        'align',
        'color', 'background',
        'script','header',
        'blockquote','code-block','indent',
        'direction','link',
        'video','image','formula',
        'clean'
      ];




export default Edit2Page
