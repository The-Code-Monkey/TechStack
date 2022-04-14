import { red, green, gray, cyan, bold } from 'colorette';
import ora from 'ora';

// This was copied from Razzle. Lots of unused stuff.
export const info = (msg: string) => {
  console.log(`${gray('>')} ${msg}`);
};

export const error = (msg: string | Error) => {
  if (msg instanceof Error) {
    msg = msg.message;
  }

  console.error(`${red('> Error!')} ${msg}`);
};

export const success = (msg: string) => {
  console.log(`${green('> Success!')} ${msg}`);
};

export const wait = (msg: string) => {
  const spinner = ora(green(msg));
  spinner.color = 'blue';
  spinner.start();

  return () => {
    spinner.stop();
    process.stdout.write('\u001B[2K');
  };
};

export const cmd = (cmd: string) => {
  return bold(cyan(cmd));
};

export const code = (cmd: string) => {
  return `${gray('`')}${bold(cmd)}${gray('`')}`;
};

export const param = (param: string) => {
  return bold(`${gray('{')}${bold(param)}${gray('}')}`);
};
