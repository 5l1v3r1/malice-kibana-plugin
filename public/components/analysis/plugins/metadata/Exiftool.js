import React, { Fragment } from "react";
import { EuiAccordion, EuiDescriptionList } from "@elastic/eui";

export const Exiftool = ({ exiftool }) => {
  if (!exiftool) {
    return <Fragment />;
  }

  const exiftoolData = [];
  Object.keys(exiftool).map(function(key) {
    if (exiftool[key]) {
      exiftoolData.push({
        title: key,
        description: exiftool[key]
      });
    }
  });

  return (
    <Fragment>
      <EuiAccordion
        id="accordion-exiftool"
        buttonContent="ExifTool File Metadata"
        initialIsOpen={false}
        paddingSize="m"
      >
        <div className="fileinfo-exiftool">
          <EuiDescriptionList
            type="column"
            listItems={exiftoolData}
            style={{ maxWidth: "400" }}
            compressed
          />
        </div>
      </EuiAccordion>
    </Fragment>
  );
};
