import React from "react";
import * as Y from 'yjs'
import { WebsocketProvider } from 'y-websocket'
import { QuillBinding } from 'y-quill'
import Quill from 'quill'
import QuillCursors from 'quill-cursors'
import axios from 'axios';
import { withStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import EditorMenu from "../../components/editor/EditorMenu"
import Alert from '@material-ui/lab/Alert';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
Quill.register('modules/cursors', QuillCursors)
const styles = theme => ({
  roota: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  
});
class YJSQuill extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      online: [],
      fileSaved:false
  };
    this.editor= null;
    this.quillRef=null;
    this.ydoc = new Y.Doc()

    this.provider = new WebsocketProvider('ws://localhost:1234',this.props.variable , this.ydoc)
    this.type = this.ydoc.getText('quill')
    this.st=(this.provider.awareness.getStates())
    

}
handleSave=()=> {
  
  const variable = { 
      postId: this.props.variable,
      content: this.editor.root.innerHTML,
      
      //writer: "GeeFour",
      //name: name
  }
  console.log(variable)
  const token = localStorage.token;
  let config = {
      headers: {
      'Authorization': `Bearer ${token}`
      }
    }
  
  
  axios.post('/editor/editPost', variable,config)
    
      .then(response => {
          if (response) {
              this.setState({fileSaved:true})
              
          }
      })
  
}
savedVersion = () => {
  const variable =  { postId: this.props.variable}
    
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
                  
                    this.editor.root.innerHTML = response.data.post.content
                    //this.editor.insertText([0], response.data.post.content);
                    
                } else {
                    alert('Couldnt get post')
                }
            })
};
componentDidMount() {
  console.log('mount',this.props.user)
  
  window.addEventListener('load', () => {
    const editorContainer = document.createElement('div')
    editorContainer.setAttribute('id', 'editor')
    var originalDiv = document.getElementById("QuillEditor-container");
    
    var parentDiv = document.getElementById("parent");
    parentDiv.insertBefore(editorContainer, originalDiv.nextSibling);
    this.editor = new Quill(editorContainer, {
      modules: {
        cursors: true,
        toolbar: [
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
                ['clean']     
        ],
        history: {
          userOnly: true
        }
      },
      placeholder: 'Start collaborating...',
      theme: 'snow' // or 'bubble'
    })
    
    
    
    const binding = new QuillBinding(this.type, this.editor, this.provider.awareness)
   
    window.example = ( this.provider, this.ydoc, this.type, binding )
  })
}

render() {
    const { classes } = this.props;
    if (this.props.user.userData){
      this.provider.awareness.setLocalStateField('user', {
        name: this.props.user.userData.first_name,
        propic: this.props.user.userData.profile_picture,
      })
      this.st=(this.provider.awareness.getStates())
    }
    const st2=(this.st.values())
    
    console.log(st2)
    this.provider.awareness.on('change', ({ added, removed }, _conn) => {
      if ((Array.isArray(added) && added.length)){
        this.setState({online:[ ...this.provider.awareness.getStates().values() ]});
        //console.log(this.state.online[0].user.name)
        console.log(this.provider.awareness.getStates(),'new')
      }
      if ((Array.isArray(removed) && removed.length)){
        this.setState({online:[ ...this.provider.awareness.getStates().values() ]});
        //console.log(this.online)
        console.log(removed,'removed')
      }
      
    })
    console.log(this.st.size)
    
    return (
      <div >
        <div className={classes.roota}>
            <Collapse in={this.state.fileSaved}>
                <Alert
                action={
                    <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                        this.setState({fileSaved:false})
                    }}
                    >
                    <CloseIcon fontSize="inherit" />
                    </IconButton>
                }
                >
                File Saved!
                </Alert>
            </Collapse>
        </div>
        <Grid container spacing={5}>
            <Grid item xs={3}>
                <Paper >
                <EditorMenu 
                  savedVersion={this.savedVersion} 
                  handleSave={this.handleSave} 
                  nowOnline={this.state.online}
                  />
                </Paper>
            </Grid>
            <Divider orientation="vertical" variant="fullWidth" />
            
            <Grid item xs={8} id='parent'>
              <div id="QuillEditor-container">
              {/* <!-- Create the editor container --> */}

              </div>
                
            </Grid>
            
        </Grid>
          
      </div>
    )
  }
}
export default withStyles(styles)(YJSQuill);


  /*
  // Define user name and user name
  // Check the quill-cursors package on how to change the way cursors are rendered
  provider.awareness.setLocalStateField('user', {
    name: 'Typing ',
    color: 'blue'
  })
  <ListItem
                        button
                        onClick={this.props.refreshOnline}>
                            <RefreshIcon/>
                        </ListItem>
  */
  
  

