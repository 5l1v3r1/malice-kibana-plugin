import React from 'react';
import {
  EuiPage,
  EuiPageHeader,
  EuiTitle,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentHeader,
  EuiPageContentBody,
  EuiImage,
  EuiText,
  EuiSpacer,
  EuiPanel,
  EuiBasicTable
} from '@elastic/eui';
import '@elastic/eui/dist/eui_theme_dark.css';
import rison from 'rison-node';
// import { SavedObjectsClient } from 'ui/saved_objects';

import { Crumbs } from '../../components/nav/breadcrumbs';
import { Search } from '../../components/search';
// import { SearchBar } from '../../components/searchbar';
import logoUrl from '../../malice.svg';

export class Main extends React.Component {
  state = { total: 0, savedQueries: null, discoverQuery: '', hits: [] };

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
    const basePath = window.location.protocol + '//' + window.location.host + '/oyu';
    const mySessionStore = sessionStorage[`lastSubUrl:${basePath}/app/kibana#/discover`];
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
      }
    ];

    const getRowProps = item => {
      const { id } = item;
      return {
        'data-test-subj': `row-${id}`,
        className: 'customRowClass',
        onClick: () => console.log(`Clicked row ${id}`)
      };
    };

    const getCellProps = (item, column) => {
      const { id } = item;
      const { field } = column;
      return {
        className: 'customCellClass',
        'data-test-subj': `cell-${id}-${field}`,
        textOnly: true
      };
    };

    return <EuiBasicTable items={this.state.hits} columns={columns} rowProps={getRowProps} cellProps={getCellProps} />;

    // const hits = this.state.hits.map(hit => {
    //   console.log('hit.file.name', hit._source.file.name);
    //   return (
    //     <div key={hit._id} className="euiFlexItem">
    //       <EuiPanel paddingSize="s" onClick={() => window.alert('Panel clicked')}>
    //         <EuiText grow={false} size="s">
    //           <h2>Name: {hit._source.file.name}</h2>
    //           <p>Sha256: {hit._source.file.sha256}</p>
    //           <p> AV: {hit._source.plugins.av.clamav.result}</p>
    //         </EuiText>
    //       </EuiPanel>
    //     </div>
    //   );
    // });
    // return <div className="hit-list">{hits}</div>;
  }

  render() {
    return (
      <EuiPage>
        <EuiPageBody>
          <EuiPageHeader>
            <Crumbs />
            <EuiImage size="s" hasShadow alt="Malice logo" url={logoUrl} />
          </EuiPageHeader>
          <EuiPageContent>
            <EuiPageContentHeader>
              <EuiTitle>
                <h2>{`<SEARCH />`}</h2>
              </EuiTitle>
            </EuiPageContentHeader>
            <EuiPageContentBody>
              <EuiText>
                <p>Number of Malice scans: {this.state.total || 'NO API CALL YET'}</p>
              </EuiText>
              <EuiSpacer size="l" />
              <Search query={this.state.discoverQuery} onSubmit={this.onSearchSubmit} />
              {/* <SearchBar /> */}
              <EuiSpacer size="l" />
              {this.renderData()}
            </EuiPageContentBody>
          </EuiPageContent>
        </EuiPageBody>
      </EuiPage>
    );
  }
}
