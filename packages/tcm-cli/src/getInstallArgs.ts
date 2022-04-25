import { InstallCommand } from './getInstallCmd.js';

const getInstallArgs = (
  cmd: InstallCommand,
  packages: string[]
) => {
  switch (cmd) {
    case 'npm':
      return ['install', ...packages, '--save-dev'];
    case 'yarn':
      return ['add', ...packages, '--dev'];
  }
}

export default getInstallArgs;
