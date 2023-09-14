import { exec } from 'child_process';

exec("cd packages/theme && bun run build && rm -rf ./node_modules/.bin/orchard")
exec("bun install");

const packages = ["font-picker", "memoize", "react-confirm-alert", "react-feather", 'react-lazy-named', 'react-textfit'];

for (const index in packages) {
    console.log(`Building ${packages[index]}...`);

    await Bun.build({
        entrypoints: [`./packages/${packages[index]}/src/index.ts`],
        outdir: `./packages/${packages[index]}/dist/esm`,
        target: "browser",
        format: "esm",
        minify: true
    });

    exec(`cd packages/${packages[index]} && tsc -p ./tsconfig.json`)

    console.log(`${packages[index]} Built`)
}

console.log("Building Components...");

exec("cd packages/components && bun run build:tokens")

await Bun.build({
    entrypoints: ['./packages/components/src/index.ts'],
    outdir: './packages/components/dist/esm',
    target: "browser",
    format: "esm",
    minify: true
});

exec(`cd packages/components && tsc -p ./tsconfig.json`)

console.log("Components Built")


