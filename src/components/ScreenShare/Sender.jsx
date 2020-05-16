import React from 'react';
import '../../assets/css/screenshare.css';
import openSocket from 'socket.io-client';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { withStyles } from "@material-ui/core/styles";
const socket = openSocket('http://localhost:8000');
var caller;
//var group="GeeFour"
var caller="caller"
//var clients = io.sockets.clients('room');
//var room=group.concat(caller)
const RTC_CONFIGURATION = {
    iceServers: [
      { urls: 'stun:stun.l.google.com:19302' },
      {
        url: 'turn:numb.viagenie.ca',
        credential: 'muazkh',
        username: 'webrtc@live.com'
      }
    ]
  };
const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
      margin: theme.spacing(1),
      minWidth: 290,
      maxWidth: 300,
  },
});

function sendOffer(offer,id) {
    socket.emit('offer', {room: id,offer:offer});
    
  }
  function sendCandidate(candidate,id) {
    socket.emit('candidate', {room: id,candidate:candidate});
  }
  function getStream() {
    return new Promise((resolve, reject) => {
      navigator.mediaDevices.getDisplayMedia({ audio: false, video: true }).then((mediaStream) => {
        resolve(mediaStream);
      })
    });
  }
  function makePeerConnection(stream,id) {
    if (caller) { caller=null }
    caller = new RTCPeerConnection(RTC_CONFIGURATION);
    caller.addStream(stream);
    caller.onicecandidate = (event) => {
      if (event.candidate != null) {
        sendCandidate(event.candidate,id);
      }
    }
    makeOffer(id)
  }
  function makeOffer(id) {
    caller.createOffer().then((offer) => {
      return caller.setLocalDescription(offer);
    }).then(() => {
      sendOffer(caller.localDescription,id);
    });
  }
const researchers= [ {name: 'mocked name 1',_id:'1234'},{name: 'mocked name 2',_id:'1235'} ]
class Sender extends React.Component {

    

  constructor(props) {
    super(props);
    this.state = {
        open:false,
        researcher:{}
    };
    this.ITEM_HEIGHT = 48;
    this.ITEM_PADDING_TOP = 8;
    this.MenuProps = {
      PaperProps: {
        style: {
          maxHeight: this.ITEM_HEIGHT * 4.5 + this.ITEM_PADDING_TOP,
          width: 300,
        },
      },
    };  
  }
  
  handleClickOpen = () => {
    this.setState({
      open:true});
  };

  handleClose = () => {
    this.setState({
      open:false});
  };
  handleChange = (event) => {
    this.setState({
      researcher:event.target.value});
    console.log(event.target.value)
  };
    
    
    componentDidMount() {
        
        socket.on('answer', (answer) => {
            console.log(answer);
            caller.setRemoteDescription(answer);
        });
        socket.on('candidate', (candidate) => {
            console.log(candidate);
            caller.addIceCandidate(candidate);
        });

        
    }

    
    handleSubmit=()=>{
        //console.log(this.state)
        this.setState({
            open:false});
        var room=this.state.researcher._id.concat('caller')
        socket.emit('join', room);
        getStream().then((stream) => {
            document.getElementById('screen').srcObject = stream;
            makePeerConnection(stream,this.state.researcher._id);
        });
        
    }
    

    render() {
      const { classes } = this.props;
        return (
            <div>
                <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                  <DialogContent>
                  <form className={classes.container}>
                    <FormControl className={classes.formControl}>
                      <InputLabel id="demo-dialog-select-label">Select a Receiver</InputLabel>
                      <Select
                        labelId="demo-dialog-select-label"
                        id="demo-dialog-select"
                        value={this.state.researcher}
                        onChange={this.handleChange}
                        input={<Input />}
                        MenuProps={this.MenuProps}
                      >
                      
                      {researchers.map((researcher) => (
                        <MenuItem key={researcher._id} value={researcher} >
                          {researcher.name}
                        </MenuItem>
                      ))}
                      </Select>
                  </FormControl>
                  </form>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                      Cancel
                    </Button>
                    <Button onClick={this.handleSubmit} color="primary">
                      Connect
                    </Button>
                  </DialogActions>
                </Dialog>
                <video controls playsInline autoPlay id="screen"></video>
                
                <div style={{ textAlign: 'center', margin: '2rem', }}>
                    <Button
                        size="large"
                        htmlType="submit"
                        style={{  background: '#014f82',//can change the sign-in button color from here
                        color: '#FFFFFF',
                        height: 40,
                        boxShadow: ['none']}}
                        variant="contained"
                        component="label"
                        onClick={this.handleClickOpen}
                        //onSubmit={onSubmit}
                        >
                            Share the Screen
                    </Button>    
                </div>
            </div>
        )
    }

}

export default withStyles(styles)(Sender);
