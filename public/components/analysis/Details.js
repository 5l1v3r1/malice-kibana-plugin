import React from 'react';
import { EuiSpacer } from '@elastic/eui';

import { FileInfo } from '../analysis/plugins/metadata/FileInfo';
import { Pdf } from '../analysis/plugins/document/PDF';
import { Floss } from '../analysis/plugins/exe/Floss';

export const Details = ({ plugins }) => {
  return (
    <div>
      <FileInfo fileinfo={plugins.metadata.fileinfo} />
      <EuiSpacer />
      <Pdf pdf={plugins.document.pdf} />
      <EuiSpacer />
      <Floss floss={plugins.exe.floss} />
    </div>
  );
};
