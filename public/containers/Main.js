import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import {
  EuiPage,
  EuiPageHeader,
  EuiPageBody,
  EuiPageContent,
  EuiImage
} from "@elastic/eui";
import "@elastic/eui/dist/eui_theme_dark.css";

// import { SavedObjectsClient } from 'ui/saved_objects';
import { Crumbs } from "../components/nav/breadcrumbs";
import { Search } from "./Pages/Search";
import { Analysis } from "./Pages/Analysis";
import logoUrl from "../malice.svg";

export class Main extends React.Component {
  state = { breadcrumbs: [] };

  render() {
    return (
      <Router>
        <div>
          <EuiPage>
            <EuiPageBody>
              <EuiPageHeader>
                <Crumbs breadcrumbs={this.state.breadcrumbs} />
                <EuiImage size="s" hasShadow alt="Malice logo" url={logoUrl} />
              </EuiPageHeader>
              <EuiPageContent>
                <Route
                  path="/"
                  exact
                  render={props => (
                    <Search {...props} httpClient={this.props.httpClient} />
                  )}
                />
                <Route
                  path="/analysis/:id"
                  render={props => (
                    <Analysis {...props} httpClient={this.props.httpClient} />
                  )}
                />
              </EuiPageContent>
            </EuiPageBody>
          </EuiPage>
        </div>
      </Router>
    );
  }
}
