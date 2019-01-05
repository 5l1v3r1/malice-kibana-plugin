import React, { Fragment } from 'react';
import { EuiSpacer, EuiHealth, EuiTextColor, EuiInMemoryTable, EuiDescriptionList, EuiAccordion } from '@elastic/eui';
import _ from 'lodash';

export const ShadowServer = ({ ss }) => {
  if (!ss) {
    return <Fragment />;
  }

  const avResults = [];
  const { antivirus } = ss.sandbox;
  const { metadata } = ss.sandbox;
  const { whitelist } = ss;

  Object.keys(antivirus).map(function (key) {
    avResults.push({
      name: key,
      result: antivirus[key]
    });
  });

  const renderWhiteList = whitelist => {
    if (!whitelist) {
      return <Fragment />;
    }
    const whitelistResults = [];
    Object.keys(whitelist).map(function (key) {
      whitelistResults.push({
        name: _.startCase(key),
        result: whitelist[key]
      });
    });
    const whitelistColumns = [
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

    return (
      <Fragment>
        <EuiTextColor color="subdued">
          <h6>WHITE LIST</h6>
        </EuiTextColor>
        <EuiInMemoryTable items={whitelistResults} columns={whitelistColumns} />
      </Fragment>
    );
  };

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

  const seenRange = [
    {
      title: 'FirstSeen',
      description: `${metadata.first_seen}`
    },
    {
      title: 'LastSeen',
      description: `${metadata.last_seen}`
    }
  ];

  return (
    <Fragment>
      <EuiAccordion id="accordion-ss" buttonContent="Shadow Server" initialIsOpen={true} paddingSize="m">
        <EuiDescriptionList listItems={seenRange} style={{ maxWidth: '400' }} compressed />
        <EuiSpacer />
        <EuiTextColor color="subdued">
          <h6>ANTIVIRUS</h6>
        </EuiTextColor>
        <EuiInMemoryTable items={avResults} columns={columns} />
        {renderWhiteList(whitelist)}
      </EuiAccordion>
    </Fragment>
  );
};
