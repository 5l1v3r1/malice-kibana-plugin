import React, { Fragment } from "react";
import { EuiText, EuiDescriptionList } from "@elastic/eui";
import moment from "moment";

export const PEHeader = ({ info }) => {
  const header = [
    {
      title: "Target Machine",
      description: `${info.machine_type}`
    },
    {
      title: "Compilation Timestamp",
      description: `${info.compiletime.datetime} (${moment
        .unix(info.compiletime.unix)
        .fromNow()})`
    },
    {
      title: "Entry Point",
      description: `${info.entrypoint}`
    },
    {
      title: "Contained Sections",
      description: `${info.number_of_sections}`
    },
    {
      title: "Image Size",
      description: `${info.size_of_image}`
    },
    {
      title: "Calculated Size",
      description: `${info.calculated_file_size}`
    }
  ];

  return (
    <Fragment>
      <EuiText>
        <h4>Header</h4>
        <div className="pe-header">
          <EuiDescriptionList
            type="column"
            listItems={header}
            style={{ maxWidth: "400" }}
            compressed
          />
        </div>
      </EuiText>
    </Fragment>
  );
};
