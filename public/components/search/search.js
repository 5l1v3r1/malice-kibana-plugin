import React, { Component, Fragment } from 'react';

import { EuiFieldSearch, EuiRange, EuiTextArea, EuiFormRow, EuiFlexGroup, EuiFlexItem, EuiSpacer, EuiButton } from '@elastic/eui';

export default class Search extends Component {
  state = { query: this.props.query };

  onFormSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state.query);
  };

  render() {
    console.log('this.props.query :', this.props.query);
    return (
      <Fragment>
        <EuiFlexGroup>
          <EuiFlexItem>
            <EuiFieldSearch
              placeholder="Search a URL, IP address, domain, or file hash..."
              value={this.state.query}
              onChange={e => this.setState({ query: e.target.value })}
              fullWidth
            />
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiButton onClick={this.onFormSubmit}>Search</EuiButton>
          </EuiFlexItem>
        </EuiFlexGroup>
      </Fragment>
    );
  }
}
