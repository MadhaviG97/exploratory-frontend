import React from "react";
import { defaultClassNames } from "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";

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
    const getUploadParams = () => ({ url: "https://httpbin.org/post" });

    const handleSubmit = (files, allFiles) => {
      console.log(files.map((f) => f.meta));
      allFiles.forEach((f) => f.remove());
    };

    return (
      <Dropzone
        getUploadParams={getUploadParams}
        LayoutComponent={Layout}
        onSubmit={handleSubmit}
        maxFiles={props.maxFiles}
        submitButtonContent={null}
        submitButtonDisabled={true}
        multiple={props.multiple}
        accept={props.accept}
        // {...props.extra}
        // classNames={{ inputLabelWithFiles: defaultClassNames.inputLabel }}
        inputContent="..."
      />
    );
  }

  return <CustomLayout />;
}
