import color from 'colorette';
import ora from 'ora';

// This was copied from Razzle. Lots of unused stuff.
export const info = (msg: string) => {
  console.log(`${color.gray('>')} ${msg}`);
};

export const error = (msg: string | Error) => {
  if (msg instanceof Error) {
    msg = msg.message;
  }

  console.error(`${color.red('> Error!')} ${msg}`);
};

export const success = (msg: string) => {
  console.log(`${color.green('> Success!')} ${msg}`);
};

export const wait = (msg: string) => {
  const spinner = ora(color.green(msg));
  spinner.color = 'blue';
  spinner.start();

  return () => {
    spinner.stop();
    process.stdout.write('\u001B[2K');
  };
};

export const cmd = (cmd: string) => {
  return color.bold(color.cyan(cmd));
};

export const code = (cmd: string) => {
  return `${color.gray('`')}${color.bold(cmd)}${color.gray('`')}`;
};

export const param = (param: string) => {
  return color.bold(`${color.gray('{')}${color.bold(param)}${color.gray('}')}`);
};
