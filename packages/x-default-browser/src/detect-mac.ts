import defaultBrowserMac from 'default-browser-id';

import getCommonName from './common-name';

const detect = callback => {
  defaultBrowserMac(function (err, browserId) {
    if (err) {
      callback('Unable to retrieve default browser: ' + err);
      return;
    }

    const value = browserId;
    const valueLC = value.toLowerCase();

    /*
            Safari         com.apple.Safari
            Google Chrome  com.google.chrome
            Opera          com.operasoftware.Opera
            Firefox        org.mozilla.firefox
         */
    const out = {
      isIE: false,
      isSafari: valueLC.indexOf('safari') > -1,
      isFirefox: valueLC.indexOf('firefox') > -1,
      isChrome: valueLC.indexOf('google') > -1,
      isChromium: valueLC.indexOf('chromium') > -1, // untested
      isOpera: valueLC.indexOf('opera') > -1,
      identity: value,
      isBlink: false,
      isWebkit: false,
      commonName: null,
    };
    out.isBlink = out.isChrome || out.isChromium || out.isOpera;
    out.isWebkit = out.isSafari || out.isBlink;
    out.commonName = getCommonName(out);

    callback(null, out);
  });
};

export default detect;
