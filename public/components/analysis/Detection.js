import React, { Fragment } from "react";
import { EuiHorizontalRule } from "@elastic/eui";

import { AVResults } from "../analysis/plugins/av/AV";
import { Yara } from "../analysis/plugins/av/Yara";

export function Detection({ av }) {
  return (
    <Fragment>
      <AVResults av={av} />
      <EuiHorizontalRule />
      <Yara yara={av.yara} />
    </Fragment>
  );
}
