
const buildTheme = Bun.spawn(["bun", "run", "build"], {
    cwd: "./packages/theme"
})
await buildTheme.exited;

const buildTokens = Bun.spawn(["bun", "run", "build:tokens"], {
    cwd: "./packages/components"
})


// exec("cd packages/components && bun run build:tokens")

const build = await Bun.build({
    entrypoints: ["./packages/components/src/index.ts"],
    outdir: "./packages/components/dist/esm",
    target: "browser",
    format: "esm"
})