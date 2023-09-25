import path from 'path'
import fs from 'fs-extra';

import Config from './config';

const configFileNames = ['orchard.theme.config.json'];

const resolveConfig = (): Promise<string> =>
    new Promise(resolve => {
        for (let i = 0; i < configFileNames.length; i++) {
            fs.exists(`${process.cwd()}/${configFileNames[i]}`, (exists: boolean) => {
                console.log(`${process.cwd()}/${configFileNames[i]}`, exists);
                if (exists) {
                    resolve(`${process.cwd()}/${configFileNames[i]}`);
                }
            });
        }

        resolve(`./${configFileNames[0]}`);
    });

const getConfig = async (options) => {
    const brand = options.b || options.brand;
    const userConfigFile = await resolveConfig();
    const userConfig = fs.readJsonSync(userConfigFile);
    const tsFilesOutputDir = userConfig.outputDir
        ? `${process.cwd()}${userConfig.outputDir}/theme`
        : `${process.cwd()}/theme`;
    const outputDir = userConfig.outputDir
        ? `${process.cwd()}${userConfig.outputDir}/theme/dist`
        : `${process.cwd()}/theme/dist`;
    const customSrcDir = userConfig.srcDir
        ? `${process.cwd()}${userConfig.srcDir}/theme/src`
        : `${process.cwd()}/theme/src`;

    fs.ensureDir(outputDir);
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

export {
    getConfig
}
