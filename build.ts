import { exec } from "child_process";

exec("cd packages/theme && bun build ./src/index.ts --compile orchard")

// await Bun.build({
//
// })