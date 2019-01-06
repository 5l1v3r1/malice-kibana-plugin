import React, { Fragment } from "react";
import { EuiPanel, EuiDescriptionList } from "@elastic/eui";
import moment from "moment";

export function FileSummary({ file, scanDate }) {
  const fileSummary = [
    {
      title: "SHA-256",
      description: `${file.sha256}`
    },
    {
      title: "File name",
      description: `${file.name}`
    },
    {
      title: "File size",
      description: `${file.size}`
    },
    {
      title: "Scan Date",
      description: moment.utc(scanDate).fromNow()
    }
  ];

  return (
    <Fragment>
      <EuiPanel hasShadow>
        <EuiDescriptionList
          listItems={fileSummary}
          style={{ maxWidth: "400" }}
          compressed
        />
      </EuiPanel>
    </Fragment>
  );
}
