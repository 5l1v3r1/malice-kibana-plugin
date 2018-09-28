import React from 'react';
import {
  EuiPage,
  EuiPageHeader,
  EuiTitle,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentHeader,
  EuiPageContentBody,
  EuiText,
  EuiBasicTable,
  EuiLink
} from '@elastic/eui';

export class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    /*
       FOR EXAMPLE PURPOSES ONLY.  There are much better ways to
       manage state and update your UI than this.
    */
    const { httpClient } = this.props;
    httpClient.get('../api/malice/example').then(resp => {
      this.setState({ time: resp.data.time });
    });
  }

  // const getCellProps = (item, column) => {
  //   const { id } = item;
  //   const { field } = column;
  //   return {
  //     className: 'customCellClass',
  //     'data-test-subj': `cell-${id}-${field}`,
  //   };
  // };

  render() {
    const { title } = this.props;
    return (
      <EuiPage>
        <EuiPageBody>
          <EuiPageHeader>
            <EuiTitle size="l">
              <h1>{title}</h1>
            </EuiTitle>
          </EuiPageHeader>
          <EuiPageContent>
            <EuiPageContentHeader>
              <EuiTitle>
                <h2>Congratulations</h2>
              </EuiTitle>
            </EuiPageContentHeader>
            <EuiPageContentBody>
              <EuiText>
                <h3>You have successfully created your first Kibana Plugin!</h3>
                <p>The server time (via API call) is {this.state.time || 'NO API CALL YET'}</p>
              </EuiText>
            </EuiPageContentBody>
          </EuiPageContent>
          {/* <EuiBasicTable items={items} columns={columns} rowProps={getRowProps} cellProps={getCellProps} /> */}
        </EuiPageBody>
      </EuiPage>
    );
  }
}
