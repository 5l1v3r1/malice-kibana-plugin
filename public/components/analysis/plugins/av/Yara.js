import React, { Fragment } from 'react';
import { EuiAccordion, EuiInMemoryTable } from '@elastic/eui';

export const Yara = ({ yara }) => {
  if (!yara) {
    return <Fragment />;
  }

  const yaraResults = [];
  Object.keys(yara).map(function (key) {
    yaraResults.push({
      name: key,
      result: yara[key]
    });
  });

  const columns = [
    {
      field: 'rule',
      name: 'Rule',
      sortable: true
    },
    {
      field: 'description',
      name: 'Description',
      truncateText: true,
      sortable: true
    },
    {
      field: 'offset',
      name: 'Offset',
      truncateText: true,
      sortable: true
    },
    {
      field: 'data',
      name: 'Data',
      truncateText: true,
      sortable: true
    },
    {
      field: 'tags',
      name: 'Tags',
      truncateText: true,
      sortable: true
    }
  ];

  return (
    <Fragment>
      <EuiAccordion id="accordion-yara" buttonContent="Yara" initialIsOpen={true} paddingSize="m">
        <EuiInMemoryTable items={yaraResults} columns={columns} />
      </EuiAccordion>
    </Fragment>
  );
};
