import minimist from 'minimist';
import generatePanda from './generators/generatePanda';
import generateStyledSystem from './generators/generateStyledSystem';
import {Options} from "./utils";


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

const defaultArgs = {
  b: 'default',
  brand: 'default',
  f: 'default',
  format: 'default',
}

run({...defaultArgs, ...inputtedArgs})