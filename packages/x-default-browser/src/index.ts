import os from 'os';

const detectOs = async () => {
  let detect;

  if (os.platform() == 'win32') {
    if (os.release().indexOf('10.') === 0) {
      detect = import('./detect-windows10');
    } else {
      detect = import('./detect-windows');
    }
  } else if (os.platform() == 'darwin') {
    detect = import('./detect-mac');
  } else if (os.platform() == 'linux' || os.platform() == 'freebsd') {
    detect = import('./detect-linux');
  } else {
    detect = import('./detect-stub');
  }

  return await detect;
};

export default detectOs();
