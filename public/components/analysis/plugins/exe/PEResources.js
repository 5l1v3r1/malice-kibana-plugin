import React, { Fragment } from "react";
import { EuiText, EuiInMemoryTable } from "@elastic/eui";

export const PEResources = ({ resources }) => {
  if (!resources) {
    return <Fragment />;
  }

  const columns = [
    {
      field: "md5",
      name: "MD5",
      dataType: "string",
      align: "left",
      truncateText: true,
      width: "30%"
    },
    {
      field: "type",
      name: "File Type",
      dataType: "string",
      align: "left",
      width: "9%"
    },
    {
      field: "name",
      name: "Type",
      dataType: "string",
      align: "left",
      width: "17%"
    },
    {
      field: "size",
      name: "Size",
      dataType: "number",
      align: "left",
      width: "10%"
    },
    {
      field: "language_desc",
      name: "Language",
      dataType: "string",
      align: "left",
      truncateText: true,
      width: "34%"
    }
  ];

  return (
    <Fragment>
      <EuiText>
        <h4>Resources</h4>
        <div className="pe-resources">
          <EuiInMemoryTable items={resources} columns={columns} />
        </div>
      </EuiText>
    </Fragment>
  );
};
