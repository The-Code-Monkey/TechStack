#!/usr/bin/env node
import { createRequire } from 'module';
import path from 'path';
import { fileURLToPath } from 'url';

import chalk from 'chalk';
import enquirer from 'enquirer';
const { Input, Select } = enquirer;
import { ESLint } from 'eslint';
import * as execa from 'execa';
import figlet from 'figlet';
import fs from 'fs-extra';
import jest from 'jest';
const { run: jestRun } = jest;
import { concatAllArray } from 'jpjs';
import ora from 'ora';
import sade from 'sade';
import semver from 'semver';
import shell from 'shelljs';
import sortPackageJson from 'sort-package-json';
import glob from 'tiny-glob/sync.js';

const require = createRequire(import.meta.url);

import { paths } from './constants.js';
import { createEslintConfig } from './createEslintConfig.js';
import { createJestConfig } from './createJestConfig.js';
import { createProgressEstimator } from './createProgressEstimator.js';
import getInstallArgs from './getInstallArgs.js';
import getInstallCmd from './getInstallCmd.js';
import pkg from './getPkgJson.js';
import logError from './logError.js';
import * as Messages from './messages.js';
import { templates } from './templates/index.js';
import {
  composeDependencies,
  composePackageJson,
} from './templates/utils/index.js';
import {
  PackageJson,
  WatchOpts,
  BuildOpts,
  NormalizedOpts,
  ModuleFormat,
} from './types.js';
import {
  resolveApp,
  safePackageName,
  getNodeEngineRequirement,
} from './utils.js';

const prog = sade('tcm');

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

let appPackageJson: PackageJson;

try {
  appPackageJson = fs.readJSONSync(paths.appPackageJson);
} catch (e) {}

function setAuthorName(author: string) {
  shell.exec(`npm config set init-author-name "${author}"`, { silent: true });
}

function getAuthorName() {
  let author = '';

  author = shell
    .exec('npm config get init-author-name', { silent: true })
    .stdout.trim();
  if (author) return author;

  author = shell
    .exec('git config --global user.name', { silent: true })
    .stdout.trim();
  if (author) {
    setAuthorName(author);
    return author;
  }

  author = shell
    .exec('npm config get init-author-email', { silent: true })
    .stdout.trim();
  if (author) return author;

  author = shell
    .exec('git config --global user.email', { silent: true })
    .stdout.trim();
  if (author) return author;

  return author;
}

export const isDir = (name: string) =>
  fs
    .stat(name)
    .then(stats => stats.isDirectory())
    .catch(() => false);

export const isFile = (name: string) =>
  fs
    .stat(name)
    .then(stats => stats.isFile())
    .catch(() => false);

async function jsOrTs(filename: string) {
  const extension = (await isFile(resolveApp(filename + '.ts')))
    ? '.ts'
    : (await isFile(resolveApp(filename + '.tsx')))
    ? '.tsx'
    : (await isFile(resolveApp(filename + '.jsx')))
    ? '.jsx'
    : '.js';

  return resolveApp(`${filename}${extension}`);
}

async function getInputs(
  entries?: string | string[],
  source?: string
): Promise<string[]> {
  return concatAllArray(
    []
      .concat(
        entries && entries.length
          ? entries
          : (source && resolveApp(source)) ||
              ((await isDir(resolveApp('src'))) && (await jsOrTs('src/index')))
      )
      .map(file => glob(file))
  );
}

function getNamesAndFiles(inputs: string[]): {
  names: string[];
  files: string[];
} {
  if (inputs.length === 1) {
    const singleName = appPackageJson.name;
    return {
      names: [singleName],
      files: [safePackageName(singleName)],
    };
  }
  // if multiple entries, each entry should retain its filename
  const names: string[] = [];
  const files: string[] = [];
  inputs.forEach(input => {
    // remove leading src/ directory
    let filename = input;
    const srcVars = ['src/', './src/'];
    if (input.startsWith(srcVars[0]))
      filename = input.substring(srcVars[0].length);
    else if (input.startsWith(srcVars[1]))
      filename = input.substring(srcVars[1].length);

    // remove file extension
    const noExt = filename.split('.').slice(0, -1).join('.');

    // UMD name shouldn't contain slashes, replace with __
    names.push(noExt.replace('/', '__'));
    files.push(noExt);
  });
  return { names, files };
}

async function normalizeOpts(
  opts: WatchOpts,
  tcmOptions: Record<string, unknown> = {}
): Promise<NormalizedOpts> {
  const inputs = await getInputs(opts.entry, appPackageJson.source);
  const { names, files } = getNamesAndFiles(inputs);

  return {
    ...opts,
    ...tcmOptions,
    name: names,
    input: inputs,
    format: opts.format.split(',').map((format: string) => {
      if (format === 'es') {
        return 'esm';
      }
      return format;
    }) as [ModuleFormat, ...ModuleFormat[]],
    output: {
      file: files,
    },
  };
}

async function cleanDistFolder() {
  await fs.remove(paths.appDist);
}

// function writeCjsEntryFile(file: string, numEntries: number) {
//   const baseLine = `module.exports = require('./${file}`;
//   const contents = `
// 'use strict'
//
// if (process.env.NODE_ENV === 'production') {
//   ${baseLine}.cjs.production.min.cjs')
// } else {
//   ${baseLine}.cjs.development.cjs')
// }
// `;
//   const filename = numEntries === 1 ? 'index.js' : `${file}.js`;
//   return fs.outputFile(path.join(paths.appDist, filename), contents);
// }

prog
  .version(pkg.version)
  .command('create <pkg>')
  .describe('Create a new package with TCM')
  .example('create mypackage')
  .option(
    '--template',
    `Specify a template. Allowed choices: [${Object.keys(templates).join(
      ', '
    )}]`
  )
  .example('create --template react mypackage')
  .option('--husky', 'Should husky be added to the generated project?', true)
  .example('create --husky mypackage')
  .example('create --no-husky mypackage')
  .example('create --husky false mypackage')
  .action(async (pkg: string, opts: { template: string }) => {
    console.log(
      chalk.cyan(figlet.textSync('TCM', { horizontalLayout: 'full' }))
    );
    const bootSpinner = ora(`Creating ${chalk.bold.green(pkg)}...`);
    let template;
    // Helper fn to prompt the user for a different
    // folder name if one already exists
    async function getProjectPath(projectPath: string): Promise<string> {
      const exists = await fs.pathExists(projectPath);
      if (!exists) {
        return projectPath;
      }

      bootSpinner.fail(`Failed to create ${chalk.bold.red(pkg)}`);
      const prompt = new Input({
        message: `A folder named ${chalk.bold.red(
          pkg
        )} already exists! ${chalk.bold('Choose a different name')}`,
        initial: pkg + '-1',
        result: (v: string) => v.trim(),
      });

      pkg = await prompt.run();
      projectPath = (await fs.realpath(process.cwd())) + '/' + pkg;
      bootSpinner.start(`Creating ${chalk.bold.green(pkg)}...`);
      return await getProjectPath(projectPath); // recursion!
    }

    try {
      // get the project path
      const realPath = await fs.realpath(process.cwd());
      const projectPath = await getProjectPath(realPath + '/' + pkg);

      const prompt = new Select({
        message: 'Choose a template',
        choices: Object.keys(templates),
      });

      if (opts.template) {
        template = opts.template.trim();
        if (!prompt.choices.includes(template)) {
          bootSpinner.fail(`Invalid template ${chalk.bold.red(template)}`);
          template = await prompt.run();
        }
      } else {
        template = await prompt.run();
      }

      bootSpinner.start();
      // copy the template
      await fs.copy(
        path.resolve(__dirname, `../templates/${template}`),
        projectPath,
        {
          overwrite: true,
        }
      );
      // fix dotfiles
      const dotfiles = ['gitignore', 'gitattributes'];
      for (const dotfile of dotfiles) {
        await fs.move(
          path.resolve(projectPath, `./${dotfile}`),
          path.resolve(projectPath, `./.${dotfile}`)
        );
      }

      // update license year and author
      let license: string = await fs.readFile(
        path.resolve(projectPath, 'LICENSE'),
        { encoding: 'utf-8' }
      );

      license = license.replace(/<year>/, `${new Date().getFullYear()}`);

      // attempt to automatically derive author name
      let author = getAuthorName();

      if (!author) {
        bootSpinner.stop();
        const licenseInput = new Input({
          name: 'author',
          message: 'Who is the package author?',
        });
        author = await licenseInput.run();
        setAuthorName(author);
        bootSpinner.start();
      }

      license = license.replace(/<author>/, author.trim());

      await fs.writeFile(path.resolve(projectPath, 'LICENSE'), license, {
        encoding: 'utf-8',
      });

      const templateConfig = templates[template as keyof typeof templates];
      const generatePackageJson = composePackageJson(templateConfig);

      // Install deps
      process.chdir(projectPath);
      const safeName = safePackageName(pkg);
      const pkgJson = generatePackageJson({
        name: safeName,
        author,
      });

      const nodeVersionReq = getNodeEngineRequirement(pkgJson);
      if (
        nodeVersionReq &&
        !semver.satisfies(process.version, nodeVersionReq)
      ) {
        bootSpinner.fail(Messages.incorrectNodeVersion(nodeVersionReq));
        process.exit(1);
      }
      const pkgContent = sortPackageJson(JSON.stringify(pkgJson, null, 2));
      await fs.outputFile(
        path.resolve(projectPath, 'package.json'),
        pkgContent
      );
      bootSpinner.succeed(`Created ${chalk.bold.green(pkg)}`);
      await Messages.start(pkg);
    } catch (error) {
      bootSpinner.fail(`Failed to create ${chalk.bold.red(pkg)}`);
      logError(error);
      process.exit(1);
    }

    const templateConfig = templates[template as keyof typeof templates];
    const generateDependencies = composeDependencies(templateConfig);
    const dependencies = generateDependencies();

    const installSpinner = ora(
      Messages.installing(dependencies.sort())
    ).start();
    try {
      const cmd = await getInstallCmd();
      await execa.execa(cmd, getInstallArgs(cmd, dependencies));
      installSpinner.succeed('Installed dependencies');
      console.log(await Messages.start(pkg));
    } catch (error) {
      installSpinner.fail('Failed to install dependencies');
      logError(error);
      process.exit(1);
    }
  });

prog
  .command('build')
  .describe('Build your project once and exit')
  .option('--entry, -i', 'Entry module')
  .example('build --entry src/foo.tsx')
  .option('--target', 'Specify your target environment', 'browser')
  .example('build --target node')
  .option('--format', 'Specify module format(s)', 'esm,cjs')
  .example('build --format cjs,esm')
  .option('--noClean', "Don't clean the dist folder")
  .example('build --noClean')
  .option('--tsconfig', 'Specify custom tsconfig path')
  .example('build --tsconfig ./tsconfig.foo.json')
  .option('--transpileOnly', 'Skip type checking')
  .example('build --transpileOnly')
  .option('--rollupTypes', 'Enable types rollup')
  .example('build --rollupTypes')
  .option(
    '--extractErrors',
    'Extract errors to ./errors/codes.json and provide a url for decoding.'
  )
  .example(
    'build --extractErrors=https://reactjs.org/docs/error-decoder.html?invariant='
  )
  .action(async (dirtyOpts: BuildOpts) => {
    const opts = await normalizeOpts(dirtyOpts);

    await cleanDistFolder();
    const logger = await createProgressEstimator();
    try {
      const promise = new Promise<void>(resolve => {
        shell.exec(`tsc -p ${paths.tsconfigJson}`);
        if (opts.format.includes('cjs')) {
          shell.exec(`tsc -p ${paths.tsconfigCjs}`);
        }
        resolve();
      });
      logger(promise, 'Building modules');
      await promise;
    } catch (error) {
      logError(error);
      process.exit(1);
    }
  });

prog
  .command('test')
  .describe('Run jest test runner. Passes through all flags directly to Jest')
  .action(async (opts: { config?: string }) => {
    // Do this as the first thing so that any code reading it knows the right env.
    process.env.BABEL_ENV = 'test';
    process.env.NODE_ENV = 'test';
    // Makes the script crash on unhandled rejections instead of silently
    // ignoring them. In the future, promise rejections that are not handled will
    // terminate the Node.js process with a non-zero exit code.
    process.on('unhandledRejection', err => {
      throw err;
    });

    const argv = process.argv.slice(2);
    let jestConfig = {
      ...createJestConfig(
        relativePath => path.resolve(__dirname, '..', relativePath),
        opts.config ? path.dirname(opts.config) : paths.appRoot
      ),
      ...appPackageJson.jest,
    };

    // Allow overriding with jest.config
    const defaultPathExists = await fs.pathExists(paths.jestConfig);
    if (opts.config || defaultPathExists) {
      const jestConfigPath = resolveApp(opts.config || paths.jestConfig);
      const jestConfigContents = require(jestConfigPath);
      jestConfig = { ...jestConfig, ...jestConfigContents };
    }

    // if custom path, delete the arg as it's already been merged
    if (opts.config) {
      let configIndex = argv.indexOf('--config');
      if (configIndex !== -1) {
        // case of "--config path", delete both args
        argv.splice(configIndex, 2);
      } else {
        // case of "--config=path", only one arg to delete
        const configRegex = /--config=.+/;
        configIndex = argv.findIndex(arg => arg.match(configRegex));
        if (configIndex !== -1) {
          argv.splice(configIndex, 1);
        }
      }
    }

    argv.push(
      '--config',
      JSON.stringify({
        ...jestConfig,
      })
    );

    const [, ...argsToPassToJestCli] = argv;
    jestRun(argsToPassToJestCli);
  });

prog
  .command('lint')
  .describe('Run eslint with Prettier')
  .example('lint src test')
  .option('--fix', 'Fixes fixable errors and warnings', false)
  .example('lint src test --fix')
  .option('--ignore-pattern', 'Ignore a pattern')
  .example('lint src test --ignore-pattern test/foobar.ts')
  .option(
    '--max-warnings',
    'Exits with non-zero error code if number of warnings exceed this number',
    Infinity
  )
  .example('lint src test --max-warnings 10')
  .option('--write-file', 'Write the config file locally')
  .example('lint --write-file')
  .option('--report-file', 'Write JSON report to file locally')
  .example('lint --report-file eslint-report.json')
  .action(
    async (opts: {
      fix: boolean;
      'ignore-pattern': string;
      'write-file': boolean;
      'report-file': string;
      'max-warnings': number;
      _: string[];
    }) => {
      if (opts['_'].length === 0 && !opts['write-file']) {
        const defaultInputs = ['src', 'test'].filter(fs.existsSync);
        opts['_'] = defaultInputs;
        console.log(
          chalk.yellow(
            `Defaulting to "tcm lint ${defaultInputs.join(' ')}"`,
            '\nYou can override this in the package.json scripts, like "lint": "tcm lint src otherDir"'
          )
        );
      }
      try {
        const config = await createEslintConfig({
          pkg: appPackageJson,
          rootDir: paths.appRoot,
          writeFile: opts['write-file'],
        });

        const linter = new ESLint({
          cwd: paths.appRoot,
          baseConfig: {
            ...config,
            ...appPackageJson.eslint,
            ignorePatterns: opts['ignore-pattern'],
          },
          extensions: ['.js', '.mjs', '.cjs', '.ts', '.tsx', '.jsx'],
          fix: opts.fix,
        });
        const results = await linter.lintFiles(opts['_']);
        if (opts.fix) {
          await ESLint.outputFixes(results);
        }

        const formatter = await linter.loadFormatter('stylish');
        const jsonFormatter = await linter.loadFormatter('json');
        console.log(formatter.format(results));
        if (opts['report-file']) {
          await fs.outputFile(
            opts['report-file'],
            jsonFormatter.format(results)
          );
        }
        let errorCount = 0;
        let warningCount = 0;
        results.forEach(result => {
          errorCount += result.errorCount;
          warningCount += result.warningCount;
        });
        if (errorCount > 0) {
          process.exit(1);
        }
        if (warningCount > opts['max-warnings']) {
          process.exit(1);
        }
      } catch (e) {
        process.exitCode = 1;
        console.error(e);
      }
    }
  );

prog.parse(process.argv);

export { TcmOptions } from './types';
