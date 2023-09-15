import { exec } from "child_process";

exec("cd packages/theme && bun run build")

exec("bun install")

exec("cd packages/components && bun run build:tokens")

const build = await Bun.build({
    entrypoints: ["./packages/components/src/index.ts"],
    outdir: "./packages/components/dist/esm",
    target: "browser",
    format: "esm"
})

if (build.success) exec("cd packages/components && tsc")