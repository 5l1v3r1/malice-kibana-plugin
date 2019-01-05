import React, { Component } from 'react';
import {
  EuiTitle,
  EuiPageContent,
  EuiPageContentHeader,
  EuiPageContentHeaderSection,
  EuiPageContentBody,
  EuiSpacer,
  EuiPanel
} from '@elastic/eui';

import { FileSummary } from '../../components/analysis/FileSummary';
import { Tabs } from '../../components/nav/tab';

export class Analysis extends Component {
  state = { data: null };

  componentDidMount() {
    // console.log('this.props :', this.props);
    const { httpClient } = this.props;
    console.log('id', this.props.match.params.id);
    httpClient.get('../api/malice/get?id=' + this.props.match.params.id).then(resp => {
      console.log(resp.data);
      if (resp.data.found) this.setState({ data: resp.data._source });
    });
  }

  renderAnalysis() {
    const data = this.state.data;
    console.log('data', data);
    if (data) {
      return (
        <div className="euiFlexItem">
          <EuiPanel paddingSize="s">
            <FileSummary file={data.file} scanDate={data.scan_date} />
          </EuiPanel>
          <EuiSpacer size="l" />
          <Tabs data={data} />
        </div>
      );
    }
    return <div>Waiting...</div>;
  }

  render() {
    return (
      <div>
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
      </div>
    );
  }
}
