import React from "react";
// import { defaultClassNames } from "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";
import axios from "axios";
import "react-dropzone-uploader/dist/styles.css";
import Loader from "../Loader/PdfLoader";
import { Button } from "@material-ui/core";

export default function FileUploader(props) {
  const [state, setState] = React.useState({
    file: null,
  });
  const [reload, setReload] = React.useState(false);

  const Layout = ({
    input,
    previews,
    submitButton,
    dropzoneProps,
    files,
    extra: { maxFiles },
  }) => {
    return (
      <div>
        {previews} ​
        <div {...dropzoneProps}>{files.length < maxFiles && input}</div> ​
        {files.length > 0 && submitButton}
        {files.length == 0 && (
          <React.Fragment>
            <br />
            <Button
              onClick={handleRemovePaper}
              variant="contained"
              color="primary"
            >
              save
            </Button>
            <br />
            <br />
          </React.Fragment>
        )}
      </div>
    );
  };

  const handleRemovePaper = () => {
    axios
      .post("/project/remove-final-paper", { project_id: props.project_id })
      .then((response) => alert(response.data.message))
      .catch((err) => alert(err.response.data.message));
  };

  const toDataURL = (url) =>
    fetch(url)
      .then((response) => response.blob())
      .then(
        (blob) =>
          new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
          })
      );

  React.useEffect(() => {
    if (!reload) {
      if (props.default !== {}) {
        toDataURL(
          `${process.env.REACT_APP_BACK_END_URL}/final_paper/${props.default}`
        )
          .then((dataUrl) => {
            return dataUrl;
          })
          .then((imageDataUrl) => {
            fetch(imageDataUrl).then((res) => {
              res.arrayBuffer().then((buf) => {
                const file = new File([buf], props.default, {
                  type: "application/pdf",
                });
                console.log(file);
                setState({ file });
              });
            });
          });
      } else {
        setState({ file: {} });
      }
    }
    setReload(true);
  }, []);

  const handleSubmit = (type, file) => {
    let data = new FormData();
    var date = new Date();
    var type = file.name.slice(-3);
    var name = `${props.project_id}.${type}`;

    data.append("project_id", props.project_id);
    data.append("type", props.type);
    data.append("name", name);
    data.append("file", file);

    let config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    axios
      .post("/project/save-file", data, config)
      .then((result) => alert(result.data.message))
      .catch((err) => alert(err.message));
  };

  const handleChangeStatus = ({ meta, file }, status) => {
    console.log(status, meta, file);
  };

  const handleUpload = async (files, allFiles) => {
    await files.map((f) => {
      handleSubmit(props.type, f.file);
    });
  };

  function CustomLayout() {
    return (
      <React.Fragment>
        {state.file === null ? (
          <Loader />
        ) : (
          <Dropzone
            LayoutComponent={Layout}
            maxFiles={props.maxFiles}
            submitButtonContent={"save"}
            onSubmit={handleUpload}
            multiple={props.multiple}
            // onChangeStatus={handleChangeStatus}
            accept={props.accept}
            inputContent="..."
            initialFiles={[state.file]}
          />
        )}
      </React.Fragment>
    );
  }

  return <CustomLayout />;
}
