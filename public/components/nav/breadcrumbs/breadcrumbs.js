import React, { Fragment } from 'react';

import { EuiBreadcrumbs, EuiShowFor, EuiText } from '@elastic/eui';

export default () => {
  const breadcrumbs = [
    {
      text: 'Search',
      href: '#'
    },
    {
      text: 'Filter',
      href: '#'
    },
    {
      text: 'Report',
      href: '#'
    }
  ];

  return (
    <Fragment>
      <EuiBreadcrumbs breadcrumbs={breadcrumbs} max={null} />

      <EuiShowFor sizes={['xs', 's']}>
        <EuiText size="s" color="subdued">
          <p>
            <em>Responsive nav does not show at all on small (mobile) screens.</em>
          </p>
        </EuiText>
      </EuiShowFor>
    </Fragment>
  );
};
