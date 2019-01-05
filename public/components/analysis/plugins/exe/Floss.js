import React, { Fragment } from 'react';
import { EuiText, EuiCode, EuiAccordion } from '@elastic/eui';

export const Floss = ({ floss }) => {
  if (!floss) {
    return <Fragment />;
  }

  const renderDecoded = decoded => {
    const ulItems = decoded.map(decoded => {
      const liItems = decoded.strings.map(s => {
        return (
          <li key={s}>
            <EuiText>
              <EuiCode>{s}</EuiCode>
            </EuiText>
          </li>
        );
      });
      return (
        <EuiText>
          Location: <EuiCode>{decoded.location}</EuiCode>
          <div className="decoded-list">
            <ul>{liItems}</ul>
          </div>
        </EuiText>
      );
    });

    return (
      <Fragment>
        <EuiText>
          <h4>Decoded Strings</h4>
          <div className="decoded-list">{ulItems}</div>
        </EuiText>
      </Fragment>
    );
  };

  const renderStack = stack => {
    const items = stack.map(s => {
      return <li key={s}>{s}</li>;
    });
    return (
      <Fragment>
        <EuiText>
          <h4>Stack Strings</h4>
          <div className="stack-list">
            <ul>{items}</ul>
          </div>
        </EuiText>
      </Fragment>
    );
  };

  return (
    <Fragment>
      <EuiAccordion id="accordion-floss" buttonContent="Floss" initialIsOpen={true} paddingSize="m">
        {renderDecoded(floss.decoded)}
        {renderStack(floss.stack)}
      </EuiAccordion>
    </Fragment>
  );
};
