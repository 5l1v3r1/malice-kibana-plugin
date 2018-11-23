import React from 'react';
import {
  EuiPage,
  EuiPageHeader,
  EuiTitle,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentHeader,
  EuiPageContentBody,
  EuiButton,
  EuiImage,
  EuiText
} from '@elastic/eui';
import '@elastic/eui/dist/eui_theme_dark.css';
import { Crumbs } from '../nav/breadcrumbs';
import logoUrl from 'plugins/malice/malice.svg';

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

  render() {
    const { title } = this.props;
    return (
      <EuiPage>
        <EuiPageBody>
          <EuiPageHeader>
            <Crumbs />
            <EuiImage size="s" hasShadow alt="Malice logo" url={logoUrl} />
            {/* <EuiTitle size="l">
              <h1>{title}</h1>
            </EuiTitle> */}
          </EuiPageHeader>
          <EuiPageContent>
            <EuiPageContentHeader>
              <EuiTitle>
                <h2>SEARCH</h2>
              </EuiTitle>
            </EuiPageContentHeader>
            <EuiPageContentBody>
              <EuiText>
                <h3>Search a URL, IP address, domain, or file hash</h3>
                <p>The server time (via API call) is {this.state.time || 'NO API CALL YET'}</p>
              </EuiText>
            </EuiPageContentBody>
          </EuiPageContent>
          <EuiButton fill onClick={() => window.alert('Button clicked')}>
            Search
          </EuiButton>
        </EuiPageBody>
        {/* <Search /> */}
        {/* <Toast /> */}
      </EuiPage>
    );
  }
}
