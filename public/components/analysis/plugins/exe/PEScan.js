import React, { Fragment } from 'react';
import { EuiText, EuiCode, EuiAccordion } from '@elastic/eui';

export const PEScan = ({ pescan }) => {
  if (!pescan) {
    return <Fragment />;
  }

  const renderImports = imports => {
    const dlls = Object.keys(imports).map(function (key) {
      const items = imports[key].map(s => {
        return <li key={s.name}>{s.name}</li>;
      });
      return (
        <Fragment>
          <EuiAccordion id={key} buttonContent={key} initialIsOpen={false} paddingSize="m">
            {<ul>{items}</ul>}
          </EuiAccordion>
        </Fragment>
      );
    });

    return (
      <Fragment>
        <EuiText>
          <h4>Imports</h4>
          <div className="imports-list">{dlls}</div>
        </EuiText>
      </Fragment>
    );
  };

  return (
    <Fragment>
      <EuiAccordion id="accordion-pescan" buttonContent="Portable Executable Info" initialIsOpen={true} paddingSize="m">
        {renderImports(pescan.imports)}
      </EuiAccordion>
    </Fragment>
  );
};
