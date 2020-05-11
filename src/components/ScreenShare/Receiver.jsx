import React from 'react';
import '../../assets/css/screenshare.css';

import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:8000');
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
var callee;
var group="GeeFour"
var callee="callee"
var room=group.concat(callee)
function sendAnswer(answer) {
    socket.emit('answer', answer);
  }
  function sendCandidate(candidate) {
    socket.emit('candidate', candidate);
  }
  function makePeerConnection() {
    if (callee) { callee=null }
    callee = new RTCPeerConnection(RTC_CONFIGURATION);
    callee.onaddstream = (event) => {
        document.getElementById('screen').srcObject = event.stream;
    };
    callee.onicecandidate = (event) => {
      if (event.candidate != null) {
        sendCandidate(event.candidate);
      }
    }
  }
  function makeAnswer() {
    callee.createAnswer().then((answer) => {
      return callee.setLocalDescription(answer);
    }).then(() => {
      sendAnswer(callee.localDescription);
    });
  }
class Receiver extends React.Component {

    

    constructor(props) {
        super(props);
        
      
        this.state = {
            
        };
        

		
    }
    
      
    componentDidMount() {
        this._isMounted = true;
        
        socket.on('offer', (offer) => {
          console.log(offer);
          callee.setRemoteDescription(offer);
          makeAnswer()
        });
        socket.on('candidate', (candidate) => {
          console.log(candidate);
          callee.addIceCandidate(candidate);
        });
    }

    render() {
        
            socket.emit('join', room);
            makePeerConnection();
        
        return (
            <div>
                <video controls playsInline autoPlay id="screen"></video>
            </div>
        )
    }

}

export default Receiver;
