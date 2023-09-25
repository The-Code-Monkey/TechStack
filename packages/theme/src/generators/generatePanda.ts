import {getConfig} from '../utils';
import StyleDictionary from "style-dictionary";
import fs from 'fs-extra'
import path from 'path';

const generatePanda = async (options: { b: string; brand: string }) => {
    const {ConfigWithSource, outputDir, tsFilesOutputDir} = await getConfig(options)

    const BaseStyleDictionaryPanda = StyleDictionary.extend(ConfigWithSource);

    BaseStyleDictionaryPanda.buildAllPlatforms();

    fs.copySync('./theme-dist', outputDir);

    fs.removeSync('./theme-dist');

    fs.copySync(path.resolve(__dirname, 'ts'), tsFilesOutputDir);
}

export default generatePanda;