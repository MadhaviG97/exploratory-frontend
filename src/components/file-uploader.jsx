import React from "react";
import Avatar from "react-avatar-edit";

export default class App extends React.Component {
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
          width="100%"
          height={295}
          onCrop={this.onCrop}
          onClose={this.onClose}
          src={this.state.preview}
        />
        {/* <img src={this.state.preview} alt="Preview" /> */}
      </div>
    );
  }
}
