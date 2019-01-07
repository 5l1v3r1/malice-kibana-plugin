import React, { Fragment } from "react";
import { EuiText } from "@elastic/eui";

export const TrID = ({ trid }) => {
  if (!trid) {
    return <Fragment />;
  }

  const items = trid.map(trid => {
    return <li key={trid}>{trid}</li>;
  });

  return (
    <Fragment>
      <EuiText>
        <h5>TRiD</h5>
        <div className="trid-list">
          <ul>{items}</ul>
        </div>
      </EuiText>
    </Fragment>
  );
};
