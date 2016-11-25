import uiModules from 'ui/modules';
import './less/main.less';

import uiChrome from 'ui/chrome';
import logoUrl from 'plugins/malice/logo.png';

uiChrome
.setBrand({
  logo: `url(${logoUrl}) center no-repeat`,
  smalllogo: `url(${logoUrl}) center no-repeat`
});
