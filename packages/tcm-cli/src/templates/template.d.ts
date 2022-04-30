import { PackageJson } from 'type-fest';

interface Template {
  dependencies: string[];
  name: string;
  packageJson: PackageJson & {
    prettier?: Record<string, string | boolean | number>;
    jest?: Record<string, string>;
  };
}
