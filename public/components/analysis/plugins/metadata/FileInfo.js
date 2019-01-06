import React, { Fragment } from "react";
import {
  EuiPanel,
  EuiSpacer,
  EuiAccordion,
  EuiDescriptionList,
  EuiHorizontalRule
} from "@elastic/eui";

import { TrID } from "./TrID";
import { Exiftool } from "./Exiftool";

export function FileInfo({ file, fileinfo }) {
  if (!fileinfo) {
    return <Fragment />;
  }

  const fileSummary = [
    {
      title: "File Type",
      description: `${fileinfo.magic.description}`
    },
    {
      title: "Magic",
      description: `${fileinfo.magic.mime}`
    },
    {
      title: "MD5",
      description: `${file.md5}`
    },
    {
      title: "SHA1",
      description: `${file.sha1}`
    },
    {
      title: "SHA256",
      description: `${file.sha256}`
    },
    {
      title: "SSDeep",
      description: `${fileinfo.ssdeep}`
    }
  ];

  return (
    <Fragment>
      <EuiAccordion
        id="accordion-fileinfo"
        buttonContent="File Info"
        initialIsOpen={true}
        paddingSize="m"
      >
        <EuiPanel hasShadow>
          <EuiDescriptionList
            listItems={fileSummary}
            style={{ maxWidth: "400" }}
            compressed
          />
          <EuiSpacer />
          <TrID trid={fileinfo.trid} />
          <EuiHorizontalRule />
          <Exiftool exiftool={fileinfo.exiftool} />
        </EuiPanel>
      </EuiAccordion>
    </Fragment>
  );
}
