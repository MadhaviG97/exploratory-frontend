import React from 'react';
import '../../assets/css/screenshare.css';
import openSocket from 'socket.io-client';
import Button from '@material-ui/core/Button';
const socket = openSocket('http://localhost:8000');
var caller;
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
function sendOffer(offer) {
    socket.emit('offer', offer);
  }
  function sendCandidate(candidate) {
    socket.emit('candidate', candidate);
  }
  function getStream() {
    return new Promise((resolve, reject) => {
      navigator.mediaDevices.getDisplayMedia({ audio: false, video: true }).then((mediaStream) => {
        resolve(mediaStream);
      })
    });
  }
  function makePeerConnection(stream) {
    if (caller) { caller.close(); }
    caller = new RTCPeerConnection(RTC_CONFIGURATION);
    caller.addStream(stream);
    caller.onicecandidate = (event) => {
      if (event.candidate != null) {
        sendCandidate(event.candidate);
      }
    }
    makeOffer()
  }
  function makeOffer() {
    caller.createOffer().then((offer) => {
      return caller.setLocalDescription(offer);
    }).then(() => {
      sendOffer(caller.localDescription);
    });
  }
class Sender extends React.Component {

    

    constructor(props) {
        super(props);
     
        this.state = {
            
        };
       

        
		
    }
    
    
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

    
    handleClick(){
        
        getStream().then((stream) => {
            document.getElementById('screen').srcObject = stream;
            makePeerConnection(stream);
        });
    }
    

    render() {
        
        
        socket.emit('join', '1234caller');
        
       
        return (
            <div>
               
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
                        onClick={this.handleClick}
                        //onSubmit={onSubmit}
                        >
                            Share the Screen
                    </Button>    
                </div>
                
                

                
               
            </div>
        )
    }

}

export default Sender;
