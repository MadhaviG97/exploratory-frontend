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

  function CustomLayout() {
    // specify upload params and url for your files
    const getUploadParams = ({ meta }) => {
      return { url: "https://localhost:3000" };
    };

    // called every time a file's `status` changes
    const handleChangeStatus = ({ meta, file }, status) => {
      console.log(status, meta, file);
    };

    // receives array of files that are done uploading when submit button is clicked
    const handleSubmit = (files, allFiles) => {
      console.log(files.map((f) => f.meta));
      allFiles.forEach((f) => f.remove());
    };

    return (
      <Dropzone
        getUploadParams={getUploadParams}
        LayoutComponent={Layout}
        onSubmit={handleSubmit}
        onChangeStatus={handleChangeStatus}
        maxFiles={props.maxFiles}
        submitButtonContent={null}
        submitButtonDisabled={true}
        multiple={props.multiple}
        accept={props.accept}
        autoUpload={true}
        // {...props.extra}
        // classNames={{ inputLabelWithFiles: defaultClassNames.inputLabel }}
        inputContent="..."
      />
    );
  }

  return <CustomLayout />;
}
