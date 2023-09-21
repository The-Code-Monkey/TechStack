import { exec } from 'child_process';

const buildTheme = Bun.spawn(["bun", "run", "build"], {
    cwd: "./packages/theme"
})

await buildTheme.exited;

Bun.spawn(["bun", "install"])

const packages = ['memoize', 'react-textfit', 'react-feather', 'font-picker', 'react-lazy-named'];

const promises: Array<Promise<any>> = packages.map((key) => Bun.build({
    entrypoints: [`./packages/${key}/src/index.ts`],
    outdir: `./packages/${key}/dist/esm`,
    target: 'browser',
    format: 'esm'
}));

await Promise.all(promises).then(values => console.log(values));

exec('cd packages/components && bun run build:tokens')

await Bun.build({
    entrypoints: ["./packages/components/src/index.ts"],
    outdir: "./packages/components/dist/esm",
    target: "browser",
    format: "esm"
})