import React, { Fragment } from 'react';

import { EuiBreadcrumbs, EuiButton, EuiPageContentHeader, EuiPageContentHeaderSection, EuiTitle, EuiSpacer } from '@elastic/eui';

export default props => {
  // const breadcrumbs = [
  // {
  //   text: 'Search',
  //   href: '#search',
  //   onClick: e => {
  //     e.preventDefault();
  //     console.log('You clicked Search');
  //   },
  //   'data-test-subj': 'breadcrumbsAnimals',
  //   className: 'customClass'
  // }
  // {
  //   text: 'Filter',
  //   href: '#filter',
  //   onClick: e => {
  //     e.preventDefault();
  //     console.log('You clicked Filter');
  //   }
  // },
  // {
  //   text: 'Report',
  //   href: '#report',
  //   onClick: e => {
  //     e.preventDefault();
  //     console.log('You clicked Report');
  //   }
  // }
  // ];
  console.log('breadcrumbs :', props.breadcrumbs);
  return (
    <Fragment>
      <EuiBreadcrumbs breadcrumbs={props.breadcrumbs} responsive={true} truncate={false} />
      <EuiSpacer size="xs" />
    </Fragment>
  );
};
