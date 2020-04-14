import React from "react";
import Avatar from "react-avatar-edit";
import Box from '@material-ui/core/Box';

export default class FileUploader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      preview: null,
      src: null,
    };
    this.onCrop = this.onCrop.bind(this);
    this.onClose = this.onClose.bind(this);
  }

  onClose() {
    this.setState({ preview: null });
  }

  onCrop(preview) {
    this.setState({ preview });
    console.log(this.state.src);
  }

  render() {
    return (
      <div>
        
        <Avatar
          width={140}
          height={140}
          onCrop={this.onCrop}
          onClose={this.onClose}
          src={this.state.preview}
        />
        
        {/* <img src={this.state.preview} alt="Preview" /> */}
      </div>
    );
  }
}
