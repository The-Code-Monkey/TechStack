interface SharedOpts {
  // JS target
  target: 'node' | 'browser';
  // Path to tsconfig file
  tsconfig?: string;
  // Is error extraction running?
  extractErrors?: boolean;
}

export type ModuleFormat = 'cjs' | 'umd' | 'esm' | 'system';

export interface BuildOpts extends SharedOpts {
  name?: string;
  entry?: string | string[];
  format: 'esm';
  target: 'browser';
  noClean?: boolean;
  rollupTypes?: boolean;
}

export interface WatchOpts extends BuildOpts {
  verbose?: boolean;
  // callback hooks
  onFirstSuccess?: string;
  onSuccess?: string;
  onFailure?: string;
}

export interface NormalizedOpts
  extends Omit<WatchOpts, 'name' | 'input' | 'format'> {
  name: string | string[];
  input: string[];
  format: [ModuleFormat, ...ModuleFormat[]];
  output: {
    file: string[];
  };
}

export type TcmOptionsInput = { [entryAlias: string]: string };

export interface TcmOptions extends SharedOpts {
  // Name of package
  name: string;
  // path to file
  input: string | TcmOptionsInput;
  // Module format
  format: 'esm';
  // Is minifying?
  minify?: boolean;
  // Is this the very first rollup config (and thus should one-off metadata be extracted)?
  writeMeta?: boolean;
  // Only transpile, do not type check (makes compilation faster)
  transpileOnly?: boolean;
  // Is rolling up types?
  rollupTypes?: boolean;
}

export interface PackageJson {
  name: string;
  source?: string;
  jest?: Record<string, string>;
  eslint?: Record<string, string>;
  dependencies?: { [packageName: string]: string };
  devDependencies?: { [packageName: string]: string };
  engines?: {
    node?: string;
  };
  types?: string;
  typings?: string;
}
