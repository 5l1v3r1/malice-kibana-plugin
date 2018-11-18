import React from 'react';

import { EuiToast } from '@elastic/eui';

export default () => (
  <div>
    <EuiToast title="Example of a good toast">
      <p>A good toast message is short and to the point. It should very rarely include multiple paragraphs.</p>
    </EuiToast>
  </div>
);
