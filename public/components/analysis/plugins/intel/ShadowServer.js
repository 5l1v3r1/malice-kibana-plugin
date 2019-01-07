import React, { Fragment } from "react";
import {
  EuiPanel,
  EuiSpacer,
  EuiHealth,
  EuiTextColor,
  EuiInMemoryTable,
  EuiDescriptionList,
  EuiAccordion
} from "@elastic/eui";
import _ from "lodash";

export const ShadowServer = ({ ss }) => {
  if (!ss) {
    return <Fragment />;
  }

  const { antivirus } = ss.sandbox;
  const { metadata } = ss.sandbox;
  const { whitelist } = ss;

  const seenRange = [
    {
      title: "FirstSeen",
      description: `${metadata.first_seen}`
    },
    {
      title: "LastSeen",
      description: `${metadata.last_seen}`
    }
  ];

  const renderWhiteList = whitelist => {
    if (!whitelist) {
      return <Fragment />;
    }
    const whitelistResults = [];
    Object.keys(whitelist).map(function(key) {
      whitelistResults.push({
        field: key.replace("_", " ").toUpperCase(),
        value: whitelist[key]
      });
    });
    const whitelistColumns = [
      {
        field: "field",
        name: "Field",
        dataType: "string",
        align: "left",
        width: "30%"
      },
      {
        field: "value",
        name: "Value",
        truncateText: true,
        dataType: "string",
        align: "left",
        width: "70%"
      }
    ];

    return (
      <Fragment>
        <EuiTextColor color="subdued">
          <h6>WHITE LIST</h6>
        </EuiTextColor>
        <EuiInMemoryTable items={whitelistResults} columns={whitelistColumns} />
      </Fragment>
    );
  };

  const renderAntiVirus = antivirus => {
    if (!antivirus) {
      return <Fragment />;
    }

    const avResults = [];
    Object.keys(antivirus).map(function(key) {
      avResults.push({
        name: key,
        result: antivirus[key]
      });
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
          const label = result ? result : "CLEAN";
          return <EuiHealth color={color}>{label}</EuiHealth>;
        }
      }
    ];

    return (
      <Fragment>
        <EuiTextColor color="subdued">
          <h6>ANTIVIRUS</h6>
        </EuiTextColor>
        <EuiInMemoryTable items={avResults} columns={columns} />
      </Fragment>
    );
  };

  return (
    <Fragment>
      <EuiAccordion
        id="accordion-ss"
        buttonContent="Shadow Server"
        initialIsOpen={true}
        paddingSize="m"
      >
        <EuiPanel hasShadow>
          <EuiDescriptionList
            listItems={seenRange}
            style={{ maxWidth: "400" }}
            compressed
          />
          <EuiSpacer />
          {renderAntiVirus(antivirus)}
          {renderWhiteList(whitelist)}
        </EuiPanel>
      </EuiAccordion>
    </Fragment>
  );
};
