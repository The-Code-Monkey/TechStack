
const buildTheme = Bun.spawn(["bun", "run", "build"], {
    cwd: "./packages/theme"
})

await buildTheme.exited;

Bun.spawn(["bun", "run", "build:tokens"], {
    cwd: "./packages/components"
})
//
// await Bun.build({
//     entrypoints: ["./packages/components/src/index.ts"],
//     outdir: "./packages/components/dist/esm",
//     target: "browser",
//     format: "esm"
// })