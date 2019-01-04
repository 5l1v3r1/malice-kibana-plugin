import React from 'react';
import { EuiInMemoryTable, EuiHealth } from '@elastic/eui';

export function Detection({ av }) {
  const avResults = [];

  Object.keys(av).map(function (key) {
    if (av[key] && key !== 'yara') {
      avResults.push({
        name: key,
        result: av[key].result,
        updated: av[key].updated
      });
    }
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
    },
    {
      field: 'updated',
      name: 'Updated'
    }
  ];

  return <EuiInMemoryTable items={avResults} columns={columns} />;
}
