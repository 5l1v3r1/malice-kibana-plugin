import $ from 'jquery';

import './less/hack.less';
import chrome from 'ui/chrome';
import logoUrl from 'plugins/malice/logo.png';

chrome.setBrand({
  logo: `url(${logoUrl}) left no-repeat`,
  smalllogo: `url(${logoUrl}) left no-repeat`
});

// $(document.body).on('keypress', function (event) {
//   if (event.which === 58) {
//     alert('boo!');
//   }
// });
