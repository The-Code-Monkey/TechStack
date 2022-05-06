import os from 'os';

const detectOs = () => {
  let detect;

  if (os.platform() == 'win32') {
    if (os.release().indexOf('10.') === 0) {
      detect = require('./detect-windows10');
    } else {
      detect = require('./detect-windows');
    }
  } else if (os.platform() == 'darwin') {
    detect = require('./detect-mac');
  } else if (os.platform() == 'linux' || os.platform() == 'freebsd') {
    detect = require('./detect-linux');
  } else {
    detect = require('./detect-stub');
  }

  return detect;
};

export default detectOs();
