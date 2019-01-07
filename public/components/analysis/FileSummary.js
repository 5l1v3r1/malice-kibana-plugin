import React, { Fragment } from "react";
import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiStat,
  EuiIcon,
  EuiTitle,
  EuiPanel,
  EuiSpacer,
  EuiDescriptionList
} from "@elastic/eui";
import moment from "moment";

export function FileSummary({ file, scanDate, ratio }) {
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

  // let color = "#017D73";
  // if (ratio > 60) {
  //   color = "#BD271E";
  // }
  // if (60 > ratio && ratio > 30) {
  //   color = "#F5A700";
  // }
  let color = "secondary";
  if (ratio > 60) {
    color = "accent";
  }
  if (60 > ratio && ratio > 30) {
    color = "danger";
  }

  return (
    <Fragment>
      <EuiPanel hasShadow>
        <EuiFlexGroup alignItems="center">
          <EuiFlexItem grow={3}>
            <EuiFlexGroup justifyContent="spaceEvenly">
              <EuiFlexItem grow={false}>
                <EuiStat
                  title={ratio + "%"}
                  description="Detection Ratio"
                  titleColor={color}
                  textAlign="right"
                  titleSize="l"
                />
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiFlexItem>
          <EuiFlexItem grow={7}>
            <EuiDescriptionList
              listItems={fileSummary}
              style={{ maxWidth: "400" }}
              compressed
            />
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiPanel>
    </Fragment>
  );
}
