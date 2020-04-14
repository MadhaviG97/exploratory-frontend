import React, { useEffect, useState } from 'react'
import Typography from "@material-ui/core/Typography";
import { Button } from "@material-ui/core";
import ReactQuill, { Quill } from 'react-quill';
import "react-quill/dist/quill.snow.css";
//import { useStyles } from "../../assets/css/fill-profile";
//import axios from 'axios';
//import { useSelector } from "react-redux";
//import _ from 'underscore';
//import openSocket from 'socket.io-client';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
//import MuiThemeProvider from '@material-ui/styles/MuiThemeProvider';


//const  socket = openSocket('http://localhost:8000');
const __ISMSIE__ = navigator.userAgent.match(/Trident/i) ? true : false;
//const classes = useStyles();
class EditPage extends React.Component{
    
    onEditorChange;
    
    
    _isMounted;
    provider;
    constructor(props) {
        super(props)
        this.state = {
            text: __ISMSIE__ ? "<p>&nbsp;</p>" : "",
            savedStatus: 'not saving',
            files: [],
            online: [],
            userColor: 'black',
            user:''
        };
        this.reactQuillRef = null;
        this.quillRef=null;
        this.handleChange = this.handleChange.bind(this);
        //this.handleSave = this.handleSave.bind(this);
        //this.handleSaveStatus = this.handleSaveStatus.bind(this);
        
    }
    
    componentDidMount(){
        this._isMounted = true;
        
        //console.log(store.getSate());
        
        //console.log(this.props.match.params.postId)
        //this.provider = new WebsocketProvider("ws://localhost:3000/blog/create");// change to 'ws://localhost:3000' for local development
        /*
        const variable = { postId: this.props.match.params.postId}
        
        axios.post('/api/blog/getPost', variable)
            .then(response => {
                if (response.data.success) {
                    //console.log(response.data.post)
                    this.setState({text:response.data.post.content})
                } else {
                    alert('Couldnt get post')
                }
            })
        
            
        socket.on('subscribeToText', (text) => {
            this.setState({text: text});
            console.log('socket',text);
            });
        socket.on('userjoined', ()=>{
            console.log('user has joined the room');
        
            })
          
        socket.on('onlineUpdated', ({online}) => {
            console.log('onlineUpdated', online);
            online.forEach((user)=>{
                user.tooltip = false
        
            })
            this.setState({online: online}, () => {
                var userIndex = _.findIndex(this.state.online, function(user) {
                return user._id === this.state.user;
                })
                this.setState({userColor: this.state.online[userIndex].color}, () => {
                console.log(this.state.online, this.state.userColor);
                })
            });
            })
     */ 
    };
    
    

    handleChange = (value) => {
        let status = '';
        if (value.length !== this.state.text.length) {
            status = 'Changes not saved.'
            console.log("I am Emitting");
            //socket.emit('toText', value);
            
        };
        
        this.setState({text: value, savedStatus: status});
    };

    handleSaveStatus(status){
        this.setState({savedStatus: status})
        if (status === 'Saved!'){
          setTimeout(() => {
            this.setState({savedStatus: 'not saving'})
          },2000)
        }
    }
    /*
    handleSave() {
        const variable = { postId: this.props.match.params.postId,text:this.state.text }
        this.handleSaveStatus('Loading...')
        axios.post('/api/blog/editPost', variable)
          
            .then(response => {
                if (response) {
                    message.success('Saved!');
                    this.handleSaveStatus('Saved!')
                    
                }
            })
        
    }
    */
    render() {
        let { savedStatus } = this.state;
        let saveStatusRender = () => {
            if (savedStatus === 'not saving'){
            return '';
            } else {
            return savedStatus;
            }
        }
        return (
            <div style={{ maxWidth: '1000px', margin: '1.5rem auto' }}>
                <div style={{ textAlign: 'center',className:"postPage"  }} >
                    <Typography>Post Name </Typography>
                    <p className="save-status">{ saveStatusRender() }</p>
                   
                    <Toolbar>
                        
                            <span style={{display: 'flex', alignSelf: 'center', flexDirection:'row'}}>Online Now:</span>

                            <List style={{paddingLeft: '15px', paddingRight: '10px'}}>
                                 
                                {this.state.online.map((user, i) => {

                                    return(

                                        <span onMouseOver={()=>{
                                            const newOnline = [...this.state.online]
                                            newOnline[i].tooltip = true;
                                            this.setState({online: newOnline})
                                        }}
                                        key={i}
                                        onMouseLeave={()=>{
                                            const newOnline = [...this.state.online]
                                            newOnline[i].tooltip = false;
                                            this.setState({online: newOnline})
                                        }}
                                        className="collaboratorIcon"
                                        style={{backgroundColor: user.color}}>
                                        {user.name[0]}
                                        <Tooltip label={user.name} show={this.state.online[i].tooltip} verticalPosition='bottom'/>
                                    </span>
                                    )


                                })}
                             
                            </List>
                        
                </Toolbar>
                
                </div>
                <ReactQuill
                        ref={(el) => { this.reactQuillRef = el }}
                        theme={'snow'}
                        onChange={this.handleChange}
                        value={this.state.text}
                        modules={this.modules}
                        formats={this.formats}
                        
                    />
                
                
                    <div style={{ textAlign: 'center', margin: '2rem', }}>
                        <Button
                            size="large"
                            className=""
                            //onClick={this.handleSave}
                        >
                            Save
                    </Button>
                    </div>
                
            </div>
        );


    }

    modules = {
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

    formats = [
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

}


export default EditPage
