import React from "react";
import { defaultClassNames } from "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";
import axios from "axios";
import "react-dropzone-uploader/dist/styles.css";
import Loader from "../Loader/PdfLoader";

export default function ImageUploader(props) {
  const [state, setState] = React.useState([]);
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
      </div>
    );
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

  React.useEffect(async () => {
    let imageArray = [];
    if (!reload) {
      await props.default.map((image) => {
        toDataURL(`${process.env.REACT_APP_BACK_END_URL}/poster_image/${image}`)
          .then((dataUrl) => {
            return dataUrl;
          })
          .then((imageDataUrl) => {
            fetch(imageDataUrl).then((res) => {
              res.arrayBuffer().then((buf) => {
                const file = new File([buf], image, {
                  type: `image/${image.slice(-3)}`,
                });
                setState([...state, file]);
                imageArray.push(file);
              });
            });
          });
      });

      setReload(true);
    }
  }, []);

  const handleSubmit = (type, file) => {
    let data = new FormData();
    var date = new Date();
    var type = file.name.slice(-3);
    var name = `poster-image-${
      props.project_id
    }-${date.valueOf()}-${date.getMilliseconds()}-${Math.floor(
      Math.random() * 100000
    )}.${type}`;

    data.append("type", props.type);
    data.append("name", name);
    data.append("file", file);

    let config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    axios
      .post("/project/save-poster-image", data, config)
      .then((result) => {
        props.onUpload(name);
      })
      .catch((err) => alert(err.message));
    return name;
  };

  const handleChangeStatus = ({ meta, file }, status) => {
    console.log(status, meta, file);
  };

  const handleUpload = async (files, allFiles) => {
    let fileList = [];
    await files.map(async (f) => {
      var name = handleSubmit(props.type, f.file);
      fileList.push(name);
    });
  };

  function CustomLayout() {
    return (
      <React.Fragment>
        {state === false ? (
          <Loader />
        ) : (
          <Dropzone
            LayoutComponent={Layout}
            maxFiles={props.maxFiles}
            submitButtonContent={null}
            onSubmit={handleUpload}
            autoUpload={true}
            multiple={props.multiple}
            onChangeStatus={handleChangeStatus}
            accept={props.accept}
            inputContent="..."
            initialFiles={state}
          />
        )}
      </React.Fragment>
    );
  }

  return <CustomLayout />;
}
