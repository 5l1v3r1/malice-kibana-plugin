import React from 'react';
import { EuiSpacer, EuiAccordion, EuiDescriptionList, EuiHorizontalRule } from '@elastic/eui';
import { TrID } from './TrID';

export function FileInfo({ fileinfo }) {
  const exiftoolData = [];

  Object.keys(fileinfo.exiftool).map(function (key) {
    exiftoolData.push({
      title: key,
      description: fileinfo.exiftool[key]
    });
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
    <div>
      <div>
        <EuiDescriptionList listItems={fileSummary} style={{ maxWidth: '400' }} compressed />
      </div>
      <EuiSpacer />
      <TrID trid={fileinfo.trid} />
      <EuiHorizontalRule />
      <EuiAccordion id="accordion-basic-props" buttonContent="ExifTool File Metadata" initialIsOpen={true} paddingSize="m">
        <EuiDescriptionList type="column" listItems={exiftoolData} style={{ maxWidth: '400' }} compressed />
      </EuiAccordion>
      <EuiHorizontalRule />
    </div>
  );
}
