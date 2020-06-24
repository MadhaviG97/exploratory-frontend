import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from "axios";
import ButtonLoader from "../../Loader/ButtonLoader";

export default function FormDialog(props) {
  const [text, setText] = React.useState(props.default);
  const [success, setSuccess] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = () => {
    setLoading(true);
    let config = {
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
      },
    };

    axios
      .post(
        "/project/edit-abstract",
        {
          project_id: props.project_id,
          abstract: text,
        },
        config
      )
      .then((res) => {
        setLoading(false);
        setSuccess(true);
        props.onSubmit();
      })
      .catch((err) => {
        props.onClose();
      });
  };

  const handleChange = (event) => {
    setText(event.target.value);
  };
  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.onClose}
        fullWidth
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit Abstract</DialogTitle>

        <DialogContent>
          <TextField
            id="outlined-multiline-static"
            label="add an abstract here..."
            value={text}
            onChange={handleChange}
            fullWidth
            multiline
            rows={4}
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={props.onClose} color="primary">
            CLOSE
          </Button>
          <ButtonLoader
            name="SUBMIT"
            success={success}
            loading={loading}
            onClick={handleSubmit}
          />

          {/* <Button variant="contained" onClick={handleSubmit} color="primary">
            SUBMIT
          </Button> */}
        </DialogActions>
      </Dialog>
    </div>
  );
}
