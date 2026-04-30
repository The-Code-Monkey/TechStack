#!/usr/bin/env node

const path = require('path');
const fs = require('fs-extra');
const sade = require('sade');
const Color = require('tinycolor2');

const Config = require('./config.json');

const configFileNames = ['orchard.theme.config.json'];

const resolveConfig = () =>
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

const flattenValue = (name: string, value: any, rootVars: string[], themeVars: string[]) => {
  if (Array.isArray(value)) {
    value.forEach((v, i) => flattenValue(`${name}-${i}`, v, rootVars, themeVars));
  } else if (typeof value === 'object' && value !== null) {
    if (value.value) {
      flattenValue(name, value.value, rootVars, themeVars);
    } else {
      Object.entries(value).forEach(([k, v]) => flattenValue(`${name}-${k}`, v, rootVars, themeVars));
    }
  } else {
    rootVars.push(`  ${name}: ${value};`);
    
    // Convert generic names to Tailwind prefixes
    let twName = name;
    if (name.startsWith('--space-')) twName = name.replace('--space-', '--spacing-');
    else if (name.startsWith('--spacing-')) twName = name; 
    else if (name.startsWith('--radii-')) twName = name.replace('--radii-', '--radius-');
    else if (name.startsWith('--breakpoints-')) twName = name.replace('--breakpoints-', '--breakpoint-');
    else if (name.startsWith('--font-sizes-')) twName = name.replace('--font-sizes-', '--text-');
    else if (name.startsWith('--sizes-')) twName = name.replace('--sizes-', '--size-');
    else if (name.startsWith('--borders-')) twName = name.replace('--borders-', '--border-');
    else if (name.startsWith('--font-weights-')) twName = name.replace('--font-weights-', '--font-weight-');
    else if (name.startsWith('--color-intents-')) twName = name.replace('--color-intents-', '--color-');
    
    themeVars.push(`  ${twName}: var(${name});`);
  }
};

const tailwindV4Formatter = ({ dictionary }: { dictionary: any }) => {
  let rootVars: string[] = [];
  let themeVars: string[] = [];

  dictionary.allProperties.forEach((prop: any) => {
    // Style Dictionary usually handles prop.name if a name transform is applied
    const varName = `--${prop.name}`;
    flattenValue(varName, prop.value, rootVars, themeVars);
  });

  return `@import "tailwindcss";\n\n:root {\n${rootVars.join('\n')}\n}\n\n@theme inline {\n${themeVars.join('\n')}\n}\n`;
};

const generate = async (options: { b: string; brand: string }) => {
  const brand = options.b || options.brand;
  const userConfigFile: any = await resolveConfig();
  const userConfig = fs.existsSync(userConfigFile) ? fs.readJsonSync(userConfigFile) : {};
  const outputDir = userConfig.outputDir
    ? `${process.cwd()}${userConfig.outputDir}/theme/dist`
    : `${process.cwd()}/theme/dist`;
  const customSrcDir = userConfig.srcDir
    ? `${process.cwd()}${userConfig.srcDir}/theme/src`
    : `${process.cwd()}/theme/src`;

  fs.ensureDirSync(outputDir);
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

  // @ts-ignore
  const { default: StyleDictionary } = await import('style-dictionary');
  const sd = new StyleDictionary(ConfigWithSource);

  sd.registerFormat({
    name: 'custom/tailwind_v4',
    format: tailwindV4Formatter,
  });

  sd.registerTransform({
    name: 'color/makeShades',
    type: 'value',
    transitive: true,
    matcher(prop: any) {
      return prop.attributes.type === 'intents' || prop.makeShades;
    },
    transform(prop: any) {
      const color = Color(prop.value);
      const subtheme: any = { light: {}, dark: {} };
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

  sd.registerTransform({
    name: 'color/makeNeutrals',
    type: 'value',
    transitive: true,
    matcher(prop: any) {
      return prop.attributes.type === 'neutral_base';
    },
    transform(prop: any) {
      const colorBase = Color(prop.value);
      const colorLight = Color('#FFFFFF');
      const neutrals: any = { light: {}, dark: {} };
      const paletteLight: string[] = [];
      const paletteDark: string[] = [];
      const percentages = [
        0, 2, 3, 5, 8, 10, 12, 16, 20, 24, 26, 30, 35, 40, 45, 52, 60, 70, 80, 90, 100,
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

  await sd.buildAllPlatforms();

  fs.copySync(`./theme-dist`, outputDir);
  fs.removeSync(`./theme-dist`);
  
  // We no longer copy TS files since we are outputting CSS
};

const cli = sade('orchard');

cli
  .command('generate')
  .option(
    '-b, --brand',
    'Sets the brand if multiple brands are required else default',
    'default'
  )
  .action((options: { b: string; brand: string }) => {
    generate(options);
  });

cli.parse(process.argv);
