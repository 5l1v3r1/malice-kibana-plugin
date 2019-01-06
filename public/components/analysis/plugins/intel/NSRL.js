import React, { Fragment } from "react";
import { EuiPanel, EuiText, EuiHealth, EuiAccordion } from "@elastic/eui";

export const Nsrl = ({ nsrl }) => {
  if (!nsrl) return <Fragment />;
  const color = nsrl.found ? "success" : "subdued";
  const label = nsrl.found ? "CLEAN" : "Unknown";

  return (
    <Fragment>
      <EuiAccordion
        id="accordion-nsrl"
        buttonContent="NSRL"
        initialIsOpen={true}
        paddingSize="m"
      >
        <EuiPanel hasShadow>
          <EuiText>
            <div className="intel-nsrl">
              <EuiHealth color={color}>{label}</EuiHealth>
            </div>
          </EuiText>
        </EuiPanel>
      </EuiAccordion>
    </Fragment>
  );
};
