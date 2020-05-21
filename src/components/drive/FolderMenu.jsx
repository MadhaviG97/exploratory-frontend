
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
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
const fileImage=process.env.PUBLIC_URL + '/images/fileFolder/fileAvatar.png'
const folderImage=process.env.PUBLIC_URL + '/images/fileFolder/grey-folder-full-icon-png-5.png'

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
}));

export default function FolderMenu(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [file,setFile]=React.useState('');
  const [foldercreated, setFolderCreated] = React.useState(false);
  const [fileadded, setFileAdded] = React.useState(false);
  const [name,setName]=React.useState('');
  let folder=props.folderParams.folderId
  const group=props.group
  console.log(folder)
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
    console.log("yep");
    event.preventDefault();
    const token = localStorage.token;
    if (folder) {
      console.log("folderinside");
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
              console.log('yep2')
              setFolderCreated(true)

        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    });
  };

  const fileChanged = (event) => {
    const f = event.target.files[0];
    console.log(f);
    if (folder) {
      console.log("folderinside");
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
    console.log(event.target.files[0]);
    const token = localStorage.token;
    console.log(token);
    let config = {
      headers: {
      'Authorization': `Bearer ${token}`
      }
    }
    console.log(data)
    fetch('/drive/upload', {
        method: 'POST',
        body: data,
        //headers:config
      }).then(res => res.json())
        .then(data => {
          if (data.success) {
            console.log('yep3')
              setFileAdded(true)
              setTimeout(() => {
                window.location.reload();
              }, 2000);

        } else {
          alert("Upload failed");
        }
      });
  };

  return (
    <div>
     <div className={classes.roota}>
      <Collapse in={foldercreated}>
        <Alert
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
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar variant="square" alt="fileImage" src={fileImage} />
          </ListItemAvatar>
          <ListItemText
            primary={
              <React.Fragment>
                <Button backgroundColor="#b2beb5" height={50} component="label">
                  <input
                    type="file"
                    style={{ display: "none" }}
                    onChange={fileChanged.bind(this)}
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
          <DialogContent>
            <DialogContentText>Enter Folder Name</DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label=""
              type="text"
              fullWidth
              required
              onChange={handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>

            <Button onClick={handleSubmit} color="primary">
              Create
            </Button>
          </DialogActions>
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
