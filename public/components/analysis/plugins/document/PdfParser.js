import React, { Fragment } from 'react';
import { EuiText, EuiSpacer } from '@elastic/eui';

export const PdfParser = ({ streams }) => {
  if (!streams) {
    return <Fragment />;
  }
  return (
    <Fragment>
      <EuiText>
        <h4>pdf-parser</h4>
      </EuiText>
      <EuiSpacer />
    </Fragment>
  );
};
