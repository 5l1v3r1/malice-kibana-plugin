import React, { Fragment } from 'react';
import { EuiText, EuiHealth } from '@elastic/eui';

export const Nsrl = ({ nsrl }) => {
  const color = nsrl.found ? 'success' : 'subdued';
  const label = nsrl.found ? 'CLEAN' : 'Unknown';
  return (
    <Fragment>
      <EuiText>
        <h4>NSRL</h4>
        <div className="intel-nsrl">
          <EuiHealth color={color}>{label}</EuiHealth>
        </div>
      </EuiText>
    </Fragment>
  );
};
