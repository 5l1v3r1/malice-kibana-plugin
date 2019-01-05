import React, { Fragment } from 'react';
import { EuiSpacer, EuiAccordion, EuiDescriptionList, EuiHorizontalRule } from '@elastic/eui';
import { TrID } from './TrID';

export function FileInfo({ fileinfo }) {
  const exiftoolData = [];

  Object.keys(fileinfo.exiftool).map(function (key) {
    if (fileinfo.exiftool[key]) {
      exiftoolData.push({
        title: key,
        description: fileinfo.exiftool[key]
      });
    }
  });

  const fileSummary = [
    {
      title: 'File Type',
      description: `${fileinfo.magic.description}`
    },
    {
      title: 'Magic',
      description: `${fileinfo.magic.mime}`
    },
    {
      title: 'SSDeep',
      description: `${fileinfo.ssdeep}`
    }
  ];

  return (
    <Fragment>
      <EuiAccordion id="accordion-fileinfo" buttonContent="File Info" initialIsOpen={true} paddingSize="m">
        <EuiDescriptionList listItems={fileSummary} style={{ maxWidth: '400' }} compressed />
        <EuiSpacer />
        <TrID trid={fileinfo.trid} />
        <EuiHorizontalRule />
        <EuiAccordion id="accordion-basic-props" buttonContent="ExifTool File Metadata" initialIsOpen={true} paddingSize="m">
          <EuiDescriptionList type="column" listItems={exiftoolData} style={{ maxWidth: '400' }} compressed />
        </EuiAccordion>
        <EuiHorizontalRule />
      </EuiAccordion>
    </Fragment>
  );
}
