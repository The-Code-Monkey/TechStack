import path from 'path'
import * as fs from 'fs';

import Config from './config';

const configFileNames = ['orchard.theme.config.json'];

const resolveConfig = (): Promise<string> =>
    new Promise(resolve => {
        for (let i = 0; i < configFileNames.length; i++) {
            fs.access(`${process.cwd()}/${configFileNames[i]}`, (err) => {
                if (!err) {
                    resolve(`${process.cwd()}/${configFileNames[i]}`);
                }
            });
        }

        resolve(`./${configFileNames[0]}`);
    });

const getConfig = async (options) => {
    const brand = options.b || options.brand;
    const userConfigFile = await resolveConfig();
    // const userConfig = fs.readJsonSync(userConfigFile);
    // let userConfig = await fs.readFileSync(userConfigFile, 'utf-8') as unknown as Record<string, string>
    const userConifgFile = Bun.file(userConfigFile);
    const userConfig = await userConifgFile.json()

    const tsFilesOutputDir = userConfig.outputDir
        ? `${process.cwd()}${userConfig.outputDir}/theme`
        : `${process.cwd()}/theme`;
    const outputDir = userConfig.outputDir
        ? `${process.cwd()}${userConfig.outputDir}/theme/dist`
        : `${process.cwd()}/theme/dist`;
    const customSrcDir = userConfig.srcDir
        ? `${process.cwd()}${userConfig.srcDir}/theme/src`
        : `${process.cwd()}/theme/src`;

    fs.mkdir(outputDir, { recursive: true }, () => {});
    const ConfigWithSource = Config;
    if (fs.existsSync(customSrcDir)) {
        console.log('Using your theme');
        ConfigWithSource.source = [
            path.resolve(__dirname, `theme/default/**/*.json`),
            path.resolve(`${customSrcDir}/**/*.json`),
        ];
    } else {
        console.log('Using default theme');
        console.log(
            path.resolve(__dirname, `theme/${brand.toLowerCase()}/**/*.json`)
        );
        ConfigWithSource.source = [
            path.resolve(__dirname, `theme/default/**/*.json`),
            path.resolve(__dirname, `theme/${brand.toLowerCase()}/**/*.json`),
        ];
    }

    return {ConfigWithSource, outputDir, tsFilesOutputDir};
}

export type Options = { b: string; brand: string, f: string, format: string, _: Array<string>, dev?: boolean }

export {
    getConfig
}
