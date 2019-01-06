import React, { Fragment } from "react";
import { EuiPanel, EuiHorizontalRule, EuiAccordion } from "@elastic/eui";

import { PEHeader } from "./PEHeader";
import { PESections } from "./PESections";
import { PEImports } from "./PEImports";
import { PEResources } from "./PEResources";
import { PEDataDirectories } from "./PEDataDirectories";
import { PEFileVersionInfo } from "./PEFileVersionInfo";
import { PESignature } from "./PESignature";
import { PEiD } from "./PEiD";

export const PEScan = ({ pescan }) => {
  // console.log("pescan", pescan);
  if (!pescan) {
    return <Fragment />;
  }

  return (
    <Fragment>
      <EuiAccordion
        id="accordion-pescan"
        buttonContent="Portable Executable Info"
        initialIsOpen={true}
        paddingSize="m"
      >
        <EuiPanel hasShadow>
          <PEHeader info={pescan.info} />
          <EuiHorizontalRule />
          <PEiD
            peid={pescan.peid}
            isPacked={pescan.is_packed}
            language={pescan.language}
          />
          <EuiHorizontalRule />
          <PESections sections={pescan.sections} />
          <EuiHorizontalRule />
          <PEImports imphash={pescan.imphash} imports={pescan.imports} />
          <EuiHorizontalRule />
          <PEResources resources={pescan.resources} />
          <EuiHorizontalRule />
          <PEDataDirectories dataDirs={pescan.data_directories} />
          <EuiHorizontalRule />
          <PEFileVersionInfo verInfo={pescan.resource_versioninfo} />
          <EuiHorizontalRule />
          <PESignature signature={pescan.signature} />
        </EuiPanel>
      </EuiAccordion>
    </Fragment>
  );
};
