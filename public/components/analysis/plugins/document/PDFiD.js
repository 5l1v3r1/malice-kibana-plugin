import React, { Fragment } from "react";
import { EuiText, EuiCode, EuiSpacer, EuiInMemoryTable } from "@elastic/eui";

import { PDFiDHeuristics } from "./PDFiDHeuristics";

export const PdfId = ({ pdfid }) => {
  if (!pdfid) {
    return <Fragment />;
  }

  const columns = [
    {
      field: "name",
      name: "Keyword",
      dataType: "string",
      align: "left",
      width: "30%"
    },
    {
      field: "count",
      name: "Count",
      dataType: "number",
      align: "left",
      width: "70%"
    }
  ];

  return (
    <Fragment>
      <div className="pdf-pdfid">
        <EuiText>
          <h4>PDFiD</h4>
          <ul>
            <li>
              PDF Header: <EuiCode>{pdfid.header}</EuiCode>
            </li>
            <li>
              Total Entropy: <EuiCode>{pdfid.totalEntropy}</EuiCode>
            </li>
            <li>
              Entropy In Streams: <EuiCode>{pdfid.streamEntropy}</EuiCode>
            </li>
            <li>
              Entropy Out Streams: <EuiCode>{pdfid.nonStreamEntropy}</EuiCode>
            </li>
            <li>
              Count %% EOF: <EuiCode>{pdfid.countEof}</EuiCode>
            </li>
            <li>
              Data After EOF: <EuiCode>{pdfid.countChatAfterLastEof}</EuiCode>
            </li>
          </ul>
        </EuiText>
        <EuiInMemoryTable items={pdfid.keywords.keyword} columns={columns} />
        <EuiSpacer />
        <PDFiDHeuristics heuristics={pdfid.heuristics} />
      </div>
    </Fragment>
  );
};
