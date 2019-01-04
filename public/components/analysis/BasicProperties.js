import React from 'react';
import { EuiAccordion, EuiDescriptionList } from '@elastic/eui';

const BasicProperties = props => {
  console.log('props :', props);
  const basicProps = [
    {
      title: 'SHA-256',
      description: `${file.sha256}`
    },
    {
      title: 'File name',
      description: `${file.name}`
    },
    {
      title: 'File size',
      description: `${file.size}`
    }
  ];

  return (
    <div>
      <EuiAccordion id="accordion-basic-props" buttonContent="Click me to toggle open / close">
        <EuiDescriptionList type="column" listItems={basicProps} style={{ maxWidth: '400' }} compressed />
      </EuiAccordion>
    </div>
  );
};

export default BasicProperties;
