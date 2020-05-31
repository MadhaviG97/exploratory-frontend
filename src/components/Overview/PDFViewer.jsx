import React from "react";
import PDFViewer from "pdf-viewer-reactjs";
import "../../assets/css/canvas.css";
import PdfLoader from "../Loader/PdfLoader";

export default function PDFViewerComponent(props) {
  return (
    <PDFViewer
      document={{
        url: `${process.env.REACT_APP_BACK_END_URL}/final_paper/${props.project_id}.pdf`,
      }}
      scale={1}
      scaleStep={0.1}
      watermark={{
        text: "Exploratory", //Watermark text
        diagonal: true, // Watermark placement true for Diagonal, false for Horizontal
        opacity: "0.1", // Watermark opacity ranges from 0 to 1
        size: "100",
        color: "#000",
      }}
      navigation={{
        css: "canvas",
      }}
      loader={<PdfLoader />}
      hideNavbar={!props.view}
    />
  );
}
