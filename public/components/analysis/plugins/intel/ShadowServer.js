import React, { Fragment } from 'react';
import { EuiSpacer, EuiHealth, EuiText, EuiTextColor, EuiInMemoryTable, EuiDescriptionList } from '@elastic/eui';

export const ShadowServer = ({ ss }) => {
  const avResults = [];
  const { antivirus } = ss.sandbox;
  const { metadata } = ss.sandbox;

  Object.keys(antivirus).map(function (key) {
    avResults.push({
      name: key,
      result: antivirus[key]
    });
  });

  const columns = [
    {
      field: 'name',
      name: 'Name',
      sortable: true
    },
    {
      field: 'result',
      name: 'Result',
      truncateText: true,
      sortable: true,
      render: result => {
        const color = result ? 'danger' : 'success';
        const label = result ? result : 'CLEAN';
        return <EuiHealth color={color}>{label}</EuiHealth>;
      }
    }
  ];

  const fileSummary = [
    {
      title: 'MD5',
      description: `${metadata.md5}`
    },
    {
      title: 'SHA-1',
      description: `${metadata.sha1}`
    },
    {
      title: 'FirstSeen',
      description: `${metadata.first_seen}`
    },
    {
      title: 'LastSeen',
      description: `${metadata.last_seen}`
    },
    {
      title: 'FileType',
      description: `${metadata.type}`
    }
  ];

  return (
    <Fragment>
      <EuiText>
        <h4>Shadow Server</h4>
      </EuiText>
      <EuiSpacer />
      <EuiTextColor color="subdued">
        <h6>Meta Data</h6>
      </EuiTextColor>
      <EuiDescriptionList type="column" listItems={fileSummary} style={{ maxWidth: '400' }} compressed />
      <EuiSpacer />
      <EuiTextColor color="subdued">
        <h6>ANTIVIRUS</h6>
      </EuiTextColor>
      <EuiInMemoryTable items={avResults} columns={columns} />
    </Fragment>
  );
};
