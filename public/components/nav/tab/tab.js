import React, { Component, Fragment } from 'react';
import { EuiTabbedContent, EuiTitle, EuiText, EuiSpacer } from '@elastic/eui';

import { Detection } from '../../analysis/Detection';
import { Details } from '../../analysis/Details';
import { Intel } from '../../analysis/Intel';

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
            <EuiText>
              <h4>ANTIVIRUS</h4>
            </EuiText>
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
            <EuiSpacer size="l" />
            <Details plugins={this.props.data.plugins} />
          </Fragment>
        )
      },
      {
        id: 'intel',
        name: 'Intel',
        content: (
          <Fragment>
            <EuiSpacer size="l" />
            <Intel intel={this.props.data.plugins.intel} />
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
            <EuiText>Community voting (COMING SOON!)</EuiText>
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
