import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
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
} from "@elastic/eui";
import rison from "rison-node";
import chrome from "ui/chrome";
import moment from "moment";

// const baseUrl = chrome.addBasePath('/api/malice');
import { SearchForm } from "../../components/search";

export class Search extends Component {
  state = {
    total: 0,
    savedQueries: null,
    discoverQuery: "",
    hits: [],
    redirect: false
  };

  getUrlParams(search) {
    const hashes = search.slice(search.indexOf("?") + 1).split("&");
    const params = {};
    hashes.map(hash => {
      const [key, val] = hash.split("=");
      params[key] = decodeURIComponent(val);
    });

    return params;
  }

  getDiscoverQuery() {
    const basePath =
      window.location.protocol +
      "//" +
      window.location.host +
      chrome.addBasePath("/");
    const mySessionStore =
      sessionStorage[`lastSubUrl:${basePath}app/kibana#/discover`];
    // console.log('basePath', basePath);
    // console.log('discover', `lastSubUrl:${basePath}/app/kibana#/discover`);
    // console.log('sessionStorage', sessionStorage);
    // console.log('mySessionStore', mySessionStore);
    if (mySessionStore) {
      const params = this.getUrlParams(mySessionStore);
      Object.keys(params).forEach(key => {
        const session = rison.decode(params[key]);
        // console.log("session", session);
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
    httpClient.get("../api/malice/search").then(resp => {
      this.setState({ total: resp.data.hits.total });
    });
  }

  onSearchSubmit = query => {
    const { httpClient } = this.props;
    httpClient.get("../api/malice/search?query=" + query).then(resp => {
      this.setState({ total: resp.data.hits.total });
      this.setState({ hits: resp.data.hits.hits });
    });
  };

  renderRatio(av) {
    if (!av) {
      return <div />;
    }

    let positives = 0;
    Object.keys(av).map(key => {
      if (av[key] && av[key].result && key !== "yara") {
        positives++;
      }
    });
    const ratio = Math.floor((positives / Object.keys(av).length) * 100);

    if (ratio > 60) {
      return <EuiTextColor color="danger">{ratio}%</EuiTextColor>;
    } else if (60 > ratio && ratio > 30) {
      return <EuiTextColor color="warning">{ratio}%</EuiTextColor>;
    } else {
      return <EuiTextColor color="secondary">{ratio}%</EuiTextColor>;
    }
  }

  renderData() {
    const actions = [
      {
        render: item => {
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
        field: "_source.file.name",
        name: "Name",
        dataType: "string",
        align: "left",
        truncateText: true,
        width: "15%"
      },
      {
        field: "_source.file.sha256",
        name: "SHA-256",
        dataType: "string",
        align: "left",
        truncateText: true,
        width: "50%"
      },
      {
        field: "_source.scan_date",
        name: "Scanned",
        dataType: "date",
        align: "left",
        truncateText: true,
        width: "15%",
        render: scan_date => moment.utc(scan_date).fromNow()
      },
      {
        field: "_source.plugins.av",
        name: "Ratio",
        dataType: "string",
        sortable: true,
        width: "10%",
        render: av => this.renderRatio(av)
      },
      {
        name: "Actions",
        width: "10%",
        actions
      }
    ];

    return (
      <EuiInMemoryTable
        items={this.state.hits}
        columns={columns}
        pagination={true}
      />
    );
  }

  render() {
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
            <SearchForm
              query={this.state.discoverQuery}
              onSubmit={this.onSearchSubmit}
            />
            <EuiSpacer size="l" />
            {this.renderData()}
            <EuiSpacer size="l" />
            <EuiText size="xs">
              <EuiTextAlign textAlign="right">
                <EuiTextColor color="subdued">
                  Number of Scans: {this.state.total || 0}
                </EuiTextColor>
              </EuiTextAlign>
            </EuiText>
          </EuiPageContentBody>
        </EuiPageContent>
      </div>
    );
  }
}
