import React, { Fragment } from "react";
import { EuiText, EuiInMemoryTable } from "@elastic/eui";

export const PESections = ({ sections }) => {
  if (!sections) {
    return <Fragment />;
  }

  const columns = [
    {
      field: "name",
      name: "Name",
      dataType: "number",
      align: "left",
      truncateText: true,
      width: "15%"
    },
    {
      field: "pointer_to_raw_data",
      name: "Virtual Address",
      dataType: "number",
      align: "left",
      width: "15%"
    },
    {
      field: "virtual_size",
      name: "Virtual Size",
      dataType: "number",
      align: "left",
      width: "15%"
    },
    {
      field: "raw_data_size",
      name: "Raw Size",
      dataType: "number",
      align: "left",
      width: "10%"
    },
    {
      field: "entropy",
      name: "Entropy",
      dataType: "number",
      align: "left",
      truncateText: true,
      width: "10%"
    },
    {
      field: "md5",
      name: "MD5",
      dataType: "number",
      align: "left",
      truncateText: true,
      width: "35%"
    }
  ];

  return (
    <Fragment>
      <EuiText>
        <h4>Sections</h4>
        <div className="pe-sections">
          <EuiInMemoryTable items={sections} columns={columns} />
        </div>
      </EuiText>
    </Fragment>
  );
};
