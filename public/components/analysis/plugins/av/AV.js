import React, { Fragment } from "react";
import {
  EuiText,
  EuiSpacer,
  EuiPanel,
  EuiHealth,
  EuiInMemoryTable
} from "@elastic/eui";
import _ from "lodash";

export const AVResults = ({ av }) => {
  // console.log("av", av);
  if (!av) {
    return <Fragment />;
  }

  const avResults = [];
  Object.keys(av).map(function(key) {
    if (av[key] && key !== "yara" && !av[key].error) {
      avResults.push({
        name: _.startCase(key),
        result: av[key].result,
        updated: av[key].updated
      });
    }
  });

  const columns = [
    {
      field: "name",
      name: "Name",
      sortable: true
    },
    {
      field: "result",
      name: "Result",
      truncateText: true,
      sortable: true,
      render: result => {
        const color = result ? "danger" : "success";
        const label = result ? result : "Clean";
        return <EuiHealth color={color}>{label}</EuiHealth>;
      }
    },
    {
      field: "updated",
      name: "Updated"
    }
  ];

  return (
    <Fragment>
      <EuiText>
        <h4>ANTIVIRUS</h4>
      </EuiText>
      <EuiSpacer size="l" />
      <EuiPanel hasShadow>
        <EuiInMemoryTable items={avResults} columns={columns} />
      </EuiPanel>
    </Fragment>
  );
};
