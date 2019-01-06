import React, { Fragment } from "react";
import { EuiText, EuiSpacer, EuiCode, EuiAccordion } from "@elastic/eui";

export const PEImports = ({ imphash, imports }) => {
  if (!imports) {
    return <Fragment />;
  }

  const dlls = imports.map(i => {
    return Object.keys(i).map(function(key) {
      const listItems = i[key].map(s => {
        return <li key={s.name}>{s.name}</li>;
      });
      return (
        <Fragment>
          <EuiAccordion
            id={key}
            buttonContent={key}
            initialIsOpen={false}
            paddingSize="m"
          >
            <ul>{listItems}</ul>
          </EuiAccordion>
        </Fragment>
      );
    });
  });

  return (
    <Fragment>
      <EuiText>
        <h4>Imports</h4>
        <h5>
          Imports Hash: <EuiCode>{imphash}</EuiCode>
        </h5>
        <EuiSpacer />
        <div className="imports-list">{dlls}</div>
      </EuiText>
    </Fragment>
  );
};
