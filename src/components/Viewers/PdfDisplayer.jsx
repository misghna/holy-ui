import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Box, Typography } from '@mui/material';

// Set workerSrc for PDF.js worker (required by react-pdf)
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PdfDisplayer = ({ item, onDoubleClick, displayContent }) => {
  const [numPages, setNumPages] = useState(null);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <Box sx={{ cursor: 'pointer' }} onDoubleClick={onDoubleClick}>
      {displayContent
      ? 
      <Box>
        <Typography variant="h6" gutterBottom>
          {item.title}
        </Typography>
        <Document file={item.content} onLoadSuccess={onDocumentLoadSuccess}>
          {Array.from(new Array(numPages), (el, index) => (
            <Page key={`page_${index + 1}`} pageNumber={index + 1} width='580'/>
          ))}
        </Document>
      </Box>
      :
      <Box sx={{ height: 130, overflow: 'hidden' }}>
        <Document file={item.content} onLoadSuccess={onDocumentLoadSuccess}>
          <Page pageNumber={1} width={450} />
        </Document>
      </Box>
}
    </Box>
  );
};

export default PdfDisplayer;

