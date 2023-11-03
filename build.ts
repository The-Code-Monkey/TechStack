import { exec } from 'child_process';
import dts from "bun-plugin-dts";


const buildTheme = Bun.spawn(["bun", "run", "build"], {
    cwd: "./packages/theme"
})

await buildTheme.exited;

// Bun.spawn(["bun", "install"])
//
const packages = [
    'memoize',
    // 'react-textfit',
    'react-feather',
    'font-picker',
    // 'react-lazy-named'
];

const promises: Array<Promise<any>> = packages.map((key) => Bun.build({
    entrypoints: [`./packages/${key}/src/index.ts`],
    outdir: `./packages/${key}/dist/esm`,
    target: 'browser',
    format: 'esm',
    plugins: [
        dts()
    ],
}));

// promises.push(Bun.build({
//     entrypoints: [`./packages/react-confirm-alert/src/index.tsx`],
//     outdir: `./packages/react-confirm-alert/dist/esm`,
//     target: 'browser',
//     format: 'esm',
//     plugins: [
//         dts()
//     ],
// }));

await Promise.all(promises).then(values => console.log(values));
//
// exec('cd packages/components && bun run build:tokens')
//
// await Bun.build({
//     entrypoints: ["./packages/components/src/index.ts"],
//     outdir: "./packages/components/dist/esm",
//     target: "browser",
//     format: "esm"
// })