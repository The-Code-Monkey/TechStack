import * as shell from 'shelljs';

import * as util from '../utils/fixture';
import { execWithCache } from '../utils/shell';

shell.config.silent = false;

const testDir = 'e2e';
const fixtureName = 'build-withTypesRollup';
const stageName = `stage-${fixtureName}`;

describe('tcm build :: types rollup', () => {
  beforeAll(() => {
    util.teardownStage(stageName);
    util.setupStageWithFixture(testDir, stageName, fixtureName);
  });

  it('should rollup types into index.d.ts', () => {
    const output = execWithCache('node ../dist/index.js build --rollupTypes');

    expect(shell.test('-f', 'dist/index.d.ts')).toBeTruthy();

    expect(shell.test('-d', 'dist/types')).toBeFalsy();
    expect(shell.test('-d', 'dist/foo')).toBeFalsy();
    expect(shell.test('-d', 'dist/bar')).toBeFalsy();

    expect(output.code).toBe(0);
  });

  it('should not run by default and types should be output into the dist root', () => {
    const output = execWithCache('node ../dist/index.js build');

    expect(shell.test('-f', 'dist/index.d.ts')).toBeTruthy();

    expect(shell.test('-f', 'dist/foo/foo.d.ts')).toBeTruthy();
    expect(shell.test('-f', 'dist/bar/bar.d.ts')).toBeTruthy();

    expect(output.code).toBe(0);
  });

  it('should honor custom declarationDir', () => {
    shell.sed(
      '-i',
      '"declaration": true,',
      '"declaration": true, "declarationDir": "dist/my-types",',
      'tsconfig.json'
    );

    try {
      const output = execWithCache(
        'node ../dist/index.js build --rollupTypes',
        {
          noCache: true,
        }
      );

      expect(shell.test('-f', 'dist/index.d.ts')).toBeTruthy();

      expect(shell.test('-d', 'dist/my-types')).toBeFalsy();

      expect(output.code).toBe(0);
    } finally {
      shell.sed(
        '-i',
        '"declaration": true, "declarationDir": "dist/my-types",',
        '"declaration": true,',
        'tsconfig.json'
      );
    }
  });

  it('should not rollup types when there are no types or typings definition in package.json', () => {
    shell.sed('-i', '"types"', '"types-disabled"', 'package.json');

    try {
      const output = execWithCache(
        'node ../dist/index.js build --rollupTypes',
        {
          noCache: true,
        }
      );

      expect(shell.test('-f', 'dist/index.d.ts')).toBeTruthy();
      expect(shell.test('-f', 'dist/foo/foo.d.ts')).toBeTruthy();
      expect(shell.test('-f', 'dist/bar/bar.d.ts')).toBeTruthy();

      expect(output.code).toBe(0);
    } finally {
      shell.sed('-i', '"types-disabled"', '"types"', 'package.json');
    }
  });

  afterAll(() => {
    util.teardownStage(stageName);
  });
});
