import React from 'react';

import { FileInfo } from '../analysis/plugins/FileInfo';

export const Details = ({ plugins }) => {
  return (
    <div>
      <FileInfo fileinfo={plugins.metadata.fileinfo} />
    </div>
  );
};
