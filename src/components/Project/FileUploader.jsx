import React from "react";
import { defaultClassNames } from "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";
import { saveAs } from "file-saver";

export default function FileUploader(props) {
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

  console.log(props.default);

  const storeFiles = (folder, file, project_id) => {
    let data = new FormData();

    data.append("file", file);
    data.append("group", project_id);
    data.append("sensitivity", "private");
    data.append("folder", folder);

    fetch("/drive/upload", {
      method: "POST",
      body: data,
    })
      .then((res) => {
        console.log(data);
        if (res.json().success) {
          alert("File Added!");
        } else {
          alert("Upload failed");
        }
      })
      .catch((err) => console.log(err.message));
  };

  function CustomLayout() {
    const handleSubmit = (files, allFiles) => {
      console.log(files.map((f) => f.meta));
      allFiles.forEach((f) => f.remove());
    };

    const handleChangeStatus = ({ meta, file }, status) => {
      if (status === "done") {
        storeFiles(props.folder, file, props.project_id);
      }
    };

    return (
      <Dropzone
        LayoutComponent={Layout}
        onChangeStatus={handleChangeStatus}
        maxFiles={props.maxFiles}
        submitButtonContent={null}
        submitButtonDisabled={true}
        multiple={props.multiple}
        accept={props.accept}
        inputContent="..."
        // initialFiles={props.default}
      />
    );
  }

  return <CustomLayout />;
}
