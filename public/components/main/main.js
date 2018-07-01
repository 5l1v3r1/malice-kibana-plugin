import React from "react";
import {
  EuiHeader,
  EuiHeaderBreadcrumbs,
  EuiHeaderSection,
  EuiHeaderSectionItem,
  EuiHeaderSectionItemButton,
  EuiHeaderLogo,
  EuiIcon,
  EuiPage,
  EuiPageHeader,
  EuiTitle,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentHeader,
  EuiPageContentBody,
  EuiText
} from "@elastic/eui";
// import { EuiTabsExample } from "../tab";
import { Header } from "../../views/header/header";
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
    httpClient.get("../api/malice/example").then(resp => {
      this.setState({ time: resp.data.time });
    });
  }

  renderLogo() {
    return <EuiHeaderLogo href="#" aria-label="Go to home page" />;
  }

  renderBreadcrumbs() {
    const breadcrumbs = [
      {
        text: "Management",
        href: "#",
        onClick: e => {
          e.preventDefault();
          console.log("You clicked management");
        },
        "data-test-subj": "breadcrumbsAnimals",
        className: "customClass"
      },
      {
        text: "Truncation test is here for a really long item",
        href: "#",
        onClick: e => {
          e.preventDefault();
          console.log("You clicked truncation test");
        }
      },
      {
        text: "hidden",
        href: "#",
        onClick: e => {
          e.preventDefault();
          console.log("You clicked hidden");
        }
      },
      {
        text: "Users",
        href: "#",
        onClick: e => {
          e.preventDefault();
          console.log("You clicked users");
        }
      },
      {
        text: "Create"
      }
    ];

    return <EuiHeaderBreadcrumbs breadcrumbs={breadcrumbs} />;
  }

  renderSearch() {
    return (
      <EuiHeaderSectionItemButton aria-label="Search">
        <EuiIcon type="search" size="m" />
      </EuiHeaderSectionItemButton>
    );
  }

  render() {
    const { title } = this.props;
    return (
      <EuiPage>
        <EuiHeader>
          <EuiHeaderSection>
            <EuiHeaderSectionItem border="right">
              {this.renderLogo()}
            </EuiHeaderSectionItem>

            {this.renderBreadcrumbs()}
          </EuiHeaderSection>
          <EuiHeaderSection side="right">
            <EuiHeaderSectionItem>{this.renderSearch()}</EuiHeaderSectionItem>
          </EuiHeaderSection>
        </EuiHeader>

        <EuiPageHeader>
          <EuiTitle size="l">
            <h1>{title} Hello World!</h1>
          </EuiTitle>
        </EuiPageHeader>
        <EuiPageBody>
          <EuiPageContent>
            <EuiPageContentHeader>
              <EuiTitle>
                <h2>Congratulations</h2>
              </EuiTitle>
            </EuiPageContentHeader>
            <EuiPageContentBody>
              <EuiText>
                <h3>You've successfully created your first Kibana Plugin!</h3>
                <p>
                  The server time (via API call) is{" "}
                  {this.state.time || "NO API CALL YET"}
                </p>
              </EuiText>
            </EuiPageContentBody>
          </EuiPageContent>
        </EuiPageBody>
      </EuiPage>
    );
  }
}
