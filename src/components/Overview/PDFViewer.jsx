import React from "react";
import PDFViewer from "pdf-viewer-reactjs";

export default function PDFViewerComponent(props) {
  return (
    <PDFViewer
      document={{
        url: "http://localhost:3000/pdf/".concat(props.url),
      }}
      scale={1.25}
      scaleStep={0.5}
      canvasCss={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      watermark={{
        text: "Exploratory", //Watermark text
        diagonal: true, // Watermark placement true for Diagonal, false for Horizontal
        opacity: 0.1, // Watermark opacity ranges from 0 to 1
        size: 100,
        color: "#000",
      }}
      navigation={{
        css: {
          navbarWrapper: {},
        },
      }}
      hideNavbar={!props.view}
    />
  );
}
