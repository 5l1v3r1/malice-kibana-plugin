import React, { Component, Fragment } from "react";

import {
  EuiFieldSearch,
  EuiFlexGroup,
  EuiFlexItem,
  EuiButton
} from "@elastic/eui";

export default class SearchForm extends Component {
  state = { query: this.props.query };

  onFormSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state.query);
  };

  render() {
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
