import React, { Fragment } from "react";
import { EuiText, EuiPanel, EuiSpacer, EuiInMemoryTable } from "@elastic/eui";
import _ from "lodash";

export const Yara = ({ yara }) => {
  if (!yara || !yara.matches.length) {
    return <Fragment />;
  }

  const columns = [
    {
      field: "Rule",
      name: "Rule",
      sortable: true
    },
    {
      field: "Meta.description",
      name: "Description"
    },
    {
      field: "Strings[0].Offset",
      name: "Offset"
    },
    {
      field: "Strings[0].Data",
      name: "Data",
      truncateText: true
    }
    // {
    //   field: "Tags",
    //   name: "Tags",
    //   truncateText: true,
    //   sortable: true
    // }
  ];

  const sorting = {
    sort: {
      field: "Rule",
      direction: "desc"
    }
  };

  return (
    <Fragment>
      <EuiText>
        <h4>YARA</h4>
      </EuiText>
      <EuiSpacer size="l" />
      <EuiPanel hasShadow>
        <EuiInMemoryTable
          items={yara.matches}
          columns={columns}
          sorting={sorting}
        />
      </EuiPanel>
    </Fragment>
  );
};
