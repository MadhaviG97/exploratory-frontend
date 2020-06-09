import React from 'react';
import '../../assets/css/screenshare.css';
import Box from '@material-ui/core/Box';
import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:8000',{transports: ['websocket', 'polling', 'flashsocket']});
const RTC_CONFIGURATION = {
    iceServers: [
      { urls: 'stun:stun.l.google.com:19302' },
      {
        urls: 'turn:webrtcweb.com:80',
        username: 'muazkh',
        credential: 'muazkh'
      },
      {
        urls: 'turn:webrtcweb.com:443',
        username: 'muazkh',
        credential: 'muazkh'
      }
    ]
  };
var callee;

var calleename="callee"

function sendAnswer(answer,group) {
    socket.emit('answer', {room: group,answer:answer});
  }
  function sendCandidate(candidate,group) {
    socket.emit('candidate', {room: group,candidate:candidate});
  }
  function makePeerConnection(group) {
    if (callee) { callee.close() }
    callee = new RTCPeerConnection(RTC_CONFIGURATION);
    callee.onaddstream = (event) => {
        document.getElementById('screen').srcObject = event.stream;
    };
    callee.onicecandidate = (event) => {
      if (event.candidate != null) {
        sendCandidate(event.candidate,group);
      }
    }
  }
  function makeAnswer(group) {
    callee.createAnswer().then((answer) => {
      return callee.setLocalDescription(answer);
    }).then(() => {
      sendAnswer(callee.localDescription,group);
    });
}
class Receiver extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sender:null
        };
        this.group=props.userProp.userData._id
    }
    
    shouldComponentUpdate(nextProps, nextState) {
      return false;
    }  
    componentDidMount() {
        this._isMounted = true;
        
        socket.on('offer', (offer) => {
          console.log(offer);
          callee.setRemoteDescription(offer);
          makeAnswer(this.group)
        });
        socket.on('candidate', (candidate) => {
          console.log(candidate);
          callee.addIceCandidate(candidate);
        });
        socket.on('sender', (sender) => {
          console.log(sender)
          this.props.senderSet(sender)
      });
    }

    render() {
            console.log(this.group)
            var room=this.group.toString().concat('callee')
            socket.emit('join', room);
            makePeerConnection(this.group);
        
        return (

          <div>
              
              <div  data-cy="screen-video">
                  <video controls playsInline autoPlay id="screen"></video>
              </div>
          </div>
        )
    }

    
}

export default Receiver;
