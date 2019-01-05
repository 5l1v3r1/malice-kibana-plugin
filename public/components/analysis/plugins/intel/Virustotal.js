import React, { Fragment } from 'react';
import { EuiLink, EuiTextColor, EuiText, EuiInMemoryTable } from '@elastic/eui';

export const Virustotal = ({ vt }) => {
  const items = [
    {
      ratio: `${Math.floor((vt.positives / vt.total) * 100)}`,
      link: vt.permalink,
      api: vt.first_seen ? 'private' : 'public',
      scanned: vt.scan_date
    }
  ];

  const columns = [
    {
      field: 'ratio',
      name: 'Ratio',
      render: ratio => {
        const color = ratio > 50 ? 'danger' : 'primary';
        return <EuiTextColor color={color}>{ratio}%</EuiTextColor>;
      }
    },
    {
      field: 'link',
      name: 'Link',
      render: link => (
        <EuiLink href={link} target="_blank">
          link
        </EuiLink>
      )
    },
    {
      field: 'api',
      name: 'API'
    },
    {
      field: 'scanned',
      name: 'Scanned'
    }
  ];

  return (
    <Fragment>
      <EuiText>
        <h4>Virustotal</h4>
      </EuiText>
      <EuiInMemoryTable items={items} columns={columns} />
    </Fragment>
  );
};
