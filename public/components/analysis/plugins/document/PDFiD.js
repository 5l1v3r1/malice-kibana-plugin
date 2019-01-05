import React, { Fragment } from 'react';
import { EuiText, EuiSpacer } from '@elastic/eui';

export const PdfId = ({ pdfid }) => {
  if (!pdfid) {
    return <Fragment />;
  }
  return (
    <Fragment>
      <EuiText>
        <h4>PDFiD</h4>
      </EuiText>
      <EuiSpacer />
    </Fragment>
  );
};
