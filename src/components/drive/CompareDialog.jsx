import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ListSubheader from '@material-ui/core/ListSubheader';
import axios from 'axios';
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from '@material-ui/core/TextField';
import { useStyles } from "../../assets/css/compareDialog";
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/CardMedia';
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardHeader';
import Box from '@material-ui/core/Box';
import NavComponent from '../../components/AppNavigation/NavigationComponent';
import classNames from "classnames";
import Typography from '@material-ui/core/Typography';
var jsdiff = require('diff');
var htmlToText = require('html-to-text');

function extractContent(html) {
  var text = htmlToText.fromString(html, {
    format: {
      heading: function (elem, fn, options) {
        var h = fn(elem.children, options);
        return '\n' + h.toUpperCase() + '\n';
      },
      image: function (elem, fn, options) {
        
        return '';
    }
    
    }
  });
  return text;

}

export default function DialogSelect(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [doco, setDocO] = React.useState('');
  const [doct, setDocT] = React.useState('');
  const [texto, setTextO] = React.useState('');
  const [textt, setTextT] = React.useState('');
  const [blogs, setBlogs] = React.useState([])
  const [files, setFiles] = React.useState([]);
  let fileTextO=''
  let fileTextT=''
  const wait=ms=>new Promise(resolve => setTimeout(resolve, ms));
  const imagex=process.env.PUBLIC_URL + '/images/fileFolder/images.jpg'
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 300,
      },
    },
  };  
  const group=props.group
  React.useEffect(() => {
    const variable = {
      group:group,
      //name: name
    }
    console.log(variable)
    const token = localStorage.token;
    let config = {
        headers: {
        'Authorization': `Bearer ${token}`
        }
      }
    axios.post('/editor/getBlogs',variable,config)
        .then(response => {
            if (response.data.success) {
                console.log(response.data.blogs)
                setBlogs(response.data.blogs)
            } else {
                alert('Couldnt get blog`s lists')
            }
        })
    axios.post('/drive/gettxtfiles', variable,config)
      .then(response => {
          if (response.data.success) {
              console.log(response.data.files)
              setFiles(response.data.files)
          } else {
              console.log('not')
              alert('Could not get files ')
          }
    })
  }, [])

  const handleChange1 = (event) => {
    setDocO(event.target.value) ;
  };
  const handleChange2 = (event) => {
    setDocT(event.target.value);
  };
  const handleTextChange1 = (event) => {
    setTextO(event.target.value);
  };
  const handleTextChange2 = (event) => {
    setTextT(event.target.value);
  };

  const handleClickOpen = () => {
    document.getElementById('display').innerHTML=''
    setOpen(true);
  };
  const extractText=(file,num)=>{
    const variable = {
      filename:file.filename
    }
    const token = localStorage.token;
    let config = {
        headers: {
        'Authorization': `Bearer ${token}`
        }
      }
    axios.post('/drive/readtxtfile',variable,config)
        .then(response => {
            if (response.data.success) {
                if (num==1){
                  fileTextO=(response.data.buffer)
                }
                else{
                  console.log(response.data.buffer,'oplopp')
                  fileTextT=(response.data.buffer)
                }

                //setBlogs(response.data.blogs)
            }else {
              console.log('not')
              alert('Could not get the file ')
              
            }
        })
    
  }
  const handleClose = () => {
    setOpen(false);
  };
  const handleTextCompare = (event) => {
    document.getElementById('display').innerHTML=''//set initial text of display to null
    var one=texto
    var other=textt
    handleCompare(one,other)
  };
  const handleDocCompare=async()=>{
    console.log(doct)
    console.log(doct.contentType)
    console.log(doct.filename)
    console.log(doct['filename'])
    if (doco.filename){
      extractText(doco,1)
    }
    if (doct.filename){
      extractText(doct,2)
    }
    wait(2*1000).then(() => {
      if (!doco.filename){
        var one = extractContent(doco.content)
      }
      else{
        var one=fileTextO
      }
      if (!doct.filename){
        var other = extractContent(doct.content)
      }
      else{
        var other=fileTextT
      }
      handleCompare(one,other)
     
    })
    
  }
  const handleCompare=(one, other)=>{
    console.log(one)
    console.log(other)
    var one = one
    var other = other
    var color = ''
    var span = null
    var diff = jsdiff.diffChars(one, other)
    var display = document.getElementById('display')
    var fragment = document.createDocumentFragment();

    diff.forEach(function(part){
    // green for additions, red for deletions
    // grey for common parts
    color = part.added ? 'green' :
    part.removed ? 'red' : 'black';
    span = document.createElement('span');
    span.style.color = color;
    span.appendChild(document
        .createTextNode(part.value));
    fragment.appendChild(span);
    });
    
    display.appendChild(fragment);
    setOpen(false);
  }

  return (
    <div className={classes.main2}>
        <Box p={1}/>
        <div className={classes.icon}>
          <Box  style={{ display: "flex" }} flexDirection="row" >
              <NavComponent projectId={group}/>
          </Box>
          <Divider  variant="fullWidth" />
          <Box p={2} />
        </div>         
        <Grid container spacing={4} direction="row" justify="center"  alignItems="center">
        
        
          <Grid item xs={8} md={4} item align="center" >
            <CardActionArea component="a" onClick={handleClickOpen}>
              <Card className={classes.card} style={{  background: '#FFFFFF'}}>
                <div className={classes.cardDetails}>
                  <CardContent>
                    <div className={classes.name} >
                        <h2 className={classes.topic}>Select Two Documents to Compare</h2>
                    </div>
                    
                  </CardContent>
                </div>
                <CardMedia className={classes.cardMedia} image={imagex}  />
              </Card>
            </CardActionArea>
          </Grid>
        </Grid>
        <Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={handleClose}>
          <DialogTitle>Select Documents to Compare</DialogTitle>
          <DialogContent>
            <form className={classes.container}>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-dialog-select-label">Select</InputLabel>
                <Select
                  labelId="demo-dialog-select-label"
                  id="demo-dialog-select"
                  value={doco}
                  onChange={handleChange1}
                  input={<Input />}
                  MenuProps={MenuProps}
                >
                <MenuItem disabled value="">
                  <em>Document One</em>
                </MenuItem>
                <Divider  variant="fullWidth" />
                <ListSubheader disableSticky>Select from Blog</ListSubheader>
                <Divider  variant="fullWidth" />
                {blogs.map((blog) => (
                  <MenuItem key={blog._id} value={blog} >
                    {blog.name}
                  </MenuItem>
                ))}
                <Divider  variant="fullWidth" />
                <ListSubheader disableSticky>Select from Drive</ListSubheader>
                <Divider  variant="fullWidth" />
                {files.map((file) => (
                  <MenuItem key={file._id} value={file} >
                    {file.metadata.originalname}
                  </MenuItem>
                ))}
                </Select>
              </FormControl>
              
              <FormControl className={classes.formControl} >
                <InputLabel id="demo-dialog-select-label">Select</InputLabel>
                <Select
                  labelId="demo-dialog-select-label"
                  id="demo-dialog-select"
                  value={doct}
                  onChange={handleChange2}
                  input={<Input />}
                  MenuProps={MenuProps}
                >
                  <MenuItem disabled value="">
                  <em>Document Two</em>
                  </MenuItem>
                <Divider variant="fullWidth" />
                <ListSubheader disableSticky>Select from Blog</ListSubheader>
                <Divider variant="fullWidth" />
                {blogs.map((blog) => (
                  <MenuItem key={blog._id} value={blog} >
                    {blog.name}
                  </MenuItem>
                ))}
                <Divider variant="fullWidth" />
                <ListSubheader disableSticky>Select from Drive</ListSubheader>
                <Divider variant="fullWidth" />
                {files.map((file) => (
                  <MenuItem key={file._id} value={file} >
                    {file.metadata.originalname}
                  </MenuItem>
                ))}
                </Select>
              </FormControl>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleDocCompare} color="primary">
              Compare
            </Button>
          </DialogActions>
        </Dialog>
        <Box p={3}/> 
        <Grid container spacing={4} direction="row" justify="center"  alignItems="center">
          <Grid item >
            <Typography variant="h6" >
                  Or Enter Your Text Below
            </Typography>
            <Typography  >
                  (limit : 500 words per search)
            </Typography>
          </Grid>
        </Grid>
        <Box p={3}/> 
        <Grid container spacing={4} direction="row" justify="center"  alignItems="center" >
          
          <Grid item style={{  background: '#FFFFFF'}}>
            <TextField
              id="outlined-multiline-static"
              label="Old Text"
              multiline
              rows={6}
              defaultValue=""
              variant="outlined"
              style = {{width: 450}}
              inputProps={{ maxLength: 3000 }}
              onChange={handleTextChange1}
            />
          </Grid>
          <Grid item style={{  background: '#FFFFFF'}}>
            <TextField
              id="outlined-multiline-static"
              label="New Text"
              multiline
              inputProps={{ maxLength: 3000 }}
              rows={6}
              defaultValue=""
              style = {{width: 450}}
              variant="outlined"
              onChange={handleTextChange2}
            />
            
          </Grid>
        </Grid>
        <Box p={3}/> 
        <Grid container spacing={4}direction="row" justify="center"  alignItems="center">
          <Grid item>
            <Button
              size="large"
              htmlType="submit"
              style={{  background: '#014f82',//can change the sign-in button color from here
              color: '#FFFFFF',
              height: 40,
              boxShadow: ['none']}}
              variant="contained"
              component="label"
              onClick={handleTextCompare}
              //onSubmit={onSubmit}
            >
                Compare
            </Button>
          </Grid>
        </Grid>
        <Box p={2}/> 
        <Grid container spacing={4} direction="row" justify="center"  alignItems="center" >
            
        
          <Grid item >
            <Card variant="outlined" className={classes.card2} style={{  background: '#FFFFFF'}}>
              <CardHeader
                  title="Comparison Results"
                  style={{ textAlign: 'center' }}  
              >
                
              </CardHeader>
              <Divider  variant="fullWidth" />
              <CardContent >
                
                <Typography variant="body2" component="p">
                  <div id='display'>
                      
                  </div>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Box p={2}/> 
      
        
    </div>
  );
}
