import React from "react";
import {Grid , Paper} from '@material-ui/core'
import Chat from '../../components/Chat/Chat'

export default function ChatApp() {
  return (
    <div className="App" style={{height:'100vh'}}>
    <Grid container style={{height:'100%'}}>
    <Paper style={{height:'100%'}}>
    {/* <ChatList /> */}
    <Chat/>
    </Paper>
    </Grid>
  </div>
  );
}

