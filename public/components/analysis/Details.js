import React from 'react';
import { EuiHorizontalRule } from '@elastic/eui';

import { FileInfo } from '../analysis/plugins/metadata/FileInfo';
import { Pdf } from '../analysis/plugins/document/PDF';
export const Details = ({ plugins }) => {
  return (
    <div>
      <FileInfo fileinfo={plugins.metadata.fileinfo} />
      <EuiHorizontalRule />
      <Pdf pdf={plugins.document.pdf} />
    </div>
  );
};
