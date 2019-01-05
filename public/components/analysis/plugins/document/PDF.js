import React, { Fragment } from 'react';
import { EuiAccordion } from '@elastic/eui';

import { PdfId } from './PDFiD';
import { PdfParser } from './PdfParser';

export const Pdf = ({ pdf }) => {
  return (
    <Fragment>
      <EuiAccordion id="accordion-pdf" buttonContent="PDF" initialIsOpen={true} paddingSize="m">
        <PdfId pdfid={pdf.pdfid} />
        <PdfParser streams={pdf.streams} />
      </EuiAccordion>
    </Fragment>
  );
};
