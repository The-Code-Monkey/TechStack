import { exec } from 'child_process';

exec("cd packages/tcm-cli && bun run build");
exec("cd packages/theme && bun run build && rm -rf ./node_modules/.bin/orchard")
exec("bun install");

// Build Memoize
console.log("Building Memoize...")

await Bun.build({
    entrypoints: ['./packages/memoize/src/index.ts'],
    outdir: './packages/memoize/dist/esm',
    target: "browser",
    format: "esm"
});

console.log("Memoize Built")

console.log("Building Feather...")

await Bun.build({
    entrypoints: ['./packages/react-feather/src/index.ts'],
    outdir: './packages/react-feather/dist/esm',
    target: "browser",
    format: "esm"
});

console.log("Feather Built")

console.log("Building Components...");

exec("cd packages/components && bun run build:tokens")

await Bun.build({
    entrypoints: ['./packages/components/src/index.ts'],
    outdir: './packages/components/dist/esm',
    target: "browser",
    format: "esm"
});

console.log("Components Built")


