import React from 'react';

import ReactQuill, { Quill } from 'react-quill';
import "react-quill/dist/quill.snow.css";
//import openSocket from 'socket.io-client';
//const  socket = openSocket('http://localhost:8000');

//import axios from 'axios';
const __ISMSIE__ = navigator.userAgent.match(/Trident/i) ? true : false;

// Quill.register('modules/clipboard', PlainClipboard, true);



class QuillEditor extends React.Component {

    bandId;
    placeholder;
    onEditorChange;
    onFilesChange;
    onPollsChange;
    _isMounted;
    provider;

    constructor(props) {
        super(props);

        this.state = {
            text: __ISMSIE__ ? "<p>&nbsp;</p>" : "",
            files: [],
        };

        this.reactQuillRef = null;
        this.quillRef=null;
        
        

		
    }
    
    
    componentDidMount() {
        this._isMounted = true;
     
    }

    
    
    handleChange = (value) => {
        let status = '';
    
      
      this.setState({
        text: value
    }, () => {
        this.props.onEditorChange(this.state.text);
    });
    };
    
    
    

    render() {
        return (
            <div style={{  background: '#FFFFFF'}} data-cy='quill-editor'>
                
                <ReactQuill
                    ref={(el) => { this.reactQuillRef = el }}
                    theme={'snow'}
                    onChange={this.handleChange}
                    value={this.state.text}
                    modules={this.modules}
                    formats={this.formats}
                    placeholder={this.props.placeholder}
                    
                />
               
            </div>
        )
    }

    modules = {
        syntax: false,
        toolbar: {
            container:  [
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

export default QuillEditor;
