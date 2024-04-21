import { useState } from "react";

import { Box } from "@mui/material";
import { object, bool, func } from "prop-types";
import { Document, Page, pdfjs } from "react-pdf";

// Set workerSrc for PDF.js worker (required by react-pdf)
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PdfDisplayer = ({ item, onDoubleClick, displayContent }) => {
  const [numPages, setNumPages] = useState(null);
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <Box sx={{ cursor: "pointer" }} onDoubleClick={onDoubleClick}>
      {displayContent ? (
        <Box>
          <Document file={item.media_link[0]} onLoadSuccess={onDocumentLoadSuccess}>
            {Array.from(new Array(numPages), (el, index) => (
              <Page
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                width="580"
                renderTextLayer={false}
                renderAnnotationLayer={false}
              />
            ))}
          </Document>
        </Box>
      ) : (
        <Box sx={{ height: 130, overflow: "hidden" }}>
          <Document file={item.media_link[0].file_name} onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={1} width={450} />
          </Document>
        </Box>
      )}
    </Box>
  );
};

export default PdfDisplayer;

PdfDisplayer.propTypes = {
  item: object,
  displayContent: bool,
  onDoubleClick: func
};
