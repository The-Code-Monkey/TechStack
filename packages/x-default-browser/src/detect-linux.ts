import { exec } from 'child_process';

import getCommonName from './common-name';

const detect = callback => {
  const command = 'xdg-mime query default x-scheme-handler/http';

  exec(command, function (err, stdout, stderr) {
    if (err) {
      callback('Unable to execute the query: ' + err + '\n' + stderr);
      return;
    }

    const value = stdout;

    /*
     *  ubuntu 14.04.1:
     *  --------
     *  firefox.desktop
     *  google-chrome.desktop
     *  chromium-browser.desktop
     *  opera.desktop
     */
    const out = {
      isIE: false,
      isSafari: false,
      isFirefox: value.indexOf('firefox') > -1,
      isChrome: value.indexOf('google') > -1,
      isChromium: value.indexOf('chromium') > -1,
      isOpera: value.indexOf('opera') > -1,
      identity: value,
      isBlink: false,
      isWebkit: false,
      commonName: null,
    };
    out.isWebkit = out.isBlink = out.isChrome || out.isChromium || out.isOpera;
    out.commonName = getCommonName(out);

    callback(null, out);
  });
};

export default detect;
