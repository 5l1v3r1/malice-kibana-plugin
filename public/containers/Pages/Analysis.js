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
import { Tabs } from "../../components/nav/Tabs";

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

  getRatio() {
    const { av } = this.state.data.plugins;
    let positives = 0;
    Object.keys(av).map(key => {
      if (av[key] && av[key].result && key !== "yara") {
        positives++;
      }
    });
    return Math.floor((positives / Object.keys(av).length) * 100);
  }
  renderAnalysis() {
    const data = this.state.data;
    if (data) {
      return (
        <div className="euiFlexItem">
          <FileSummary
            file={data.file}
            scanDate={data.scan_date}
            ratio={this.getRatio()}
          />
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
