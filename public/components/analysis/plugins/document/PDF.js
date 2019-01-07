import React, { Fragment } from "react";
import { EuiPanel, EuiAccordion, EuiHorizontalRule } from "@elastic/eui";

import { PdfId } from "./PDFiD";
import { PdfParser } from "./PdfParser";

export const Pdf = ({ pdf }) => {
  console.log("pdf :", pdf);
  if (!pdf) {
    return <Fragment />;
  }

  return (
    <Fragment>
      <EuiAccordion
        id="accordion-pdf"
        buttonContent="PDF"
        initialIsOpen={true}
        paddingSize="m"
      >
        <EuiPanel hasShadow>
          <PdfId pdfid={pdf.pdfid} />
          <EuiHorizontalRule />
          <PdfParser streams={pdf.streams} />
        </EuiPanel>
      </EuiAccordion>
    </Fragment>
  );
};
