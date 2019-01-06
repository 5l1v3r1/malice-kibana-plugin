import React, { Fragment } from "react";
import { EuiSpacer } from "@elastic/eui";

import { FileInfo } from "../analysis/plugins/metadata/FileInfo";
import { Pdf } from "../analysis/plugins/document/PDF";
import { PEScan } from "../analysis/plugins/exe/PEScan";
import { Floss } from "../analysis/plugins/exe/Floss";

export const Details = ({ file, plugins }) => {
  return (
    <Fragment>
      <FileInfo file={file} fileinfo={plugins.metadata.fileinfo} />
      <EuiSpacer />
      <Pdf pdf={plugins.document.pdf} />
      <EuiSpacer />
      <PEScan pescan={plugins.exe.pescan} />
      <EuiSpacer />
      <Floss floss={plugins.exe.floss} />
    </Fragment>
  );
};
