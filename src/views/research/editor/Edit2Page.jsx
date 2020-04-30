import React, { useEffect, useState } from 'react'

import axios from 'axios';
import { useSelector } from "react-redux";

import classNames from "classnames";
import Footer from "../../../components/Footer/Footer";
import NavBar from "../../../components/Navbar/Navbar";
import Box from '@material-ui/core/Box';
import { useStyles } from "../../../assets/css/editor";

import UserSection from "../../../components/PublicForumSections/UserSection";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import EditorMenu from "../../../components/editor/EditorMenu"
import '../../../assets/css/editor.css';


//import '../../../assets/css/editor.css';
import YJSQuill from '../../../components/editor/YjsQuill';

function Edit2Page(props) {
    const classes = useStyles();
    const user = useSelector(state => state.user);
    console.log(user)
    
    const [text, setText] = useState("")
    const [name, setName] = useState("")
    const [variable,setVariable]=useState("")
    useEffect(() => {
        
      },[]);
      

    const handleSave=()=> {
        const variable = { 
            postId: props.match.params.postId,
          
            content: text,
            //writer: "GeeFour",
            name: name
        }
        const token = localStorage.token;
        let config = {
            headers: {
            'Authorization': `Bearer ${token}`
            }
          }
        
        
        axios.post('/editor/editPost', variable,config)
          
            .then(response => {
                if (response) {
                    alert('Document saved!')
                    
                    
                }
            })
        
    }
  
    
        return (
        <div>
            <NavBar/>
            
            
                <Box p={1}  style={{  background: '#014f82'}}>
                    <div className={classes.name} >
                        <h1 align='center' className={classes.title}>Editor</h1>
                    </div>
                </Box>
                
                <div className={classNames(classes.main, classes.mainRaised2)} > 
                    {/*<h3 align='center' className={classes.title2}>{ saveStatusRender() }</h3>*/}
                    
                  
                        
                            <YJSQuill user={user} variable={props.match.params.postId}/>
                        
                    {/*
                    <div id='pls' style={{ textAlign: 'center', margin: '2rem', }}>
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
                    */}
                    <Box p={4}  /> 
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
