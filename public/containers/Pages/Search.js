import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import {
  EuiTitle,
  EuiPageContent,
  EuiPageContentHeader,
  EuiPageContentHeaderSection,
  EuiPageContentBody,
  EuiText,
  EuiTextAlign,
  EuiTextColor,
  EuiSpacer,
  EuiInMemoryTable,
  EuiLink
} from '@elastic/eui';
import rison from 'rison-node';
import chrome from 'ui/chrome';

// const baseUrl = chrome.addBasePath('/api/malice');
import { SearchForm } from '../../components/search';

export class Search extends Component {
  state = {
    total: 0,
    savedQueries: null,
    discoverQuery: '',
    hits: [],
    redirect: false
  };

  getUrlParams(search) {
    const hashes = search.slice(search.indexOf('?') + 1).split('&');
    const params = {};
    hashes.map(hash => {
      const [key, val] = hash.split('=');
      params[key] = decodeURIComponent(val);
    });

    return params;
  }

  getDiscoverQuery() {
    const basePath = window.location.protocol + '//' + window.location.host + chrome.addBasePath('/');
    const mySessionStore = sessionStorage[`lastSubUrl:${basePath}app/kibana#/discover`];
    console.log('basePath', basePath);
    console.log('discover', `lastSubUrl:${basePath}/app/kibana#/discover`);
    console.log('sessionStorage', sessionStorage);
    console.log('mySessionStore', mySessionStore);
    if (mySessionStore) {
      const params = this.getUrlParams(mySessionStore);
      Object.keys(params).forEach(key => {
        const session = rison.decode(params[key]);
        console.log('session', session);
        if (session.query) {
          this.setState({ discoverQuery: session.query.query });
        }
      });
    }
  }

  componentDidMount() {
    /*
      FOR EXAMPLE PURPOSES ONLY.  There are much better ways to
      manage state and update your UI than this.
    */
    this.getDiscoverQuery();
    // console.log('SavedObjectsClient', SavedObjectsClient);
    // const client = new SavedObjectsClient();
    // client
    //   .find({
    //     type: 'index-pattern',
    //     // fields: ['title'],
    //     perPage: 10000
    //   })
    //   .then(result => {
    //     this.setState({ savedQueries: result });
    //     console.log('result :', result);
    //   });
    console.log('props', this.props);
    const { httpClient } = this.props;
    httpClient.get('../api/malice/search').then(resp => {
      this.setState({ total: resp.data.hits.total });
    });
  }

  onSearchSubmit = query => {
    console.log('query', query);
    const { httpClient } = this.props;
    httpClient.get('../api/malice/search?query=' + query).then(resp => {
      console.log(resp.data.hits.hits);
      this.setState({ total: resp.data.hits.total });
      this.setState({ hits: resp.data.hits.hits });
    });
  };

  renderData() {
    const actions = [
      {
        render: item => {
          console.log('item', item);

          return (
            <EuiLink color="secondary">
              <Link to={`/analysis/${item._id}`}>Report</Link>
            </EuiLink>
          );
        }
      }
    ];

    const columns = [
      {
        field: '_source.file.name',
        name: 'Name',
        sortable: true,
        hideForMobile: true,
        'data-test-subj': 'firstNameCell'
      },
      {
        field: '_source.file.sha256',
        name: 'sha256',
        truncateText: true,
        sortable: true,
        hideForMobile: true,
        'data-test-subj': 'firstNameCell'
      },
      {
        field: '_source.plugins.av.clamav.result',
        name: 'AV',
        truncateText: true,
        hideForMobile: true,
        'data-test-subj': 'firstNameCell'
      },
      {
        name: 'Actions',
        actions
      }
    ];

    return <EuiInMemoryTable items={this.state.hits} columns={columns} pagination={true} />;
  }

  render() {
    if (this.state.redirect) {
      return <Redirect push to="/analysis" />;
    }

    return (
      <div>
        <EuiPageContent>
          <EuiPageContentHeader>
            <EuiPageContentHeaderSection>
              <EuiTitle size="l">
                <h1>{`<SEARCH />`}</h1>
              </EuiTitle>
            </EuiPageContentHeaderSection>
          </EuiPageContentHeader>
          <EuiPageContentBody>
            <SearchForm query={this.state.discoverQuery} onSubmit={this.onSearchSubmit} />
            <EuiSpacer size="l" />
            {this.renderData()}
            <EuiSpacer size="l" />
            <EuiText size="xs">
              <EuiTextAlign textAlign="right">
                <EuiTextColor color="subdued">Number of Malice scans: {this.state.total || 'NO API CALL YET'}</EuiTextColor>
              </EuiTextAlign>
            </EuiText>
          </EuiPageContentBody>
        </EuiPageContent>
      </div>
    );
  }
}
