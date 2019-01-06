import React, { Fragment, Component } from "react";
import {
  EuiTitle,
  EuiPageContent,
  EuiPageContentHeader,
  EuiPageContentHeaderSection,
  EuiPageContentBody,
  EuiSpacer,
  EuiPanel
} from "@elastic/eui";

import { FileSummary } from "../../components/analysis/FileSummary";
import { Tabs } from "../../components/nav/tab";

export class Analysis extends Component {
  state = { data: null };

  componentDidMount() {
    const { httpClient } = this.props;
    httpClient
      .get("../api/malice/get?id=" + this.props.match.params.id)
      .then(resp => {
        if (resp.data.found) this.setState({ data: resp.data._source });
      });
  }

  renderAnalysis() {
    const data = this.state.data;
    if (data) {
      return (
        <div className="euiFlexItem">
          <FileSummary file={data.file} scanDate={data.scan_date} />
          <EuiSpacer size="l" />
          <Tabs data={data} />
        </div>
      );
    }
    return <div>Waiting...</div>;
  }

  render() {
    return (
      <Fragment>
        <EuiPageContent>
          <EuiPageContentHeader>
            <EuiPageContentHeaderSection>
              <EuiTitle size="l">
                <h1>{`<ANALYSIS />`}</h1>
              </EuiTitle>
            </EuiPageContentHeaderSection>
          </EuiPageContentHeader>
          <EuiPageContentBody>
            <EuiSpacer size="l" />
            {this.renderAnalysis()}
          </EuiPageContentBody>
        </EuiPageContent>
      </Fragment>
    );
  }
}
