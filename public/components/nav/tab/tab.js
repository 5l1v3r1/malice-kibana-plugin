import React, { Component, Fragment } from 'react';
import { EuiTabbedContent, EuiTitle, EuiText, EuiSpacer } from '@elastic/eui';

import { Detection } from '../../analysis/Detection';

class Tabs extends Component {
  constructor(props) {
    super(props);

    this.tabs = [
      {
        id: 'detection',
        name: 'Detection',
        content: (
          <Fragment>
            <EuiSpacer />
            <EuiTitle>
              <h3>AV Detection</h3>
            </EuiTitle>
            <EuiSpacer size="l" />
            <Detection av={this.props.data.plugins.av} />
          </Fragment>
        )
      },
      {
        id: 'details',
        name: 'Details',
        content: (
          <Fragment>
            <EuiSpacer />
            <EuiTitle>
              <h3>Details</h3>
            </EuiTitle>
            <EuiText>Scan Details.</EuiText>
          </Fragment>
        )
      },
      {
        id: 'community',
        name: 'Community',
        content: (
          <Fragment>
            <EuiSpacer />
            <EuiTitle>
              <h3>Community</h3>
            </EuiTitle>
            <EuiText>Community voting</EuiText>
          </Fragment>
        )
      }
    ];
  }

  render() {
    return (
      <EuiTabbedContent
        tabs={this.tabs}
        initialSelectedTab={this.tabs[0]}
        onTabClick={tab => {
          console.log('clicked tab', tab);
        }}
      />
    );
  }
}

export default Tabs;
