import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const ResponseDialog = (props) => {

  return (
    <div id='responseDialog'>
      <Dialog
        open={props.open}
        onClose={props.handleCloseResponseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
        {/* <DialogContent>
      <DialogContentText id="alert-dialog-description">
        {props.description}
      </DialogContentText>
    </DialogContent> */}
        <DialogActions>
          <Button onClick={props.handleCloseResponseDialog} color="primary">
            OK
      </Button>

        </DialogActions>
      </Dialog>
    </div>
  )
}

export default ResponseDialog
