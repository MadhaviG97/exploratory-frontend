import React, { useState } from 'react';
import ChatWindow from './ChatWindow2'
import ChatList from './ChatList'
import { Grid, Paper } from '@material-ui/core'


import socket from '../../connections/socket';

const dummyThreads = [
  {
    title: "Group 1",
    logo: "/logo.png",
    messages: [

    ]
  }
]
// const Chat = (props) =>{
export default class Chat extends React.Component {
  // const [hiddenState, setHiddenState] = useState(true);
  // const [chatRooms, setChatRooms] = useState([])
  // const [client,setClient]=useState(socket(10001,"dummy token"))

  constructor(props) {
    super()
    this.state = {
      user_id: props.user._id,
      client: null,
      hiddenState: true,
      currentChatID: null,
      chatRooms: null,
      user:props.user,
      token:props.token
    }

    this.setHiddenState = this.setHiddenState.bind(this)
    this.setCurrentChatID = this.setCurrentChatID.bind(this)
    this.onMessageReceived = this.onMessageReceived.bind(this)

  }

  setHiddenState(newHidden) {
    this.setState({ hiddenState: newHidden })
  }

  setCurrentChatID(newChatID) {
    this.setState({ currentChatID: newChatID })
  }

  onMessageReceived(msg) {

    var newChatRooms = this.state.chatRooms.slice()

    newChatRooms.forEach(chat => {
      if (chat.chat_id == msg.chat_id) {
        chat.chatMesseges.push(msg)
      }
    })

    this.setState({ chatRooms: newChatRooms })

  }

  async componentDidMount() {
    var controls = {
      onMessageReceived: this.onMessageReceived
    }
    await this.setState({
      client: socket(this.state.user_id, this.state.token, controls)
    })
    this.state.client.getChatrooms((err, res) => {
      // setChatRooms(res)
      // console.log("chatroom retuern")
      // console.log(res)
      this.setState({ chatRooms: res })
      // console.log(res)
    })

    // this.state.client.searchResearchers("Damika",(res)=>{console.log(res)})
  }
  render() {
    if (!this.state.chatRooms) {
      return <div />
    }
    //  console.log(this.state.chatRooms)
    return (
      <div className="App" style={{ height: '100vh' }}>
        <Grid container style={{ height: '100%' }}>
          <Paper style={{ height: '100%' }}>

            <ChatWindow
              controls={{ hiddenState: this.state.hiddenState, setHiddenState: this.setHiddenState }}
              state={this.state}
            />
            <ChatList
              controls={{
                hiddenState: this.state.hiddenState,
                setHiddenState: this.setHiddenState,
                setCurrentChatID: this.setCurrentChatID
              }}
              state={this.state}
              chatRooms={this.state.chatRooms}
            />

          </Paper>
        </Grid>
      </div>
    )
  }
}
// export default Chat