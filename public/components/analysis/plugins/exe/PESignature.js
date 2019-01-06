import React, { Fragment } from "react";
import { EuiText, EuiBetaBadge } from "@elastic/eui";

export const PESignature = ({ signature }) => {
  if (!signature) {
    return <Fragment />;
  }

  return (
    <Fragment>
      <EuiText>
        <h4>
          Signature Info{" "}
          <EuiBetaBadge
            label="Beta"
            tooltipContent="This module is not complete."
          />
        </h4>
        <div className="pe-signature">
          <p>{signature.heuristic}</p>
        </div>
      </EuiText>
    </Fragment>
  );
};
