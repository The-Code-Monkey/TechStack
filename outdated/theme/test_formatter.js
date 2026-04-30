import StyleDictionary from 'style-dictionary';
import fs from 'fs';

const flattenValue = (name, value, rootVars, themeVars) => {
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
    if (name.startsWith('--spacing-')) twName = name; // already spacing
    else if (name.startsWith('--radii-')) twName = name.replace('--radii-', '--radius-');
    else if (name.startsWith('--breakpoints-')) twName = name.replace('--breakpoints-', '--breakpoint-');
    else if (name.startsWith('--font-sizes-')) twName = name.replace('--font-sizes-', '--text-');
    else if (name.startsWith('--sizes-')) twName = name.replace('--sizes-', '--size-');
    else if (name.startsWith('--borders-')) twName = name.replace('--borders-', '--border-');
    else if (name.startsWith('--font-weights-')) twName = name.replace('--font-weights-', '--font-weight-'); // Not standard tailwind but good enough
    
    // We can just emit them
    themeVars.push(`  ${twName}: var(${name});`);
  }
};

const formatter = ({ dictionary }) => {
    let rootVars = [];
    let themeVars = [];

    dictionary.allProperties.forEach(prop => {
      // name is already formatted by name/cti/kebab if we use it, otherwise we make it
      // Let's assume name/cti/kebab is applied
      const varName = `--${prop.name}`;
      flattenValue(varName, prop.value, rootVars, themeVars);
    });

    return `@import "tailwindcss";\n\n:root {\n${rootVars.join('\n')}\n}\n\n@theme inline {\n${themeVars.join('\n')}\n}\n`;
};

const sd = new StyleDictionary({
  source: ['src/theme/default/**/*.json'],
  format: {
    'custom/tailwind_v4': formatter
  },
  transform: {
    'color/makeShades': {
      type: 'value',
      transitive: true,
      matcher(prop) {
        return prop.attributes.type === 'intents' || prop.makeShades;
      },
      transformer(prop) {
        return { light: ['#fff'], dark: ['#000'] }; // Simplified for test
      }
    }
  },
  platforms: {
    css: {
      transformGroup: 'css',
      transforms: ['attribute/cti', 'name/cti/kebab', 'color/makeShades'],
      buildPath: 'theme-dist/',
      files: [{ destination: 'globals.css', format: 'custom/tailwind_v4' }]
    }
  }
});
sd.buildAllPlatforms().then(() => {
  console.log(fs.readFileSync('theme-dist/globals.css', 'utf-8'));
});
