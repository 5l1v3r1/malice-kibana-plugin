import React from 'react';
import { EuiDescriptionList } from '@elastic/eui';
import moment from 'moment';

function FileSummary({ file, scan_date }) {
  console.log('file :', file);
  const fileSummary = [
    {
      title: 'SHA-256',
      description: `${file.sha256}`
    },
    {
      title: 'SHA-1',
      description: `${file.sha1}`
    },
    {
      title: 'MD5',
      description: `${file.md5}`
    },
    {
      title: 'File name',
      description: `${file.name}`
    },
    {
      title: 'File size',
      description: `${file.size}`
    },
    {
      title: 'Scan Date',
      description: moment.utc(scan_date).fromNow()
    }
  ];

  return (
    <div>
      <EuiDescriptionList type="column" listItems={fileSummary} style={{ maxWidth: '400' }} compressed />
    </div>
  );
}

export default FileSummary;
