
import React,{useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import axios from 'axios';
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import history from '../../history'
import Alert from '@material-ui/lab/Alert';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';
const fileImage=process.env.PUBLIC_URL + '/images/fileFolder/fileImage3.png'
const folderImage=process.env.PUBLIC_URL + '/images/fileFolder/folderImage.png'

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "36ch",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
    fontSize: 18,
    color: "inherit",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  roota: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  listItem: {
    
    [theme.breakpoints.down("sm")]: {
      
        display: "none" 
      
    }
  },
}));

export default function FolderMenu(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [file,setFile]=React.useState('');
  const [foldercreated, setFolderCreated] = React.useState(false);
  const [fileadded, setFileAdded] = React.useState(false);
  const [disable, setDisable] = React.useState(false);
  const [fileSizeExceeded, setFileSizeExceeded] = React.useState(false);
  const [name,setName]=React.useState('');
  let folder=props.folderParams.folderId
  const group=props.group
  const handleClickOpen = () => {
    setOpen(true);
  };
  const onChange = (event) => {
    
        props.onSearchChange(event.target.value);
    
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (event) => {
    setName(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const token = localStorage.token;
    if (folder) {
    } else {
      folder = "root";
    }
    const variables = {
      group: group,
      name: name,
      folder: folder,
    };
    let config = {
      headers: {
      'Authorization': `Bearer ${token}`
      }
    }
    axios.post('/drive/createfolder', variables,config)
       .then(response => {
            if (response) {
              setFolderCreated(true)

        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    });
  };

  const fileChanged = (event) => {
    const f = event.target.files[0];
    
    if (f.size<5*10**7){
      if (folder) {
      } else {
        folder = "root";
      }
      setFile(f);
      event.preventDefault();
      let data = new FormData();
      data.append("file", f);
      data.append("group", group);
      data.append("sensitivity", "private");
      data.append("folder", folder);
      const token = localStorage.token;
      let config = {
        headers: {
        'Authorization': `Bearer ${token}`
        }
      }
      fetch('/drive/upload', {
        method: 'POST',
        body: data,
        //headers:config
      }).then(res => res.json())
        .then(data => {
          if (data.success) {
              setFileAdded(true)
              setTimeout(() => {
                window.location.reload();
              }, 2000);

        } else {
          alert("Upload failed");
        }
      });
    }else{
      setFileSizeExceeded(true)
    }
    
  };
  useEffect(() => {
    const variable = { 
      group:group
  }
    axios.get('/drive/getlimit',variable)
    .then(response => {
        if (response.data.success) {
            if (response.data.storage[0].total>4*10**8){
              setDisable(true)
            }
        }
    })
  }, [])
  const DisableAlert=()=>{
    return (
      <Collapse in={disable}>
        <Alert data-cy='disable-alert'
        severity="warning"
        >
        Storage Limit Exceeded!
        </Alert>
        <Box p={0.5}></Box>
      </Collapse>
    )
}
const FileSizeExceededAlert=()=>{
  return (
    <Collapse in={fileSizeExceeded}>
      <Alert data-cy='exceeded-alert'
      severity="error"
      action={
        <IconButton
          aria-label="close"
          color="inherit"
          size="small"
          onClick={() => {
            setFileSizeExceeded(false);
          }}
        >
          <CloseIcon fontSize="inherit" />
        </IconButton>
      }
      >
      Uploading File Size Limit Exceeded!
      </Alert>
      <Box p={0.5}></Box>
    </Collapse>
  )
}
  return (
    <div className={classes.listItem}>
     <div className={classes.roota}>
      
      <Collapse in={foldercreated}>
        <Alert data-cy='folder-created-alert'
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setFolderCreated(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          Folder Created!
        </Alert>
      </Collapse>
      <Collapse in={fileadded}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setFileAdded(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          File Added!
        </Alert>
      </Collapse>
    </div>
    <FileSizeExceededAlert/>
    <List className={classes.root}>
        <ListItem alignItems="flex-start">
          <ListItemText
            primary={
                <Paper component="form" className={classes.root}>
                    <InputBase
                        className={classes.input}
                        placeholder="Search Drive"
                        inputProps={{ 'aria-label': 'search drive' }}
                        onChange={onChange}
                    />
                    <IconButton type="submit" className={classes.iconButton} aria-label="search" onClick={props.handleSearch}>
                        <SearchIcon />
                    </IconButton>
                </Paper>
            }
          />
        </ListItem>
        <Divider variant="fullWidth" />
        <DisableAlert/>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar variant="square" alt="fileImage" src={fileImage} />
          </ListItemAvatar>
          <ListItemText
            primary={
              <React.Fragment>
                <Button backgroundColor="#b2beb5" height={50} component="label" disabled={disable}>
                  <input
                    type="file"
                    style={{ display: "none" }}
                    onChange={fileChanged.bind(this)}
                    disabled={disable}
                  />
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    New File
                  </Typography>
                </Button>
              </React.Fragment>
            }
          ></ListItemText>
        </ListItem>
        <Divider variant="fullWidth" />
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar variant="square" alt="Cindy Baker" src={folderImage} />
          </ListItemAvatar>
          <ListItemText
            primary={
              <React.Fragment>
                <Button
                  backgroundColor="#b2beb5"
                  component="label"
                  onClick={handleClickOpen}
                  data-cy='folder-dialog'
                >
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    New Folder
                  </Typography>
                </Button>
              </React.Fragment>
            }
          />
        </ListItem>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <form onSubmit={handleSubmit}>
            <DialogContent>
              <DialogContentText>Enter Folder Name</DialogContentText>
              
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label=""
                  type="text"
                  inputProps={{ maxLength: 20 }}
                  fullWidth
                  required={true}
                  onChange={handleChange}
                />
            
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>

              <Button type="submit" color="primary" >
                Create
              </Button>
            </DialogActions>
          </form>
        </Dialog>
        <Divider variant="fullWidth" />
        <ListItem alignItems="flex-start">
          <ListItemText
            primary={
              <React.Fragment>
                <Button
                    backgroundColor='#b2beb5'
                    component="label"
                    onClick={()=>history.push(`/document/${group}/compare`)}
                    >
                    <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                    >   
                    Compare Two Documents
                  </Typography>
                </Button>
              </React.Fragment>
            }
          />
        </ListItem>
      </List>
    </div>
  );
}
