import StyleDictionary from "style-dictionary";
import fs from "fs-extra";
import path from 'path';
import { template } from 'lodash';
import Color from 'tinycolor2'
import {getConfig, Options} from "../utils";
import {FormatterArguments} from "style-dictionary/types/Format";
import {TransformedToken} from "style-dictionary/types/TransformedToken";

interface NestedObject {
    [key: string]: string | NestedObject;
}

type RecordNestedObject = Record<string, NestedObject>;

const generateStyledSystem = async (options: Options) => {
    const minifyDictionary = (obj: NestedObject) => {
        const toRet: Record<string, unknown> = {};
        if (obj.value) {
            return obj.value;
        }

        for (const name in obj) {
            toRet[name] = minifyDictionary(obj[name] as NestedObject);
        }

        return toRet;
    };

    const nestedJson = (args: FormatterArguments) => {
        const dictionary = args.dictionary;

        if (dictionary.allProperties[0].name === 'neutral_base') {
            const properties = dictionary.properties;

            properties.color.neutrals = properties.color.neutral_base;
            delete properties.color.neutral_base;

            return `const tokens = ${JSON.stringify(
                minifyDictionary(properties[Object.keys(properties)[0]]),
                null,
                2
            )};

export default tokens;
`;
        }

        let output: RecordNestedObject | string | NestedObject =
            dictionary.properties;

        if (output.color) {
            output = output.color;
        }
        if ((output as RecordNestedObject).modes) {
            output = (output as RecordNestedObject).modes;
        }
        if ((output as RecordNestedObject).dark) {
            output = (output as RecordNestedObject).dark;
        }
        if ((output as RecordNestedObject).light) {
            output = (output as RecordNestedObject).light;
        }
        if ((output as RecordNestedObject).size) {
            output = (output as RecordNestedObject).size;
        }

        if ((output as RecordNestedObject).breakpoints) {
            const minified = minifyDictionary(
                (output as RecordNestedObject).breakpoints
            ) as Record<string, string>;

            return `const tokens = ${JSON.stringify(
                {
                    breakpoints: Object.keys(minified).map(key => minified[key]),
                },
                null,
                2
            )};

export default tokens;
    `;
        }

        return `const tokens = ${JSON.stringify(
            minifyDictionary(output as NestedObject),
            null,
            2
        )};

export default tokens;
  `;
    };

    nestedJson.nested = true;

    StyleDictionary.registerFormat({
        name: 'custom/nested/json',
        formatter: nestedJson,
    });

    StyleDictionary.registerFormat({
        name: 'custom/intent_tokens',
        formatter: template(
            fs.readFileSync(
                path.resolve(__dirname, '../templates/intent_tokens.template')
            ).toString()
        ),
    });

    StyleDictionary.registerFormat({
        name: 'custom/neutrals_tokens',
        formatter: template(
            fs.readFileSync(
                path.resolve(__dirname, '../templates/neutrals_tokens.template')
            ).toString()
        ),
    });

    StyleDictionary.registerTransform({
        name: 'color/makeShades',
        type: 'value',
        transitive: true,
        matcher(prop: TransformedToken) {
            return prop.attributes.type === 'intents' || prop.makeShades;
        },
        transformer(prop: { value: string; path: Array<string> }) {
            const color = Color(prop.value);
            const subtheme = { light: {}, dark: {} };

            const colorBase = Color('#000');
            const colorLight = Color('#FFF');

            const makeLight = () => {
                const palette = [];

                palette.push(color.toHexString());
                palette.push(Color.mix(color, colorBase, 10).toHexString());
                palette.push(Color.mix(color, colorLight, 10).toHexString());
                palette.push(Color.mix(color, colorLight, 35).toHexString());
                palette.push(Color.mix(color, colorLight, 80).toHexString());

                return palette;
            };

            const makeDark = () => {
                const palette = [];

                palette.push(color.toHexString());
                palette.push(Color.mix(color, colorLight, 10).toHexString());
                palette.push(Color.mix(color, colorBase, 10).toHexString());
                palette.push(Color.mix(color, colorBase, 35).toHexString());
                palette.push(Color.mix(color, colorBase, 80).toHexString());

                return palette;
            };

            if (prop.path.includes('modes')) {
                if (prop.path.includes('light')) return makeLight();
                if (prop.path.includes('dark')) return makeDark();
            } else {
                subtheme.light = makeLight();
                subtheme.dark = makeDark();
            }

            return subtheme;
        },
    });

    StyleDictionary.registerTransform({
        name: 'color/makeNeutrals',
        type: 'value',
        transitive: true,
        matcher(prop: TransformedToken) {
            // this is an example of a possible filter (based on the "cti" values) to show how a "matcher" works
            return prop.attributes.type === 'neutral_base';
        },
        transformer(prop: { value: string }) {
            const colorBase = Color(prop.value);
            const colorLight = Color('#FFFFFF');
            const neutrals = { light: {}, dark: {} };
            const paletteLight: string[] = [];
            const paletteDark: string[] = [];
            const percentages = [
                0, 2, 3, 5, 8, 10, 12, 16, 20, 24, 26, 30, 35, 40, 45, 52, 60, 70, 80, 90,
                100,
            ];

            percentages.forEach(mixPercentage => {
                paletteLight.push(
                    Color.mix(colorLight, colorBase, mixPercentage).toHexString()
                );
                paletteDark.push(
                    Color.mix(colorBase, colorLight, mixPercentage).toHexString()
                );
            });

            neutrals.light = paletteLight;
            neutrals.dark = paletteDark;

            return neutrals;
        },
    });

    StyleDictionary.registerAction({
        name: 'copy_assets',
        do: function (_: unknown, config: { buildPath: string }) {
            console.log('Copying assets directory');
            fs.copySync(config.buildPath, process.cwd() + `theme/${config.buildPath}`);
        },
        undo: function (_: unknown, config: { buildPath: string }) {
            console.log('Cleaning assets directory');
            fs.removeSync(config.buildPath + 'dist');
        },
    });


    const {ConfigWithSource, outputDir, tsFilesOutputDir} = await getConfig(options)

    const BaseStyleDictionarySS = StyleDictionary.extend(ConfigWithSource);

    BaseStyleDictionarySS.buildAllPlatforms();

    fs.copySync(`./theme-dist`, outputDir);

    fs.removeSync(`./theme-dist`);

    fs.copySync(path.resolve(__dirname, options.dev ? '../../ts/styled-system' : 'ts/styled-system'), tsFilesOutputDir);
};

export default generateStyledSystem