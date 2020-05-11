import React from "react";
import { Grid, Paper } from '@material-ui/core'
import { useSelector } from "react-redux"
import Chat from '../../components/Chat/Chat'

export default function ChatApp() {

  const user= useSelector((state) => state.user.userData)
  const token=localStorage.token
 
  if(user==undefined){
    return(<div/>)
  }

  return (
    <div className="App" style={{ height: '100vh' }}>
      <Grid
        container
        justify="flex-end"
        alignItems="center"
        style={{ height: '100%' }}>
          <Paper style={{ height: '100%' }}>
            {/* <ChatList /> */}
            <Chat 
            user={user}
            token={token}
            />
          </Paper>
      </Grid>
    </div>
  );
}

