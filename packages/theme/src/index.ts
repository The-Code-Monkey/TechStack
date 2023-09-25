// const cli = sade('orchard');
//
// cli
//   .command('generate')
//   .option(
//     '-b, --brand',
//     'Sets the brand if multiple brands are required else default',
//     'default'
//   )
//     .option('-f, --format', 'Sets the format output', 'default')
//   .action((options: { b: string; brand: string, f: string }) => {
//     if (options.f === 'panda' || options.f === 'pandacss') {
//       generatePandaCss(options);
//     } else {
//       generateSS(options);
//     }
//   });
//
// cli.parse(process.argv);

import minimist from 'minimist';
import generatePanda from './generators/generatePanda';
import generateStyledSystem from './generators/generateStyledSystem';

type Options = { b: string; brand: string, f: string, format: string, _: Array<string> }

const generate = async (options: Options) => {
  switch (options.f || options.format) {
    case 'panda': {
      await generatePanda(options)
      break;
    }
    default: {
      await generateStyledSystem(options)
      break;
    }
  }
}

const run = (options: Options) => {
  console.log(options)
  if (options._[0] === 'generate') {
    generate(options)
  }
}

const inputtedArgs = minimist<Options>(Bun.argv.slice(2));

console.log(Bun.argv)

run(inputtedArgs)