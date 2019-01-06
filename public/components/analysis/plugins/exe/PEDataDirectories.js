import React, { Fragment } from "react";
import { EuiText, EuiInMemoryTable } from "@elastic/eui";

export const PEDataDirectories = ({ dataDirs }) => {
  if (!dataDirs) {
    return <Fragment />;
  }

  const columns = [
    {
      field: "name",
      name: "Name",
      dataType: "string",
      align: "left",
      truncateText: true
    },
    {
      field: "virtual_address",
      name: "Virtual Address",
      dataType: "number",
      align: "left"
    },
    {
      field: "size",
      name: "Size",
      dataType: "number",
      align: "left"
    }
  ];

  return (
    <Fragment>
      <EuiText>
        <h4>Data Directories</h4>
        <div className="pe-dataDirs">
          <EuiInMemoryTable items={dataDirs} columns={columns} />
        </div>
      </EuiText>
    </Fragment>
  );
};
