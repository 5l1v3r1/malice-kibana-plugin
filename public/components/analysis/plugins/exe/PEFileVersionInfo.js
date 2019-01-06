import React, { Fragment } from "react";
import { EuiText, EuiDescriptionList } from "@elastic/eui";
import _ from "lodash";

export const PEFileVersionInfo = ({ verInfo }) => {
  if (!verInfo) {
    return <Fragment />;
  }

  const fileVersionInfo = [];
  Object.keys(verInfo).map(function(key) {
    if (verInfo[key]) {
      fileVersionInfo.push({
        title: _.startCase(key),
        description: verInfo[key]
      });
    }
  });

  return (
    <Fragment>
      <EuiText>
        <h4>File Version Information</h4>
        <div className="pe-fileVersionInfo">
          <EuiDescriptionList
            type="column"
            listItems={fileVersionInfo}
            style={{ maxWidth: "400" }}
            compressed
          />
        </div>
      </EuiText>
    </Fragment>
  );
};
