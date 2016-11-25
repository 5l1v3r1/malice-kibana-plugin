import chrome from 'ui/chrome';
import uiModules from 'ui/modules';

import './less/main.less';

var logoUrl = require('./logo.png');

uiModules.get('kibana', [])
    .config(function() {
        let config = chrome.getInjected('brandConfig', {});
        chrome
            .setBrand({
                'logo': 'url(' + logoUrl + ') left no-repeat',
                'smallLogo': 'url(' + logoUrl + ') left no-repeat'
            })
    });
