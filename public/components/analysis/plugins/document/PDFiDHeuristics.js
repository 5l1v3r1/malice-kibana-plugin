import React, { Fragment } from "react";
import { EuiIcon, EuiText, EuiSpacer } from "@elastic/eui";

export const PDFiDHeuristics = ({ heuristics }) => {
  if (!heuristics) {
    return <Fragment />;
  }

  const getIcon = score => {
    if (score > 50) {
      return <EuiIcon type="alert" color="danger" />;
    }
    return <EuiIcon type="iInCircle" color="default" />;
  };

  const renderEmbeddedfile = embeddedfile => {
    return (
      <div>
        <h6>{getIcon(embeddedfile.score)} Embedded File</h6>
        <ul>
          <li>{embeddedfile.reason}</li>
        </ul>
      </div>
    );
  };

  const renderTriage = triage => {
    const items = triage.reasons.map(s => {
      return <li key={s}>{s}</li>;
    });
    return (
      <div>
        <h6>{getIcon(triage.score)} Triage</h6>
        <ul>{items}</ul>
      </div>
    );
  };

  const renderSuspicious = suspicious => {
    const items = suspicious.reasons.map(s => {
      return <li key={s}>{s}</li>;
    });
    return (
      <div>
        <h6>{getIcon(suspicious.score)} Suspicious Properties</h6>
        <ul>{items}</ul>
      </div>
    );
  };

  const renderNameobfuscation = nameobfuscation => {
    return (
      <div>
        <h6>{getIcon(nameobfuscation.score)} Name Obfuscation</h6>
        <ul>
          <li>{nameobfuscation.reason}</li>
        </ul>
      </div>
    );
  };

  return (
    <Fragment>
      <div className="pdf-pdfid-heuristics">
        <EuiText>
          <h5>Heuristics</h5>
          <EuiSpacer />
          {renderEmbeddedfile(heuristics.embeddedfile)}
          {renderTriage(heuristics.triage)}
          {renderSuspicious(heuristics.suspicious)}
          {renderNameobfuscation(heuristics.nameobfuscation)}
        </EuiText>
      </div>
    </Fragment>
  );
};
