import React, { Fragment } from "react";
import { EuiText, EuiSpacer, EuiInMemoryTable } from "@elastic/eui";
import _ from "lodash";

export const PdfParser = ({ streams }) => {
  if (!streams) {
    return <Fragment />;
  }

  const ppStats = streams.stats.map(s => {
    return <li key={s}>{s}</li>;
  });

  const ppTags = Object.keys(streams.tags).map(function(key) {
    const listItems = streams.tags[key].map(s => {
      return <li key={s}>{s}</li>;
    });
    return (
      <Fragment key={key}>
        <h6>{_.startCase(key)}</h6>
        <ul>{listItems}</ul>
      </Fragment>
    );
  });

  const renderEmbeddedFilesTable = e => {
    if (!e || !e.length) {
      return <Fragment />;
    }
    const columns = [
      {
        field: "object",
        name: "Object",
        dataType: "string",
        align: "left",
        width: "30%"
      },
      {
        field: "sha256",
        name: "SHA-256",
        dataType: "number",
        align: "left",
        width: "70%"
      }
    ];
    return (
      <Fragment>
        <EuiText>
          <h5>Embedded Files</h5>
        </EuiText>
        <EuiInMemoryTable items={e} columns={columns} />
      </Fragment>
    );
  };

  return (
    <Fragment>
      <EuiText>
        <h4>pdf-parser</h4>
        <h5>Stats</h5>
        <ul>{ppStats}</ul>
        <h5>Tags</h5>
        {ppTags}
      </EuiText>
      <EuiSpacer />
      {renderEmbeddedFilesTable(streams.embedded)}
      <EuiSpacer />
    </Fragment>
  );
};
