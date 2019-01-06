import React, { Fragment } from "react";
import { EuiText, EuiBetaBadge, EuiBadge } from "@elastic/eui";
import _ from "lodash";

export const PEiD = ({ peid, isPacked, language }) => {
  if (!peid) {
    return <Fragment />;
  }

  const peidItems = peid.map(peid => {
    return <li key={peid}>{peid}</li>;
  });

  const packedBadge = isPacked ? (
    <EuiBadge color="#920000" iconType="check" iconSide="left">
      True
    </EuiBadge>
  ) : (
    <EuiBadge color="#00B3A4" iconType="cross" iconSide="left">
      False
    </EuiBadge>
  );

  return (
    <Fragment>
      <EuiText size="s">
        <h4>PEiD</h4>
        <div className="pe-peid">
          <ul>{peidItems}</ul>
          <h5>Is Probably Packed: {packedBadge}</h5>
          <h5>Language: {language}</h5>
        </div>
      </EuiText>
    </Fragment>
  );
};
