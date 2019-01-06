import React, { Fragment } from "react";
import { EuiHorizontalRule } from "@elastic/eui";

import { Nsrl } from "../analysis/plugins/intel/NSRL";
import { Virustotal } from "../analysis/plugins/intel/Virustotal";
import { ShadowServer } from "../analysis/plugins/intel/ShadowServer";

export const Intel = ({ intel }) => {
  return (
    <Fragment>
      <Nsrl nsrl={intel.nsrl} />
      <EuiHorizontalRule />
      <Virustotal vt={intel.virustotal} />
      <EuiHorizontalRule />
      <ShadowServer ss={intel.shadow_server} />
    </Fragment>
  );
};
