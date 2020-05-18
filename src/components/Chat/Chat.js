import React from 'react';
import ChatWindow from './ChatWindow'
import ChatList from './ChatList'
import { Grid, Paper } from '@material-ui/core'

import socket from '../../connections/socket';


export default class Chat extends React.Component {

  constructor(props) {
    super()
    this.state = {
      user_id: props.user._id,
      client: null,
      hiddenState: true,
      currentChatID: null,
      currentChatListID: null,
      chatRooms: null,
      globalReload: true,
      user: props.user,
      token: props.token
    }

    this.onMessageReceived = this.onMessageReceived.bind(this)
    this.setStateFromChild = this.setStateFromChild.bind(this)
  }

  setStateFromChild(newState) {
    this.setState(newState)
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
      this.setState({ chatRooms: res })
    })
  }


  render() {
    if (!this.state.chatRooms) {
      return <div />
    }

    return (
      <div className="App" style={{ height: '100vh' }}>
        <Grid container style={{ height: '100%' }}>
          <Paper style={{ height: '100%' }}>

            <ChatWindow
              state={this.state}
              setStateFromChild={this.setStateFromChild}
            />
            <ChatList
              state={this.state}
              setStateFromChild={this.setStateFromChild}
            />

          </Paper>
        </Grid>
      </div>
    )
  }
}
